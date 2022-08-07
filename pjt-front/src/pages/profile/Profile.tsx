import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store";
import { Profile, User } from "../../Interface";
import { profileDefaultData } from "../../defaultData";
import ProfileUpdate from "./ProfileUpdate";
import Followers from "./Followers";
import Followings from "./Followings";
import UserArtworkList from "./UserArtworkList";

const ProfilePage = (): JSX.Element => {
  const dispatch = useDispatch();
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
      {editProfile && (
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
      {profileObject.follower_list?.length && (
        <Followers follower_list={profileObject.follower_list} />
      )}
      <h3>팔로잉 수 : {profileObject.following_list?.length}</h3>
      {profileObject.following_list?.length && (
        <Followings following_list={profileObject.following_list} />
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
      <div>
        <UserArtworkList
          artwork_list={profileObject.artwork_list}
        ></UserArtworkList>
      </div>
    </div>
  );
};

export default ProfilePage;
