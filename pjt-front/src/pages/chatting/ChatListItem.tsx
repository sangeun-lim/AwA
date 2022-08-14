import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbService } from "./../../fbase";
import { MyChatList, User } from "../../Interface";
import { chatPartnerActions } from "../../store";
import style from "./ChatListItem.module.css";

interface Props {
  item: MyChatList;
  setChatList: Dispatch<SetStateAction<MyChatList[]>>;
}

function ChatListItem({ item, setChatList }: Props): JSX.Element {
  const dispatch = useDispatch();
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );
  const [time, setTime] = useState({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
  });

  const onClick = async () => {
    if (item.partnerEmail) {
      dispatch(chatPartnerActions.setPartner(item.partnerEmail));
      setChatList((prev) => {
        return prev.map((docs: MyChatList) => {
          if (docs.partnerEmail === item.partnerEmail) {
            return {
              ...docs,
              unReadChatCount: 0,
            };
          } else {
            return docs;
          }
        });
      });

      const q = query(
        collection(dbService, "ChattingRoom"),
        where("myEmail", "==", userObject.email),
        where("partnerEmail", "==", item.partnerEmail)
      );

      const response = await getDocs(q);

      response.docs.forEach(async (document) => {
        await updateDoc(doc(dbService, `ChattingRoom/${document.id}`), {
          unReadChatCount: 0,
        });
      });
    }
  };

  useEffect(() => {
    if (item.recentlyDate) {
      const t = new Date(item.recentlyDate);
      setTime({
        year: t.getFullYear(),
        month: t.getMonth() + 1,
        day: t.getDay(),
        hour: t.getHours(),
        minute: t.getMinutes(),
      });
    }
  }, [item.recentlyDate]);

  return (
    <div onClick={onClick} className={style.ChatListItem}>
      {item.profile_picture_url ? (
        <img
          src={item.profile_picture_url}
          className={style.profileImage}
          alt="프로필 사진"
        />
      ) : (
        <img
          src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
          alt="프로필 사진"
          className={style.profileImage}
        />
      )}
      <div className={style.info}>
        <p className={style.nickname}>{item.nickname}</p>
        <div className={style.recentlyBox}>
          <p className={style.recentlyMessage}>{item.recentlyMessage}</p>
          {item.unReadChatCount ? (
            <span className={style.unReadCount}>{item.unReadChatCount}</span>
          ) : (
            <span></span>
          )}
          <span className={style.recentlyDate}>
            {time.hour}시 {time.minute}분
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
