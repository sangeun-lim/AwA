import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  chatPartnerActions,
  firstChatActions,
  loadingActions,
} from "../../store";
import { Profile, User } from "../../Interface";
import { profileDefaultData } from "../../defaultData";
import ProfileUpdate from "./ProfileUpdate";

const ProfilePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userEmail = params.email || "";
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );
  const [iFollow, setIFollow] = useState<boolean>(false);

  const [profileObject, setProfileObject] =
    useState<Profile>(profileDefaultData);
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const onEditClick = () => {
    setEditProfile(!editProfile);
  };

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

  const onFollow = async () => {
    if (userObject) {
      await api.follow.followOrUnfollow(userObject.email, userEmail, "post");

      setIFollow(!iFollow);
      getProfile();
    }
  };

  const onUnfollow = async () => {
    if (userObject) {
      await api.follow.followOrUnfollow(userObject.email, userEmail, "delete");

      setIFollow(!iFollow);
      getProfile();
    }
  };

  const goChat = () => {
    dispatch(chatPartnerActions.setPartner(userEmail));
    dispatch(firstChatActions.isFirst());
    navigate("/chatting");
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

    const checkF = async () => {
      if (userObject) {
        dispatch(loadingActions.toggle());
        try {
          const response = await api.follow.checkFollow(
            userObject.email,
            userEmail
          );
          dispatch(loadingActions.toggle());
          if (response.status === 200 && response.data === 1) {
            setIFollow(true);
          }
        } catch (err) {
          console.error(err);
          dispatch(loadingActions.toggle());
        }
      }
    };

    checkF();
  }, [dispatch, userEmail, userObject]);

  return (
    <div>
      {userObject && userObject.email === userEmail && (
        <button onClick={onEditClick}>수정</button>
      )}
      <br></br>
      {editProfile && userObject && userObject.email === userEmail && (
        <ProfileUpdate
          profileObject={profileObject}
          userEmail={userEmail}
          setProfileObject={setProfileObject}
          setEditProfile={setEditProfile}
        />
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
      <h3>팔로워 수 : {profileObject.follower_list?.length}</h3>
      <h3>팔로잉 수 : {profileObject.following_list?.length}</h3>
      {userObject && userObject.email !== userEmail && (
        <button onClick={goChat}>채팅하기</button>
      )}
      {userObject &&
        userObject.email !== userEmail &&
        (iFollow ? (
          <button onClick={onUnfollow}>언팔로우</button>
        ) : (
          <button onClick={onFollow}>팔로우</button>
        ))}
      <p>{profileObject.description}</p>
      <div>
        <p>{profileObject.favorite_field}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
