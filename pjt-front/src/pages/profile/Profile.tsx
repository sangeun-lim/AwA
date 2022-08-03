import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store";
import { Profile } from "../../Interface";
import { profileDefaultData } from "../../defaultData";
import ProfileUpdate from "./ProfileUpdate";

const ProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const userEmail = params.email || "";

  const [profileObject, setProfileObject] =
    useState<Profile>(profileDefaultData);
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const onEditClick = () => {
    setEditProfile(!editProfile);
  };

  useEffect(() => {
    const getProfile = async () => {
      dispatch(loadingActions.toggle());

      try {
        const response = await api.profile.getProfile(userEmail);

        dispatch(loadingActions.toggle());

        if (response.status === 200) {
          setProfileObject(response.data);
        } else {
          console.log(response);
        }
      } catch (err) {
        console.error(err);
        dispatch(loadingActions.toggle());
      }
    };

    getProfile();
  }, [dispatch, userEmail]);

  return (
    <div>
      <button onClick={onEditClick}>수정</button>
      {editProfile && (
        <ProfileUpdate profileObject={profileObject} userEmail={userEmail} setProfileObject={setProfileObject} />
      )}
      {profileObject.picture_url ? (
        <img src={profileObject.picture_url} alt="프로필사진" />
      ) : (
        <img
          src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
          alt="프로필사진"
        />
      )}
      <h2>{profileObject.nickname}</h2>
      <h3>팔로워 수 : </h3>
      <h3>팔로잉 수 : </h3>
      <p>{profileObject.description}</p>
      <div></div>
    </div>
  );
};

export default ProfilePage;
