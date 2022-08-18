import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { divide } from "lodash";
import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api/api";
import { UpdateProfileObject } from "../../api/apiInterface";
import { storageService } from "../../fbase";
import { Profile } from "../../Interface";
import { userObjectActions } from "../../store";
import style from "./ProfileUpdate.module.css";

interface Props {
  open: boolean;
  close: () => void;
  profileObject: Profile;
  userEmail: string;
  setProfileObject: Dispatch<React.SetStateAction<Profile>>;
  setEditProfile: Dispatch<React.SetStateAction<boolean>>;
}

const FAVORITE = ["회화", "조소", "건축", "공예", "서예", "디지털", "기타"];

function ProfileUpdate({
  open,
  close,
  profileObject,
  userEmail,
  setProfileObject,
  setEditProfile,
}: Props): JSX.Element {
  const dispatch = useDispatch();

  const [editForm, setEditForm] = useState<UpdateProfileObject>({
    description: profileObject.description,
    nickname: profileObject.nickname,
    profile_picture_url: profileObject.picture_url,
    favorite_field: profileObject.favorite_field,
  });
  const [showImage, setShowImage] = useState<string>(profileObject.picture_url);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isPossible, setIsPossible] = useState<string | boolean>(false);
  const [nicknameComment, setNicknameComment] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setEditForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onBaseClick = () => {
    setNewImage(null);
    setShowImage("");
  };

  const checkNickname = async () => {
    const response = await api.auth.checkNickname(editForm.nickname);

    if (response.status === 200 && response.data === 1) {
      setIsPossible(editForm.nickname);
    }

    setNicknameComment(true);
  };

  const onFavoriteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const here = !!editForm.favorite_field.filter((item) => item === value)
      .length;

    if (here) {
      setEditForm((prev) => {
        return {
          ...prev,
          favorite_field: prev.favorite_field.filter((item) => item !== value),
        };
      });
    } else {
      setEditForm((prev) => {
        return {
          ...prev,
          favorite_field: prev.favorite_field.concat(value),
        };
      });
    }
  };

  const onSubmit = async () => {
    let imageUrl: string = "";
    if (newImage) {
      const imgRef = ref(storageService, `${userEmail}/${uuidv4()}`);
      const response = await uploadBytes(imgRef, newImage);
      imageUrl = await getDownloadURL(response.ref);
    } else if (showImage === editForm.profile_picture_url) {
      imageUrl = editForm.profile_picture_url;
    }

    const response = await api.profile.updateProfile(
      userEmail,
      editForm,
      imageUrl
    );

    if (response.status === 200) {
      const { description, favorite_field, nickname, picture_url } =
        response.data;

      setProfileObject((prev) => {
        return {
          ...prev,
          description: description,
          favorite_field: favorite_field,
          nickname: nickname,
          picture_url: picture_url,
        };
      });

      dispatch(userObjectActions.nickname(nickname));
    }

    setEditProfile(false);
    close();
  };

  const onImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files?.length) {
      setNewImage(files[0]);
      const currentImageUrl = URL.createObjectURL(files[0]);
      setShowImage(currentImageUrl);
    }
  };

  useEffect(() => {
    if (editForm.nickname !== isPossible) {
      setIsPossible(false);
    }
    setNicknameComment(false);
  }, [editForm.nickname, isPossible]);

  return (
    <div>
      {open ? (
        <div className={style.updateModal}>
          <div className={style.updateModalBody}>
            <div className={style.updateCloseBtn}>
              <button onClick={close} className={style.updateBtn}>
                X
              </button>
            </div>
            <h3>프로필 정보 변경</h3>
            <div className={style.profileImage}>
              {showImage ? (
                <img
                  src={showImage}
                  alt="프로필이미지"
                  className={style.MyProfileImg}
                />
              ) : (
                <img
                  src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
                  alt="프로필이미지"
                  className={style.MyProfileImg}
                />
              )}
            </div>
            <div className={style.profileImageChange}>
              <label htmlFor="imgTag" className={style.imageInput}>
                <input
                  id="imgTag"
                  type="file"
                  accept="image/*"
                  onChange={onImgChange}
                />
                <div>프로필 사진 변경</div>
              </label>
              <button onClick={onBaseClick}>기본 이미지</button>
            </div>
            <div className={style.profileInfo}>
              <div className={style.nicknameChangeBox}>
                <div className={style.smallNickname}>닉네임</div>
                <div className={style.nicknameChange}>
                  <div>닉네임</div>
                  <input
                    type="text"
                    name="nickname"
                    value={editForm.nickname}
                    onChange={onChange}
                    required
                  />
                  <button onClick={checkNickname}>중복 확인</button>
                </div>
                {nicknameComment && (
                  <div>
                    {profileObject.nickname === editForm.nickname ? (
                      <div className={style.nicknameComment}>
                        이전에 사용하던 닉네임입니다.
                      </div>
                    ) : isPossible ? (
                      <div className={style.nicknameComment}>
                        사용 가능한 닉네임입니다.
                      </div>
                    ) : (
                      <div className={style.nicknameComment}>
                        중복된 닉네임입니다.
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={style.descriptionChange}>
                <div className={style.profileLabel}>소개글</div>
                <textarea
                  name="description"
                  value={editForm.description || ""}
                  onChange={onChange}
                  cols={30}
                  rows={5}
                  className={style.description}
                ></textarea>
              </div>
              <div className={style.genreChange}>
                <div className={style.profileLabel}>선호 장르 선택</div>
                <div className={style.options}>
                  {FAVORITE.map((item) => {
                    return (
                      <div key={item}>
                        <input
                          type="checkbox"
                          name="favorite_field"
                          id={`profile${item}`}
                          value={item}
                          onChange={onFavoriteChange}
                          checked={
                            !!editForm.favorite_field.filter(
                              (favorite) => favorite === item
                            ).length
                          }
                        />
                        <label htmlFor={`profile${item}`}>{item}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <button onClick={onSubmit} className={style.submit}>
              수정하기
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProfileUpdate;
