import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import style from "./Notice.module.css";
import { noticeCreateDefaultData } from "./../../defaultData";
import { NewNoticeData } from "./../../api/apiInterface";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store";
import { User } from "../../Interface";

function NoticeCreate(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

  const [newNotice, setNewNotice] = useState<NewNoticeData>(
    noticeCreateDefaultData
  );

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setNewNotice((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onCancelClick = () => {
    navigate("/notice");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loadingActions.toggle());
    try {
      const response = await api.notice.post(newNotice);

      dispatch(loadingActions.toggle());
      if (response.status === 200) {
        const note = response.data;
        navigate(`/notice/${note.notice_id}`);
      } else {
        alert("작성에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {
    if (!userObject || !userObject._manager) {
      navigate("/notice");
    }
  }, [navigate, userObject]);

  return (
    <div className={style.noticeCreate}>
      <section className={style.noticeTop}>
        <div>
          <div className={style.title}>공지사항</div>
          <div className={style.content}>
            Artwork Auction의 공지사항을 등록해주세요!
          </div>
        </div>
      </section>
      <form onSubmit={onSubmit} className={style.form}>
        <div className={style.inputContainer}>
          <input
            name="title"
            type="text"
            placeholder="제목"
            value={newNotice.title || ""}
            onChange={onChange}
            className={style.input}
            required
          />
        </div>
        <div className={style.inputContainer}>
          <textarea
            name="content"
            value={newNotice.content || ""}
            cols={30}
            rows={10}
            placeholder="내용을 입력해주세요"
            onChange={onChange}
            className={style.inputTextarea}
            required
          ></textarea>
        </div>
        <div className={style.formButtonBox}>
          <input type="submit" value="작성" className={style.submitButton} />
          <button onClick={onCancelClick} className={style.btn}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoticeCreate;
