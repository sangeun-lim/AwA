import { User } from "firebase/auth";
import React, { Dispatch, useEffect, useState } from "react";
import { ChattingRoom } from "../../Interface";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dbService } from "../../fbase";

import "./ChatList.css";

interface Props {
  userObject: User;
  setSelectChat: Dispatch<React.SetStateAction<string | null>>;
}

interface SubProps {
  setSelectChat: Dispatch<React.SetStateAction<string | null>>;
  item: string;
}

// 페이지 좌측 채팅 리스트 목록 컴포넌트
function ChatList({ userObject, setSelectChat }: Props): JSX.Element {
  const [chatList, setChatList] = useState<ChattingRoom[]>([]);

  // 처음에 들어왔을 때, 해당 유저의 유저 목록을 불러오는 요청 있어야됨. => chatList에 저장
  useEffect(() => {
    const callChatList = async () => {
      if (userObject.email) {
        const q = query(
          collection(dbService, "chatList"),
          where(userObject.email, "in", ["user1, user2"])
        );

        const chats = (await getDocs(q)).docs;

        const docs: ChattingRoom[] = chats.map((chat) => {
          const { user1, user2 } = chat.data();
          const roomData: ChattingRoom = {
            id: chat.id,
            user1,
            user2,
          };
          return roomData;
        });

        setChatList(docs);
      }
    };

    callChatList();
  }, []);

  return (
    <div>
      {chatList.map((item) => {
        const email = userObject.email === item.user1 ? item.user2 : item.user1;

        return (
          <ChatListComponent
            key={item.id}
            item={email}
            setSelectChat={setSelectChat}
          ></ChatListComponent>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------------------------------------

// 채팅방 리스트 아이템 컴포넌트
function ChatListComponent({ setSelectChat, item }: SubProps) {
  const onClick = () => {
    setSelectChat(item);
  };

  return (
    <>
      <div onClick={onClick}>{item}</div>
    </>
  );
}

export default ChatList;
