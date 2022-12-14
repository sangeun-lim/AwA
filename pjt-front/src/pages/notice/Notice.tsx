import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import NoticeListItem from "../../component/NoticeListItem";
import { loadingActions } from "../../store";
import { NoticeItem, User } from "./../../Interface";
import style from "./Notice.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface SubProps {
  num: number;
  setPageNum: Dispatch<React.SetStateAction<number>>;
  pageNum: number;
}

function PageButton({ num, setPageNum, pageNum }: SubProps): JSX.Element {
  const onPageClick = () => {
    setPageNum(num);
  };

  return (
    <button
      onClick={onPageClick}
      className={num === pageNum ? style.pageButtonActive : style.pageButton}
    >
      {num}
    </button>
  );
}

function Notice(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [noticeList, setNoticeList] = useState<NoticeItem[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  // const [pageLength, setPageLength] = useState<number>(0);
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
      result.push(
        <PageButton key={i} num={i} setPageNum={setPageNum} pageNum={pageNum} />
      );
    }

    // setPageLength(result.length);

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
          alert("?????? ????????? ??????????????????.");
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
          <div className={style.title}>????????????</div>
          <div className={style.content}>
            Artwork Auction??? ??????????????? ??????????????????!
          </div>
        </div>
      </section>
      <ul>
        <div className={style.ulTop}>
          <div>??????</div>
          <div>?????????</div>
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
            ??????
          </button>
        </div>
      )}
      <div className={style.pageButtonBox}>
        {pageNum === 1 ? null : (
          <div>
            <button onClick={() => setPageNum(1)} className={style.pageButton}>
              ???????????????
            </button>
            <button
              onClick={() => setPageNum(pageNum - 1)}
              className={style.pageButton}
            >
              <AiOutlineLeft className={style.pageIcon} />
            </button>
          </div>
        )}
        {buttonRendering()}
        {pageNum === totalCount ? null : (
          <div>
            <button
              onClick={() => setPageNum(pageNum + 1)}
              className={style.pageButton}
            >
              <AiOutlineRight className={style.pageIcon} />
            </button>
            <button
              onClick={() => setPageNum(totalCount)}
              className={style.pageButton}
            >
              ????????????
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notice;
