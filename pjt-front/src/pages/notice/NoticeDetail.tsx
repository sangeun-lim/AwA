import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dbService } from "../../fbase";
import { NoticeItem } from "../../Interface";

interface Editing {
  title: string;
  content: string;
}

const defaultNotice: NoticeItem = {
  title: "",
  content: "",
  createdAt: new Date(),
  id: "",
};

function NoticeDetail(): JSX.Element {
  const params = useParams();
  const address = params.id;
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
    await updateDoc(doc(dbService, `notice/${address}`), {
      title: editNotice.title,
      content: editNotice.content,
    });

    const updateValue = await getDoc(doc(dbService, `notice/${address}`));
    const newData = updateValue.data();

    setNotice({
      ...newData,
      id: address,
    });

    setOnEdit(!onEdit);
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("삭제하시겠습니까?");
    if (del) {
      await deleteDoc(doc(dbService, `notice/${address}`));
      navigate("/notice");
    }
  };

  useEffect(() => {
    async function loadData() {
      const data = await getDoc(doc(dbService, `notice/${address}`));
      const newData = data.data();

      setNotice({
        ...newData,
        id: address,
      });
    }

    if (address) {
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

export default NoticeDetail;
