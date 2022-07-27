import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { User } from "firebase/auth";
import React, {
  Dispatch,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { MessageObject } from "../../Interface";
import socketIOClient from "socket.io-client";
import "./ChatBoard.css";
import { dbService } from "../../fbase";

interface Props {
  roomName: string | null;
  setRoomName: Dispatch<React.SetStateAction<string | null>>;
  userObject: User;
  selectChat: string | null;
}

interface SubProps {
  message: MessageObject;
}

const SOCKET = socketIOClient("localhost:4002");

// 페이지 우측 현재 채팅 중인 채팅방 컴포넌트
function ChatBoard({ roomName, setRoomName, userObject, selectChat }: Props) {
  const [messageList, setMessageList] = useState<MessageObject[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setNewMessage(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userObject.email && roomName) {
      const newMessageObject: MessageObject = {
        message: newMessage,
        email: userObject.email,
        createdAt: Date.now(),
        roomName: roomName,
      };

      SOCKET.emit("send message", newMessageObject, selectChat);

      // db에 저장하는 코드 필요
      setMessageList((prev) => prev.concat(newMessageObject));
    }

    setNewMessage("");
  };

  const backClick = () => {
    setRoomName(null);
  };

  useEffect(() => {
    SOCKET.emit("enter_room", roomName);
  }, [roomName]);

  useEffect(() => {
    // 상대방과의 기존 채팅 목록을 가져옴
    const getChat = async () => {
      if (roomName) {
        const q = query(
          collection(dbService, "chatting"),
          where(roomName, "==", "roomName"),
          orderBy("createdAt", "asc")
        );

        const data = (await getDocs(q)).docs;

        const chats: MessageObject[] = data.map((chat) => {
          const { message, email, createdAt, roomName } = chat.data();

          const chatData: MessageObject = {
            roomName,
            message,
            email,
            createdAt,
          };

          return chatData;
        });

        setMessageList(chats);
      }
    };

    getChat();
  }, [roomName]);

  useEffect(() => {
    SOCKET.on("receive message", (message: MessageObject) => {
      setMessageList((prev) => prev.concat(message));
    });
  }, []);

  return (
    <div>
      <button onClick={backClick}>뒤로가기</button>
      <div>
        {messageList.map((message: MessageObject, i) => {
          return (
            <div key={i}>
              <MessageComponent message={message}></MessageComponent>
            </div>
          );
        })}
      </div>
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

// ----------------------------------------------------------------------------------

// 메시지 컴포넌트
function MessageComponent({ message }: SubProps) {
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

export default ChatBoard;
