import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import NoticeListItem from "../../component/NoticeListItem";
import { NoticeItem } from "./../../Interface";

function Notice(): JSX.Element {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState<Array<NoticeItem>>([]);

  const onClick = () => {
    navigate("/notice/edit");
  };

  useEffect(() => {
    const callNotice = async () => {
      const response = await axios({
        url: api.notice.readAll(),
        method: "get",
      });

      console.log(response.status);

      if (response.status === 200) {
        const notices = response.data;
        const newNotices: Array<NoticeItem> = notices.map(
          (notice: NoticeItem) => {
            const { notice_id, title, content, createdDate, modifiedDate } =
              notice;
            const newNotice: NoticeItem = {
              notice_id,
              title,
              content,
              createdDate,
              modifiedDate,
            };
            return newNotice;
          }
        );
        setNoticeList(newNotices);
      } else {
        alert("정보 조회에 실패했습니다.");
        navigate("/");
      }
    };

    callNotice();
  }, [navigate]);

  return (
    <>
      <h1>Notice</h1>
      <button onClick={onClick}>글쓰기</button>
      {noticeList.map((notice) => {
        return (
          <div key={notice.notice_id}>
            <NoticeListItem notice={notice}></NoticeListItem>
          </div>
        );
      })}
    </>
  );
}

export default Notice;
