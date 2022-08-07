import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { chatPartnerActions } from "../../store";
import { MyChatList } from "./ChatList";
import style from "./ChatListItem.module.css";

interface Props {
  item: MyChatList;
}

function ChatListItem({ item }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [time, setTime] = useState({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
  });

  const onClick = () => {
    if (item.partnerEmail) {
      dispatch(chatPartnerActions.setPartner(item.partnerEmail));
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
          <span className={style.recentlyDate}>
            {time.hour}시 {time.minute}분
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
