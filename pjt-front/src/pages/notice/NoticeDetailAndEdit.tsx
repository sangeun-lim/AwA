import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { NoticeItem } from "../../Interface";
import style from "./Notice.module.css";

interface Editing {
  title: string;
  content: string;
}

const defaultNotice: NoticeItem = {
  title: "",
  content: "",
  notice_id: 0,
  createdDate: "",
  modifiedDate: "",
};

function NoticeDetailAndEdit(): JSX.Element {
  const params = useParams();
  const address = params.id || "";
  const navigate = useNavigate();
  const [notice, setNotice] = useState<NoticeItem | any>(defaultNotice);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editNotice, setEditNotice] = useState<Editing>({
    title: notice.title,
    content: notice.content,
  });

  const date = new Date(notice.createdDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setEditNotice((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onListClick = () => {
    navigate("/notice");
  };

  const onEditClick = () => {
    setOnEdit(!onEdit);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios({
      url: api.notice.readOrUpdateOrDelete(address),
      method: "put",
      headers: {
        token: localStorage.getItem("token") || "",
      },
      data: {
        title: editNotice.title,
        content: editNotice.content,
      },
    });

    if (response.status === 200) {
      const updateValue = await axios({
        url: api.notice.readOrUpdateOrDelete(address),
        method: "GET",
      });
      const newData = updateValue.data;

      setNotice({
        ...newData,
      });
    }

    setOnEdit(!onEdit);
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("삭제하시겠습니까?");
    if (del) {
      const response = await axios({
        url: api.notice.readOrUpdateOrDelete(address),
        method: "delete",
        headers: {
          token: localStorage.getItem("token") || "",
        },
      });

      if (response.status === 200) {
        alert("삭제되었습니다");
        navigate("/notice");
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      const response = await axios({
        url: api.notice.readOrUpdateOrDelete(address),
        method: "get",
      });

      const newData = response.data;

      setNotice({
        ...newData,
      });
    }

    if (address !== "") {
      loadData();
    } else {
      navigate("/notice");
    }
  }, [address, navigate]);

  useEffect(() => {
    setEditNotice({
      title: notice.title,
      content: notice.content,
    });
  }, [onEdit, notice]);

  return (
    <div>
      {onEdit ? (
        <div className={`container`}>
          <h1 className={style.title}>NoticeEdit</h1>
          <form onSubmit={onSubmit} className={style.form}>
            <div className={style.inputContainer}>
              <input
                name="title"
                type="text"
                placeholder="제목"
                value={editNotice.title || ""}
                onChange={onChange}
                className={style.input}
                required
              />
            </div>
            <br></br>
            <div className={style.inputContainer}>
              <textarea
                name="content"
                value={editNotice.content || ""}
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
              <input
                type="submit"
                value="수정"
                className={style.submitButton}
              />
              <button onClick={onEditClick} className={style.btn}>
                취소
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={`container`}>
          <h1 className={style.title}>Notice</h1>
          <div className={style.noticeTitle}>
            <h2>{notice?.title}</h2>
            <span>{`${year}.${month}.${day}`}</span>
          </div>
          <div className={style.noticeContent}>
            <p>{notice?.content}</p>
          </div>
          <div className={style.buttonBox}>
            <button onClick={onEditClick} className={style.btn}>
              수정
            </button>
            <button onClick={onDeleteClick} className={style.btn}>
              삭제
            </button>
            <button onClick={onListClick} className={style.btn}>
              목록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoticeDetailAndEdit;
