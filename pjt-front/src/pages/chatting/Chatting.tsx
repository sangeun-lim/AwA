import ChatList from "./ChatList";
import ChatBoard from "./ChatBoard";
import style from "./Chatting.module.css";
import { useSelector } from "react-redux";

// 채팅 페이지
function Chatting(): JSX.Element {
  const chatPartner = useSelector(
    (state: { chatPartner: string }) => state.chatPartner
  );

  return (
    <div className={style.Chatting}>
      <ChatList></ChatList>
      {chatPartner ? (
        <ChatBoard></ChatBoard>
      ) : (
        <div className={style.emptyBox}></div>
      )}
    </div>
  );
}

export default Chatting;
