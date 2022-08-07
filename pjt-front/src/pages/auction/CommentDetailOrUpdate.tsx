import React, { Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  User,
  editComment,
  ArtworkItem,
  ArtworkComment,
} from "../../Interface";
import axios from "axios";

interface Props {
  setItem: Dispatch<React.SetStateAction<ArtworkItem>>;
  comment: ArtworkComment;
}

function CommentDetailOrUpdate({ comment, setItem }: Props): JSX.Element {
  const navigate = useNavigate();
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<editComment>({
    comment_id: comment.comment_id,
    content: comment.content,
    nickname: userObject.nickname,
    parent_artwork_id: comment.parent_artwork_id,
    createdDate: comment.createdDate,
    modifiedDate: comment.modifiedDate,
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
      // url: `http://i7c101.p.ssafy.io:8080/comment/${editComment.comment_id}`,
      url: `http://i7c101.p.ssafy.io:8081/api/comment/${editComment.comment_id}`,
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
      const updateData = response.data;
      const {
        comment_id,
        content,
        nickname,
        parent_artwork_id,
        createdDate,
        modifiedDate,
      } = updateData;

      setEditComment({
        comment_id,
        content,
        nickname,
        parent_artwork_id,
        createdDate,
        modifiedDate,
      });

      setItem((prev) => {
        return {
          ...prev,
          comments: prev.comments.map((item) => {
            if (item.comment_id === comment_id) {
              return {
                comment_id,
                content,
                nickname,
                parent_artwork_id,
                createdDate,
                modifiedDate,
              };
            } else {
              return item;
            }
          }),
        };
      });
    }
    setOnEdit(!onEdit);
  };

  const onEditClick = () => {
    setOnEdit(!onEdit);
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm("댓글 삭제?");
    if (del) {
      try {
        const response = await axios({
          url: `http://i7c101.p.ssafy.io:8080/comment/${comment.comment_id}`,
          method: "delete",
          headers: {
            "X-AUTH-TOKEN": localStorage.getItem("token") || "",
            RefreshToken: localStorage.getItem("refresh_token") || "",
          },
        });
        if (response.status === 200) {
          setItem((prev) => {
            return {
              ...prev,
              comments: prev.comments.filter(
                (item) => item.comment_id !== comment.comment_id
              ),
            };
          });
          navigate(`/auction/detail/${comment.parent_artwork_id}`);
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
      {userObject.nickname === comment.nickname ? (
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
        <div></div>
      )}
    </div>
  );
}

export default CommentDetailOrUpdate;
