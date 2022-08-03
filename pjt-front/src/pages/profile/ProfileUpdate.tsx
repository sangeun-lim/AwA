import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import api from "../../api/api";
import { UpdateProfileObject } from "../../api/apiInterface";
import { storageService } from "../../fbase";
import { Profile } from "../../Interface";

interface Props {
  profileObject: Profile;
  userEmail: string;
  setProfileObject: Dispatch<React.SetStateAction<Profile>>;
  setEditProfile: Dispatch<React.SetStateAction<boolean>>;
}

const FAVORITE = ["회화", "조소", "건축", "공예", "서예", "디지털", "기타"];

function ProfileUpdate({
  profileObject,
  userEmail,
  setProfileObject,
  setEditProfile,
}: Props): JSX.Element {
  const [editForm, setEditForm] = useState<UpdateProfileObject>({
    description: profileObject.description,
    nickname: profileObject.nickname,
    profile_picture_url: profileObject.picture_url,
    favorite_field: profileObject.favorite_field,
  });
  const [showImage, setShowImage] = useState<string>(profileObject.picture_url);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isPossible, setIsPossible] = useState<string | boolean>(false);

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
    }

    setEditForm((prev) => {
      return {
        ...prev,
        profile_picture_url: imageUrl,
      };
    });

    const response = await api.profile.updateProfile(userEmail, editForm);

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
    }

    setEditProfile(false);
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
  }, [editForm.nickname, isPossible]);

  return (
    <div>
      {showImage ? (
        <img src={showImage} alt="프로필이미지" />
      ) : (
        <img
          src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
          alt="프로필이미지"
        />
      )}
      <input type="file" accept="image/*" onChange={onImgChange} />
      <button onClick={onBaseClick}>기본 이미지로</button>
      <input
        type="text"
        name="nickname"
        value={editForm.nickname}
        onChange={onChange}
        required
      />
      <button onClick={checkNickname}>중복확인</button>
      {isPossible && <p>사용 가능한 닉네임입니다.</p>}
      <textarea
        name="description"
        value={editForm.description || ""}
        onChange={onChange}
        cols={30}
        rows={5}
      ></textarea>
      <div>
        {FAVORITE.map((item) => {
          return (
            <label key={item}>
              <input
                type="checkbox"
                name="favorite_field"
                value={item}
                onChange={onFavoriteChange}
                checked={
                  !!editForm.favorite_field.filter(
                    (favorite) => favorite === item
                  ).length
                }
              />
              {item}
            </label>
          );
        })}
      </div>
      <button onClick={onSubmit}>제출</button>
    </div>
  );
}

export default ProfileUpdate;
