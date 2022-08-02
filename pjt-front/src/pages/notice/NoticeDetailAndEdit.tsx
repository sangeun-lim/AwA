import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NoticeItem, NoticeEditing } from "../../Interface";
import style from "./Notice.module.css";
import { noticeDefaultData } from "./../../defaultData";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store";

function NoticeDetailAndEdit(): JSX.Element {
  const params = useParams();
  const address = params.id || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notice, setNotice] = useState<NoticeItem>(noticeDefaultData);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editNotice, setEditNotice] = useState<NoticeEditing>({
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

    dispatch(loadingActions.toggle());

    try {
      const response = await api.notice.readOrUpdateOrDelete(
        address,
        {
          title: editNotice.title,
          content: editNotice.content,
        },
        "put"
      );

      dispatch(loadingActions.toggle());

      if (response.status === 200) {
        const updateValue = await api.notice.readOrUpdateOrDelete(
          address,
          null,
          "get"
        );

        const newData = updateValue.data;

        setNotice({
          ...newData,
        });
      }

      setOnEdit(!onEdit);
    } catch (err) {
      setOnEdit(!onEdit);
      dispatch(loadingActions.toggle());
      console.error(err);
    }
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("삭제하시겠습니까?");
    if (del) {
      dispatch(loadingActions.toggle());

      try {
        const response = await api.notice.readOrUpdateOrDelete(
          address,
          null,
          "delete"
        );

        dispatch(loadingActions.toggle());

        if (response.status === 200) {
          alert("삭제되었습니다");
          navigate("/notice");
        }
      } catch (err) {
        dispatch(loadingActions.toggle());
        console.error(err);
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      const response = await api.notice.readOrUpdateOrDelete(
        address,
        null,
        "get"
      );

      const newData = response.data;

      setNotice({
        ...newData,
      });
    }

    if (address !== "") {
      try {
        loadData();
      } catch (err) {
        console.error(err);
        navigate("/notice");
      }
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
