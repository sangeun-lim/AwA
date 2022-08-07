import React, { Dispatch, useState } from "react";
import { ArtworkItem, User } from "../../Interface";
import { useSelector } from "react-redux";
import axios from "axios";
import style from "./Comment.module.css";

interface Props {
  artworkId: string;
  setItem: Dispatch<React.SetStateAction<ArtworkItem>>;
}

interface NewComment {
  content: string;
  parent_artwork_id: number;
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios({
      // url: `http://i7c101.p.ssafy.io:8080/comment`,
      url: "http://i7c101.p.ssafy.io:8081/api/",
      method: "post",
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token") || "",
        RefreshToken: localStorage.getItem("refresh_token") || "",
      },
      data: {
        content: newComment.content,
        nickname: userObject.nickname,
        parent_artwork_id: artworkId,
      },
    });
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
          name="content"
          type="text"
          placeholder="댓글을 작성하세요."
          onChange={onChange}
          value={newComment.content || ""}
        />
        <input type="submit" value="댓글작성" />
      </form>
    </div>
  );
}

export default CommentForm;
