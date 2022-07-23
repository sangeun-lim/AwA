import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dbService } from "../../fbase";

interface Editing {
  title: string;
  content: string;
}

function NoticeDetail(): JSX.Element {
  const params = useParams();
  const address = params.id;
  const navigate = useNavigate();
  const [notice, setNotice] = useState<any>(null);
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

  const onSubmit = async () => {
    await updateDoc(doc(dbService, `notice/${address}`), {
      title: editNotice.title,
      content: editNotice.content,
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
    const loadData = async () => {
      const data = await getDoc(doc(dbService, `notice/${address}`));
      const newData = data.data();

      return newData;
    };

    if (address) {
      const newData = loadData();
      setNotice({
        ...newData,
        id: address,
      });
    } else {
      navigate("/notice");
    }
  }, [address]);

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
