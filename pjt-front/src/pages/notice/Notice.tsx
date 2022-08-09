import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import NoticeListItem from "../../component/NoticeListItem";
import { loadingActions } from "../../store";
import { NoticeItem, User } from "./../../Interface";
import style from "./Notice.module.css";

interface SubProps {
  num: number;
  setPageNum: Dispatch<React.SetStateAction<number>>;
}

function PageButton({ num, setPageNum }: SubProps): JSX.Element {
  const onPageClick = () => {
    setPageNum(num);
  };

  return (
    <button onClick={onPageClick} className={style.buttonRender}>
      {num}
    </button>
  );
}

function Notice(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [noticeList, setNoticeList] = useState<NoticeItem[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

  const onClick = () => {
    navigate("/notice/create");
  };

  const buttonRendering = () => {
    const result = [];
    for (let i = 1; i <= totalCount; i++) {
      result.push(<PageButton key={i} num={i} setPageNum={setPageNum} />);
    }

    return result;
  };

  useEffect(() => {
    const callNotice = async () => {
      dispatch(loadingActions.toggle());
      try {
        const response = await api.notice.readAll(pageNum);
        dispatch(loadingActions.toggle());
        if (response.status === 200) {
          setNoticeList(response.data.noticeDtoList);
          setTotalCount(Math.floor(response.data.totalCount / 10) + 1);
        } else {
          alert("정보 조회에 실패했습니다.");
          navigate("/");
        }
      } catch (err) {
        dispatch(loadingActions.toggle());
        console.error(err);
      }
    };

    callNotice();
  }, [navigate, dispatch, pageNum]);

  return (
    <div className={style.notice}>
      <section className={style.noticeTop}>
        <div>
          <div className={style.title}>공지사항</div>
          <div className={style.content}>
            Artwork Auction의 공지사항을 확인해보세요!
          </div>
        </div>
      </section>
      <ul>
        <div className={style.ulTop}>
          <div>제목</div>
          <div>작성일</div>
        </div>
        {noticeList.map((notice) => {
          return (
            <li key={notice.notice_id}>
              <NoticeListItem notice={notice}></NoticeListItem>
            </li>
          );
        })}
      </ul>
      {userObject && userObject._manager && (
        <div className={style.buttonBox}>
          <button onClick={onClick} className={style.btn}>
            작성
          </button>
        </div>
      )}
      <div>{buttonRendering()}</div>
    </div>
  );
}

export default Notice;
