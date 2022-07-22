import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoticeListItem from "../../component/NoticeListItem";
import { dbService } from "../../fbase";
import { NoticeItem } from "./../../Interface";

function Notice(): JSX.Element {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState<Array<NoticeItem>>([]);

  const onClick = () => {
    navigate("/notice/edit");
  };

  const callNotice = async () => {
    const q = query(
      collection(dbService, "notice"),
      orderBy("createdAt", "desc")
    );

    const notices = (await getDocs(q)).docs;

    const newNotices: Array<NoticeItem> = notices.map((notice) => {
      const { title, content, createdAt } = notice.data();
      const newNotice: NoticeItem = {
        title,
        content,
        createdAt,
        id: notice.id,
      };
      return newNotice;
    });

    setNoticeList(newNotices);
  };

  useEffect(() => {
    callNotice();
  });

  return (
    <>
      <h1>Notice</h1>
      <button onClick={onClick}>글쓰기</button>
      {noticeList.map((notice) => {
        return (
          <div key={notice.id}>
            <NoticeListItem notice={notice}></NoticeListItem>
          </div>
        );
      })}
    </>
  );
}

export default Notice;
