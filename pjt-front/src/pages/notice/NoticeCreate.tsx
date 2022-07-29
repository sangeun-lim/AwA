import axios from "axios";
import React, { useState, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import style from "./Notice.module.css";

interface Props {
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

interface newNote {
  title: string;
  content: string;
  id?: string;
}

const defaultNotice: newNote = {
  title: "",
  content: "",
};

function NoticeCreate({ setIsLoading }: Props): JSX.Element {
  const navigate = useNavigate();
  const [newNotice, setNewNotice] = useState<newNote>(defaultNotice);

  const onChange = (e: any) => {
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

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await axios({
      url: api.notice.create(),
      method: "post",
      headers: {
        token: localStorage.getItem("token") || "",
      },
      data: {
        title: newNotice.title,
        content: newNotice.content,
      },
    });
    setIsLoading(false);
    if (response.status === 200) {
      const note = response.data;
      navigate(`/notice/${note.notice_id}`);
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
