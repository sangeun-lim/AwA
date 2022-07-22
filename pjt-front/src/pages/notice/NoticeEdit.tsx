import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../fbase";

interface newNote {
  title: string;
  content: string;
  id?: string;
}

const defaultNotice: newNote = {
  title: "",
  content: "",
};

function NoticeEdit(): JSX.Element {
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

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const newNote = await addDoc(collection(dbService, "notice"), {
      title: newNotice.title,
      content: newNotice.content,
      createdAt: Date.now(),
    });

    setNewNotice(defaultNotice);
    navigate(`/notice/${newNote.id}`);
  };

  return (
    <div>
      <h1>NoticeEdit</h1>
      <form onSubmit={onSubmit}>
        <input
          name="title"
          type="text"
          placeholder="제목"
          value={newNotice.title || ""}
          onChange={onChange}
          required
        />
        <br></br>
        <textarea
          name="content"
          value={newNotice.content || ""}
          cols={30}
          rows={10}
          placeholder="내용을 입력해주세요"
          onChange={onChange}
          required
        ></textarea>
        <br></br>
        <input type="submit" value="작성" />
      </form>
    </div>
  );
}

export default NoticeEdit;
