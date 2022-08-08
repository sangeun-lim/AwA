import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import { dbService } from "../../fbase";
import { MyChatList, User } from "../../Interface";
import { firstChatActions } from "../../store";
import style from "./ChatList.module.css";
import ChatListItem from "./ChatListItem";
import socketIOClient from "socket.io-client";

const SOCKET = socketIOClient("localhost:4002");

function ChatList(): JSX.Element {
  const dispatch = useDispatch();

  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );
  const chatPartner = useSelector(
    (state: { chatPartner: string }) => state.chatPartner
  );
  const [chatList, setChatList] = useState<MyChatList[]>([]);

  const getChatList = async () => {
    const q = query(
      collection(dbService, "ChattingRoom"),
      where("myEmail", "==", userObject.email),
      orderBy("recentlyDate", "desc")
    );

    const myChatList = await getDocs(q);

    const userEmailList: string[] = [];
    const midChatList: MyChatList[] = myChatList.docs.map((doc) => {
      const chatRoom: MyChatList = { ...doc.data(), id: doc.id };

      if (chatPartner === doc.data().partnerEmail) {
        dispatch(firstChatActions.isNotFirst());
      }

      userEmailList.push(doc.data().partnerEmail);
      return chatRoom;
    });

    const response = await api.chatting.getUserList(userEmailList);

    if (response.status === 200) {
      const chattingList: MyChatList[] = [];
      for (let i = 0; i < midChatList.length; i++) {
        chattingList.push({ ...midChatList[i], ...response.data[i] });
      }

      setChatList(chattingList);
    }
  };

  useEffect(() => {
    /* eslint-disable */
    getChatList();
  }, []);

  useEffect(() => {
    SOCKET.emit("enter_room", userObject.email);
  }, [userObject.email]);

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
            topChat.partnerEmail = chatPartner;
          }

          return (
            chat.partnerEmail !== data.sender &&
            chat.partnerEmail !== data.receiver
          );
        });
      });

      if (!topChat?.id) {
        const response = await api.chatting.getUserList([chatPartner]);
        topChat.nickname = response.data[0].nickname;
        topChat.profile_picture_url = response.data[0].profile_picture_url;
        topChat.createdDate = data.createdDate;
        topChat.recentlyDate = data.createdData;
        topChat.recentlyMessage = data.message;
        topChat.partnerEmail = chatPartner;
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
