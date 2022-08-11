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
import Followers from "./Followers";
import Followings from "./Followings";
import Follow from "./Follow";
import UserArtworkList from "./UserArtworkList";
import UserLikedArtworkList from "./UserLikedArtworkList";
import style from "./Profile.module.css";
import { dividerClasses, stepButtonClasses, withStyles } from "@mui/material";

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
  const [showFollow, setShowFollow] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean[]>([false, false]);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  function openFollow() {
    setShowFollow(!showFollow);
  }

  function closeFollow() {
    setShowFollow(!showFollow);
  }

  function openUpdate() {
    setShowUpdate(true);
  }

  function closeUpdate() {
    setShowUpdate(!showUpdate);
  }

  const onEditClick = () => {
    setEditProfile(true);
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
    <div className={style.profile}>
      <div className={style.profileTop}>
        {userObject && userObject.email === userEmail && (
          <button
            onClick={() => {
              onEditClick();
              openUpdate();
            }}
            className={style.btn}
          >
            수정
          </button>
        )}
        {editProfile && userObject && userObject.email === userEmail && (
          <ProfileUpdate
            open={showUpdate}
            close={closeUpdate}
            profileObject={profileObject}
            userEmail={userEmail}
            setProfileObject={setProfileObject}
            setEditProfile={setEditProfile}
          />
        )}
      </div>
      <div className={style.profileMiddle}>
        <div className={style.profileMiddleLeft}>
          <div className={style.profileImgBox}>
            {profileObject.picture_url ? (
              <img src={profileObject.picture_url} alt="프로필사진" />
            ) : (
              <img
                src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
                alt="프로필사진"
              />
            )}
          </div>
          <div className={style.chattingBox}>
            {userObject &&
              userObject.email !== userEmail &&
              (iFollow ? (
                <button className={style.unfollowBtn} onClick={onUnfollow}>
                  언팔로우
                </button>
              ) : (
                <button className={style.followBtn} onClick={onFollow}>
                  팔로우
                </button>
              ))}
            {userObject && userObject.email !== userEmail && (
              <button className={style.chattingBtn} onClick={goChat}>
                채팅하기
              </button>
            )}
          </div>
        </div>
        <div className={style.profileMiddleRight}>
          <div className={style.profileNickname}>{profileObject.nickname}</div>
          <div className={style.followBox}>
            <div className={style.follow}>
              <button
                onClick={() => {
                  openFollow();
                  setChecked([true, false]);
                }}
              >
                팔로워
              </button>
              <div className={style.followNum}>
                {profileObject.follower_list?.length}
              </div>
            </div>
            <div className={style.follow}>
              <button
                onClick={() => {
                  openFollow();
                  setChecked([false, true]);
                }}
              >
                팔로잉
              </button>
              <div className={style.followNum}>
                {profileObject.following_list?.length}
              </div>
            </div>
          </div>
          <Follow
            open={showFollow}
            close={closeFollow}
            checked={checked}
            follower_list={profileObject.follower_list}
            following_list={profileObject.following_list}
          />
          <div className={style.profileDescription}>
            {profileObject.description}
          </div>
          <div className={style.favoriteField}>
            {profileObject.favorite_field.length > 0 ? (
              <div>
                <b>선호하는 장르 : </b>
                {profileObject.favorite_field.join(" | ")}
              </div>
            ) : (
              <div>선호하는 장르를 선택해주세요.</div>
            )}
          </div>
        </div>
      </div>
      <div className={style.profileBottom}>
        <input type="radio" name="tabmenu" id="myArtwork" defaultChecked />
        <input type="radio" name="tabmenu" id="likeArtwork" />
        <div className={style.tabmenu}>
          <label htmlFor="myArtwork" className={style.myArtwork}>
            <div>내 게시글</div>
          </label>
          <label htmlFor="likeArtwork" className={style.likeArtwork}>
            <div>좋아요 한 게시글</div>
          </label>
        </div>
        <div className={style.tabInner}>
          <div className={style.tabs}>
            <div className={style.tab}>
              <UserArtworkList
                artwork_list={profileObject.artwork_list}
              ></UserArtworkList>
            </div>
            <div className={style.tab}>
              <UserLikedArtworkList
                liked_artwork_list={profileObject.liked_artwork_list}
              ></UserLikedArtworkList>
            </div>
          </div>
        </div>
      </div>
      <div className={style.profileBottomSmall}>
        <div>
          <div className={style.bottomTitle}>내 게시글</div>
          <UserArtworkList
            artwork_list={profileObject.artwork_list}
          ></UserArtworkList>
        </div>
        <div>
          <div className={style.bottomTitle}>좋아요 한 게시글</div>
          <UserLikedArtworkList
            liked_artwork_list={profileObject.liked_artwork_list}
          ></UserLikedArtworkList>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
