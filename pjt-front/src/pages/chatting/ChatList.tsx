import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/api";
import { dbService } from "../../fbase";
import { MyChatList, User } from "../../Interface";
import style from "./ChatList.module.css";
import ChatListItem from "./ChatListItem";
import socketIOClient from "socket.io-client";

const SOCKET = socketIOClient("https://awa24.site:4002");

function ChatList(): JSX.Element {
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );

  const [chatList, setChatList] = useState<MyChatList[]>([]);

  const getChatList = async () => {
    // 내 채팅 리스트들을 불러오자
    const q = query(
      collection(dbService, "ChattingRoom"),
      where("myEmail", "==", userObject.email),
      orderBy("recentlyDate", "desc")
    );
    const myChatList = await getDocs(q);

    // 내 채팅 리스트에 존재하는 유저들의 이메일을 담는 배열 선언
    const userEmailList: string[] = [];
    // 이미 존재하는 내 채팅방들을 전체 순회하면서
    const midChatList: MyChatList[] = myChatList.docs.map((doc) => {
      // 각 채팅방 정보
      const chatRoom: MyChatList = { ...doc.data(), id: doc.id };

      // userEmailList에 상대 이메일을 모두 담는다.
      userEmailList.push(doc.data().partnerEmail);
      return chatRoom;
    });

    // 이메일 배열을 바탕으로
    if (userEmailList.length > 0) {
      // 유저들의 닉네임과 프사를 받아온다.
      const response = await api.chatting.getUserList(userEmailList);

      // 각 채팅방에 유저의 프사와 닉네임을 넣어준다.
      const chattingList: MyChatList[] = [];
      for (let i = 0; i < midChatList.length; i++) {
        chattingList.push({ ...midChatList[i], ...response.data[i] });
      }

      // 채팅방 상태를 변경한다.
      setChatList(chattingList);
    }
  };

  useEffect(() => {
    if (userObject?.email) {
      /* eslint-disable */
      getChatList();
    }
  }, [userObject?.email]);

  useEffect(() => {
    if (userObject?.email) {
      SOCKET.emit("enter_room", userObject.email);
    }
  }, [userObject?.email]);

  useEffect(() => {
    SOCKET.on("receive message", async (data) => {
      const topChat: MyChatList = {};

      setChatList((prev) => {
        return prev.filter((chat) => {
          if (
            chat.partnerEmail === data.sender ||
            chat.partnerEmail === data.receiver
          ) {
            topChat.id = chat.id;
            topChat.createdDate = chat.createdDate;
            topChat.nickname = chat.nickname;
            topChat.profile_picture_url = chat.profile_picture_url;
            topChat.recentlyDate = data.createdDate;
            topChat.recentlyMessage = data.message;
            if (chat.partnerEmail === data.sender) {
              topChat.partnerEmail = data.sender;
            } else if (chat.partnerEmail === data.receiver) {
              topChat.partnerEmail = data.receiver;
            }
          }

          return (
            chat.partnerEmail !== data.sender &&
            chat.partnerEmail !== data.receiver
          );
        });
      });

      if (!topChat?.nickname) {
        if (userObject?.email === data.sender) {
          topChat.partnerEmail = data.receiver;
        } else {
          topChat.partnerEmail = data.sender;
        }
        if (topChat.partnerEmail) {
          const response = await api.chatting.getUserList([
            topChat.partnerEmail,
          ]);
          topChat.nickname = response.data[0]?.nickname;
          topChat.profile_picture_url = response.data[0]?.profile_picture_url;
          topChat.createdDate = data.createdDate;
          topChat.recentlyDate = data.createdData;
          topChat.recentlyMessage = data.message;
        }
      }

      setChatList((prev) => {
        return [topChat].concat(prev);
      });
    });
  }, []);

  return (
    <div className={style.ChatList}>
      <div className={style.Header}>
        <span>내 채팅방 목록</span>
      </div>
      <div className={style.Body}>
        {chatList.map((item) => {
          return <ChatListItem item={item} key={item.partnerEmail} />;
        })}
      </div>
    </div>
  );
}

export default ChatList;
