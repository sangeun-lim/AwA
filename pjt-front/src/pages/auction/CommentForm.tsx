import React, { useState } from "react";
import { User } from "../../Interface";
import { useSelector } from "react-redux";
import axios from "axios";

interface Props {
  artworkId: string;
}

interface NewComment {
  content: string;
  nickname: string;
  parent_artwork_id: number;
}

const newCommentDefaultData = {
  content: "",
  nickname: "",
  parent_artwork_id: 0,
};

function CommentForm(props: Props): JSX.Element {
  const { artworkId } = props;
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
      url: `http://i7c101.p.ssafy.io:8080/comment`,
      method: "post",
      data: {
        content: newComment.content,
        nickname: userObject.nickname,
        parent_artwork_id: artworkId,
      },
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token") || "",
        RefreshToken: localStorage.getItem("refresh_token") || "",
      },
    });
    if (response.status === 200) {
      setNewComment(response.data);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h4>댓글 : </h4>
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
