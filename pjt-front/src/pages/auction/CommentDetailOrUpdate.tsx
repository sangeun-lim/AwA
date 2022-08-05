import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { User, editComment } from "../../Interface";
import axios from "axios";

interface Comment {
  comment_id: number;
  content: string;
  nickname: string;
  parent_artwork_id: string;
}

const commentDefaultData = {
  comment_id: 0,
  content: "",
  nickname: "",
  parent_artwork_id: "",
};

function CommentDetailOrUpdate({
  artworkId,
  commentId,
  nickname,
}: {
  artworkId: string;
  commentId: number;
  nickname: string;
}): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  // const address = params.id || "";

  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );

  const [comment, setComment] = useState<Comment>(commentDefaultData);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<editComment>({
    comment_id: commentId,
    content: comment.content,
    nickname: nickname,
    parent_artwork_id: artworkId,
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setEditComment((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const response = await axios({
      url: `http://i7c101.p.ssafy.io:8080/comment/${editComment.comment_id}`,
      method: "put",
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token") || "",
        RefreshToken: localStorage.getItem("refresh_token") || "",
      },
      data: {
        content: editComment.content,
        nickname: editComment.nickname,
        parent_artwork_id: editComment.parent_artwork_id,
      },
    });
    if (response.status === 200) {
      setComment(response.data);
    }
  };

  const onEditClick = () => {
    setComment(editComment);
    setOnEdit(!onEdit);
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("댓글 삭제?");
    if (del) {
      try {
        const response = await axios({
          url: `http://i7c101.p.ssafy.io:8080/comment/${commentId}`,
          method: "delete",
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token") || "",
            RefreshToken: localStorage.getItem("refresh_token") || "",
          },
        });
        if (response.data === 1) {
          navigate(`/auction/detail/${artworkId}`);
        } else {
          alert("댓글을 삭제할수 없습니다.");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {/* 댓글 쓴 사람이랑 수정하는 사람이 같으면 */}
      {userObject.nickname === nickname ? (
        <div>
          {onEdit ? (
            <div>
              <form onSubmit={onSubmit}>
                <input
                  name="content"
                  type="text"
                  placeholder="댓글을 작성하세요."
                  onChange={onChange}
                  value={editComment.content || ""}
                />
                <input type="submit" value="댓글수정" />
              </form>
            </div>
          ) : (
            <div>
              <button onClick={onEditClick}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </div>
          )}
        </div>
      ) : (
        // 다르면 안보이게
        <div></div>
      )}
    </div>
  );
}

export default CommentDetailOrUpdate;
