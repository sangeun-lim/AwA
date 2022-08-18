import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyChatList } from "../../Interface";
import { chatPartnerActions } from "../../store";
import style from "./ChatListItem.module.css";

interface Props {
  item: MyChatList;
}

function ChatListItem({ item }: Props): JSX.Element {
  const dispatch = useDispatch();
  const chatPartner = useSelector(
    (state: { chatPartner: string }) => state.chatPartner
  );

  const [time, setTime] = useState({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    date: 0,
  });

  const onClick = async () => {
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
        date: Math.floor(
          (new Date().getTime() - t.getTime()) / (1000 * 60 * 60 * 24)
        ),
      });
    }
  }, [item.recentlyDate]);

  return (
    <div
      onClick={onClick}
      className={
        chatPartner === item.partnerEmail
          ? style.ChatListItem2
          : style.ChatListItem
      }
    >
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
        <div className={style.infoTop}>
          <div className={style.nickname}>{item.nickname}</div>
          {time.date < 1 ? (
            <div className={style.recentlyDate}>
              {time.hour}시 {time.minute}분
            </div>
          ) : (
            <div className={style.recentlyDate}>{time.date}일 전</div>
          )}
        </div>
        <div className={style.recentlyMessage}>{item.recentlyMessage}</div>
      </div>
    </div>
  );
}

export default ChatListItem;
