import React, { Dispatch, FormEvent, useState } from "react";
import { ArtworkItem, User } from "../../Interface";
import { useSelector } from "react-redux";
import style from "./Comment.module.css";
import api from "../../api/api";

interface Props {
  artworkId: number;
  setItem: Dispatch<React.SetStateAction<ArtworkItem>>;
}

interface NewComment {
  content: string;
}

const newCommentDefaultData = {
  content: "",
  parent_artwork_id: 0,
};

function CommentForm({ artworkId, setItem }: Props): JSX.Element {
  const [newComment, setNewComment] = useState<NewComment>(
    newCommentDefaultData
  );
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setNewComment((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      content: newComment.content,
      nickname: userObject.nickname,
      parent_artwork_id: artworkId,
    };
    const response = await api.comment.createComment(formData);

    if (response.status === 200) {
      setNewComment(newCommentDefaultData);
      setItem((prev) => {
        return {
          ...prev,
          comments: prev.comments.concat(response.data),
        };
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={style.commentForm}>
        <input
          disabled={!userObject}
          name="content"
          type="text"
          placeholder={
            !userObject ? "로그인해야 이용가능합니다" : "댓글을 입력해주세요"
          }
          onChange={onChange}
          value={newComment.content || ""}
          required
        />
        <input type="submit" value="댓글작성" disabled={!userObject} />
      </form>
    </div>
  );
}

export default CommentForm;
