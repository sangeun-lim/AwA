import React, { Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  User,
  editComment,
  ArtworkItem,
  ArtworkComment,
} from "../../Interface";
import api from "../../api/api";

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

    const formData = {
      content: editComment.content,
      nickname: editComment.nickname,
      parent_artwork_id: editComment.parent_artwork_id,
    };

    const response = await api.comment.editComment(
      formData,
      editComment.comment_id
    );

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
        const response = await api.comment.deleteComment(comment.comment_id);

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
