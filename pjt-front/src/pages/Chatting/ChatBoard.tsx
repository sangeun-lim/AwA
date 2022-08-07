import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dbService } from "../../fbase";
import { User } from "../../Interface";
import style from "./ChatBoard.module.css";
import socketIOClient from "socket.io-client";
import ChatInput from "./ChatInput";

export interface Message {
  sender: string;
  createdDate: number;
  message: string;
  receiver: string;
}

const SOCKET = socketIOClient("localhost:4002");

function ChatBoard() {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );
  const chatPartner = useSelector(
    (state: { chatPartner: string }) => state.chatPartner
  );

  const getChats = async () => {
    const roomName = [userObject.email, chatPartner];
    roomName.sort();
    const realRoomName: string = roomName[0] + roomName[1];

    const q = query(
      collection(dbService, "Chatting"),
      where("roomName", "==", realRoomName),
      orderBy("createdDate", "asc")
    );

    const chats = await getDocs(q);

    const loadMessages: Message[] = chats.docs.map((doc) => {
      const { sender, receiver, message, createdDate } = doc.data();
      return { sender, receiver, message, createdDate };
    });

    setMessageList(loadMessages);
  };

  useEffect(() => {
    /* eslint-disable */
    getChats();
  }, [chatPartner]);

  useEffect(() => {
    const roomName = [userObject.email, chatPartner];
    roomName.sort();
    const realRoomName: string = roomName[0] + roomName[1];

    SOCKET.emit("enter_room", realRoomName);
  }, []);

  useEffect(() => {
    SOCKET.on("receive message", (data) => {
      setMessageList((prev) => prev.concat(data));
    });
  }, []);

  useEffect(() => {
    var chattingBox = document.getElementById("chatBox");
    if (chattingBox) {
      chattingBox.scrollTop = chattingBox.scrollHeight;
    }
  }, [messageList]);

  return (
    <div className={style.ChatBoard}>
      <div className={style.Header}></div>
      <div id="chatBox" className={style.Body}>
        {messageList.map((item, i) => {
          const t = new Date(item.createdDate);

          const hour = t.getHours();
          const minute = t.getMinutes();

          if (item.sender === chatPartner) {
            return (
              <div className={style.yourMessageBox} key={i}>
                <span className={style.message}>{item.message}</span>
                <span className={style.time}>
                  {hour}시 {minute}분
                </span>
              </div>
            );
          } else {
            return (
              <div className={style.myMessageBox} key={i}>
                <span className={style.time}>
                  {hour}시 {minute}분
                </span>
                <span className={style.message}>{item.message}</span>
              </div>
            );
          }
        })}
      </div>
      <ChatInput setMessageList={setMessageList} />
    </div>
  );
}

export default ChatBoard;
