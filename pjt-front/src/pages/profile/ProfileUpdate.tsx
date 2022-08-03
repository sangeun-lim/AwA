import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import api from "../../api/api";
import { UpdateProfileObject } from "../../api/apiInterface";
import { storageService } from "../../fbase";
import { Profile } from "../../Interface";

interface Props {
  profileObject: Profile;
  userEmail: string;
  setProfileObject: Dispatch<React.SetStateAction<Profile>>;
}

function ProfileUpdate({
  profileObject,
  userEmail,
  setProfileObject,
}: Props): JSX.Element {
  const [editForm, setEditForm] = useState<UpdateProfileObject>({
    description: profileObject.description,
    nickname: profileObject.nickname,
    profile_picture_url: profileObject.picture_url,
    favorite_fields: profileObject.favorite_field,
  });
  const [showImage, setShowImage] = useState<string>(profileObject.picture_url);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isPossible, setIsPossible] = useState<boolean>(false);

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
      setIsPossible(true);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  };

  const onImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files?.length) {
      setNewImage(files[0]);
      const currentImageUrl = URL.createObjectURL(files[0]);
      setShowImage(currentImageUrl);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
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
        <textarea
          name="description"
          value={editForm.description}
          onChange={onChange}
          required
        />
        <div>
          <label>
            <input type="checkbox" name="favorite_fields" value="회화" />
            회화
          </label>
          <label>
            <input type="checkbox" name="favorite_fields" value="조소" />
            조소
          </label>
          <label>
            <input type="checkbox" name="favorite_fields" value="건축" />
            건축
          </label>
          <label>
            <input type="checkbox" name="favorite_fields" value="공예" />
            공예
          </label>
          <label>
            <input type="checkbox" name="favorite_fields" value="서예" />
            서예
          </label>
          <label>
            <input type="checkbox" name="favorite_fields" value="디지털" />
            디지털
          </label>
          <label>
            <input type="checkbox" name="favorite_fields" value="기타" />
            기타
          </label>
        </div>
        <input disabled={!isPossible} type="submit" value="제출" />
      </form>
    </div>
  );
}

export default ProfileUpdate;
