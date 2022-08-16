import {
  doc,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbService } from "../../fbase";
import { NewMessage, User } from "../../Interface";
import { firstChatActions } from "../../store";
import socketIOClient from "socket.io-client";
import style from "./ChatInput.module.css";

const SOCKET = socketIOClient("https://awa24.site:4002/");

function ChatInput() {
  const dispatch = useDispatch();
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );
  const chatPartner = useSelector(
    (state: { chatPartner: string }) => state.chatPartner
  );
  // 현재 채팅 상대와 처음으로 채팅하는가?
  const isFirst = useSelector((state: { isFirst: boolean }) => state.isFirst);

  const [message, setMessage] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 채팅방 이름지정
    const roomName = [userObject.email, chatPartner];
    roomName.sort();
    const realRoomName: string = roomName[0] + roomName[1];

    const newMessage: NewMessage = {
      sender: userObject.email,
      receiver: chatPartner,
      message: message,
      createdDate: Date.now(),
      roomName: realRoomName,
    };

    SOCKET.emit("send message", newMessage, realRoomName);

    await addDoc(collection(dbService, "Chatting"), newMessage);

    const q = query(
      collection(dbService, "ChattingRoom"),
      where("myEmail", "==", userObject.email),
      where("partnerEmail", "==", chatPartner)
    );

    const response = await getDocs(q);

    if (response.docs.length === 0) {
      await addDoc(collection(dbService, "ChattingRoom"), {
        myEmail: userObject.email,
        partnerEmail: chatPartner,
        createdDate: newMessage.createdDate,
        recentlyDate: newMessage.createdDate,
        recentlyMessage: message,
      });

      await addDoc(collection(dbService, "ChattingRoom"), {
        myEmail: chatPartner,
        partnerEmail: userObject.email,
        createdDate: newMessage.createdDate,
        recentlyDate: newMessage.createdDate,
        recentlyMessage: message,
      });

      dispatch(firstChatActions.isNotFirst());
    }

    const response3 = await getDocs(q);

    response3.docs.forEach(async (document) => {
      await updateDoc(doc(dbService, `ChattingRoom/${document.id}`), {
        recentlyMessage: message,
        recentlyDate: newMessage.createdDate,
      });
    });

    const q2 = query(
      collection(dbService, "ChattingRoom"),
      where("myEmail", "==", chatPartner),
      where("partnerEmail", "==", userObject.email)
    );

    const response2 = await getDocs(q2);

    response2.docs.forEach(async (document) => {
      await updateDoc(doc(dbService, `ChattingRoom/${document.id}`), {
        recentlyMessage: message,
        recentlyDate: newMessage.createdDate,
      });
    });

    setMessage("");
  };

  return (
    <form onSubmit={onSubmit} className={style.Footer}>
      <input
        type="text"
        className={style.chatBox}
        onChange={onChange}
        value={message}
        placeholder="메시지를 입력해주세요"
      />
      <button className={style.submitButton}>전송</button>
    </form>
  );
}

export default ChatInput;
