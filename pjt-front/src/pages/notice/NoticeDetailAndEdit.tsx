import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { NoticeItem } from "../../Interface";

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
        <div>
          <h1>NoticeEdit</h1>
          <form onSubmit={onSubmit}>
            <input
              name="title"
              type="text"
              placeholder="제목"
              value={editNotice.title || ""}
              onChange={onChange}
              required
            />
            <br></br>
            <textarea
              name="content"
              value={editNotice.content || ""}
              cols={30}
              rows={10}
              placeholder="내용을 입력해주세요"
              onChange={onChange}
              required
            ></textarea>
            <br></br>
            <input type="submit" value="수정" />
          </form>
          <button onClick={onEditClick}>취소</button>
        </div>
      ) : (
        <div>
          <h1>NoticeDetail</h1>
          <h2>{notice?.title}</h2>
          <p>{notice?.content}</p>
          <button onClick={onEditClick}>수정</button>
          <button onClick={onDeleteClick}>삭제</button>
          <button onClick={onListClick}>목록</button>
        </div>
      )}
    </div>
  );
}

export default NoticeDetailAndEdit;
