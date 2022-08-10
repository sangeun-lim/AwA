import React, { Dispatch, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  User,
  editComment,
  ArtworkItem,
  ArtworkComment,
} from "../../Interface";
import api from "../../api/api";
import style from "./Comment.module.css";

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
    nickname: comment.nickname,
    parent_artwork_id: comment.parent_artwork_id,
    createdDate: comment.createdDate,
    modifiedDate: comment.modifiedDate,
    profile_picture_url: comment.profile_picture_url,
    email: comment.email,
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
        profile_picture_url,
        email,
      } = updateData;

      setEditComment({
        comment_id,
        content,
        nickname,
        parent_artwork_id,
        createdDate,
        modifiedDate,
        profile_picture_url,
        email,
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
                profile_picture_url,
                email,
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
      {userObject?.nickname === comment?.nickname ? (
        <div>
          {onEdit ? (
            <div>
              <form onSubmit={onSubmit} className={style.commentEditForm}>
                <input
                  name="content"
                  type="text"
                  placeholder="댓글을 작성하세요."
                  onChange={onChange}
                  value={editComment.content || ""}
                />
                <input type="submit" value="수정" />
                <button onClick={onDeleteClick}>삭제</button>
              </form>
            </div>
          ) : (
            <div className={style.commentDetail}>
              <div className={style.commentContent}>
                {editComment.profile_picture_url ? (
                  <img
                    className={style.commentProfileImg}
                    src={editComment.profile_picture_url}
                    alt="profile"
                  />
                ) : (
                  <img
                    className={style.commentProfileImg}
                    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
                    alt="profile"
                  />
                )}
                <NavLink
                  to={`/profile/${editComment.email}`}
                  className={style.userName}
                >
                  <b>{editComment.nickname}</b>
                </NavLink>
                <div>{editComment.content}</div>
              </div>
              <div className={style.commentButton}>
                <button onClick={onEditClick}>수정</button>
                <button onClick={onDeleteClick}>삭제</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={style.commentDetail}>
          <div className={style.commentContent}>
            {editComment.profile_picture_url ? (
              <img
                className={style.commentProfileImg}
                src={editComment.profile_picture_url}
                alt="profile"
              />
            ) : (
              <img
                className={style.commentProfileImg}
                src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
                alt="profile"
              />
            )}
            <NavLink
              to={`/profile/${editComment.email}`}
              className={style.userName}
            >
              <b>{editComment.nickname}</b>
            </NavLink>
            <div>{editComment.content}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentDetailOrUpdate;
