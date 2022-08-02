import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import style from "./Notice.module.css";
import { noticeCreateDefaultData } from "./../../defaultData";
import { NewNoticeData } from "./../../api/apiInterface";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store";

function NoticeCreate(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className={`container`}>
      <h1 className={style.title}>NoticeCreate</h1>
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
        <br></br>
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
        <br></br>
        <div className={style.buttonBox}>
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
