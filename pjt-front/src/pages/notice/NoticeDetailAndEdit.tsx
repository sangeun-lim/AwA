import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NoticeItem, NoticeEditing, User } from "../../Interface";
import style from "./Notice.module.css";
import { noticeDefaultData } from "./../../defaultData";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
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
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

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
      const response = await api.notice.updateOrDelete(
        address,
        {
          title: editNotice.title,
          content: editNotice.content,
        },
        "put"
      );

      dispatch(loadingActions.toggle());

      if (response.status === 200) {
        const updateValue = await api.notice.read(address);

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
    const del: boolean = window.confirm("?????????????????????????");
    if (del) {
      dispatch(loadingActions.toggle());

      try {
        const response = await api.notice.updateOrDelete(
          address,
          null,
          "delete"
        );

        dispatch(loadingActions.toggle());

        if (response.status === 200) {
          alert("?????????????????????");
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
      const response = await api.notice.read(address);

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
        <div className={style.noticeCreate}>
          <section className={style.noticeTop}>
            <div>
              <div className={style.title}>????????????</div>
              <div className={style.content}>
                Artwork Auction??? ??????????????? ??????????????????!
              </div>
            </div>
          </section>
          <form onSubmit={onSubmit} className={style.form}>
            <div className={style.inputContainer}>
              <input
                name="title"
                type="text"
                placeholder="??????"
                value={editNotice.title || ""}
                onChange={onChange}
                className={style.input}
                required
              />
            </div>
            <div className={style.inputContainer}>
              <textarea
                name="content"
                value={editNotice.content || ""}
                cols={30}
                rows={10}
                placeholder="????????? ??????????????????"
                onChange={onChange}
                className={style.inputTextarea}
                required
              ></textarea>
            </div>
            <div className={style.formButtonBox}>
              <input
                type="submit"
                value="??????"
                className={style.submitButton}
              />
              <button onClick={onEditClick} className={style.btn}>
                ??????
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={style.noticeDetail}>
          <section className={style.noticeTop}>
            <div>
              <div className={style.title}>????????????</div>
              <div className={style.content}>
                Artwork Auction??? ??????????????? ??????????????????!
              </div>
            </div>
          </section>
          <div className={style.noticeTitle}>
            <div>{notice?.title}</div>
            <span>{`${year}.${month}.${day}`}</span>
          </div>
          <div className={style.noticeContent}>{notice?.content}</div>
          <div className={style.buttonBox}>
            {userObject && userObject._manager && (
              <button onClick={onEditClick} className={style.btn}>
                ??????
              </button>
            )}
            {userObject && userObject._manager && (
              <button onClick={onDeleteClick} className={style.btn}>
                ??????
              </button>
            )}
            <button onClick={onListClick} className={style.btn}>
              ??????
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoticeDetailAndEdit;
