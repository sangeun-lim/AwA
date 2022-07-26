import { User } from "firebase/auth";
import React, { Dispatch, useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatBoard from "./ChatBoard";
import "./Chatting.css";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { dbService } from "../../fbase";

interface MainProps {
  userObject: User;
  selectChat: string | null;
  setSelectChat: Dispatch<React.SetStateAction<string | null>>;
}

// 채팅 페이지
function Chatting({
  userObject,
  selectChat,
  setSelectChat,
}: MainProps): JSX.Element {
  const [roomName, setRoomName] = useState<string | null>(null);

  useEffect(() => {
    // 현재 있는 채팅방인지 확인하고 없으면 그 유저와의 채팅방을 추가한다.
    const checkRoom = async () => {
      if (selectChat && userObject.email) {
        const q = query(
          collection(dbService, "chatList"),
          where(userObject.email, "in", ["user1, user2"]),
          where(selectChat, "in", ["user1", "user2"])
        );

        const data = (await getDocs(q)).docs;

        if (data.length === 0) {
          await addDoc(collection(dbService, "chatList"), {
            user1: userObject.email,
            user2: selectChat,
          });
        }
      }
    };

    checkRoom();

    // SOCKET 방 이름 지정
    if (selectChat && userObject.email) {
      const newRoom: string[] = [userObject.email, selectChat];
      newRoom.sort();

      setRoomName(newRoom[0] + newRoom[1]);
    }
  }, [selectChat]);

  return (
    <div>
      <h1>Chatting</h1>
      <ChatList
        userObject={userObject}
        setSelectChat={setSelectChat}
      ></ChatList>
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
