import { User } from "firebase/auth";
import React, {
  Dispatch,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { MessageObject, ChattingRoom } from "../Interface";
import socketIOClient from "socket.io-client";

interface MainProps {
  userObject: User;
  selectChat: string | null;
  setSelectChat: Dispatch<React.SetStateAction<string | null>>;
}

interface SubProps {
  userObject: User;
}

interface SubProps2 {
  roomName: string | null;
  setRoomName: Dispatch<React.SetStateAction<string | null>>;
  userObject: User;
}

interface SubProps3 {
  message: MessageObject;
}

const SOCKET = socketIOClient("localhost:4002");

// 메시지 컴포넌트
function MessageComponent({ message }: SubProps3) {
  const d = new Date(message.createdAt);
  // const date = d.getDate() 일 구분 어떻게 하지
  const minute = d.getMinutes();
  const hour = d.getHours();

  return (
    <>
      <p>{message.email}</p>
      <p>{message.message}</p>
      <span>{`${hour}:${minute}`}</span>
    </>
  );
}

// 페이지 좌측 채팅 리스트 목록 컴포넌트
function ChatList({ userObject }: SubProps) {
  const [chatList, setChatList] = useState<ChattingRoom[]>([]);

  // 처음에 들어왔을 때, 해당 유저의 유저 목록을 불러오는 요청 있어야됨. => chatList에 저장
  return <div></div>;
}

// 페이지 우측 현재 채팅 중인 채팅방 컴포넌트
function ChatBoard({ roomName, setRoomName, userObject }: SubProps2) {
  const [messageList, setMessageList] = useState<MessageObject[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // 메시지 입력
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setNewMessage(value);
  };

  // 메시지 보내기
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userObject.email) {
      const newMessageObject: MessageObject = {
        message: newMessage,
        email: userObject.email,
        createdAt: Date.now(),
      };

      SOCKET.emit("send message", newMessageObject, roomName);

      // db에 저장하는 코드 필요
      setMessageList((prev) => prev.concat(newMessageObject));
    }

    setNewMessage("");
  };

  // like 뒤로가기
  const backClick = () => {
    setRoomName(null);
  };

  // 이 컴포넌트가 렌더링 될 때, 채팅방에 입장
  useEffect(() => {
    SOCKET.emit("enter_room", roomName);
  }, []);

  useEffect(() => {
    // 상대방과의 기존 채팅 목록을 가져옴
  }, []);

  // 메시지 받아오기
  useEffect(() => {
    SOCKET.on("receive message", (message: MessageObject) => {
      setMessageList((prev) => prev.concat(message));
    });
  }, []);

  return (
    <div>
      {messageList.map((message: MessageObject, i) => {
        return (
          <div key={i}>
            <MessageComponent message={message}></MessageComponent>
          </div>
        );
      })}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="메시지를 입력해주세요."
          value={newMessage}
          onChange={onChange}
          required
        />
        <input type="submit" value="전송" />
      </form>
    </div>
  );
}

// 채팅 페이지
function Chatting({
  userObject,
  selectChat,
  setSelectChat,
}: MainProps): JSX.Element {
  const [roomName, setRoomName] = useState<string | null>(null);

  useEffect(() => {
    if (selectChat && userObject.email) {
      // socket 채팅방 이름 지정
      const newRoom: string[] = [userObject.email, selectChat];
      newRoom.sort();

      setRoomName(newRoom[0] + newRoom[1]);
    }
    setSelectChat(null);
  }, []);

  return (
    <div>
      <h1>Chatting</h1>
      <ChatList userObject={userObject}></ChatList>
      {roomName && (
        <ChatBoard
          userObject={userObject}
          roomName={roomName}
          setRoomName={setRoomName}
        ></ChatBoard>
      )}
    </div>
  );
}

export default Chatting;
