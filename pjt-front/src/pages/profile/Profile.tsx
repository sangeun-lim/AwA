import React, { useEffect, useState, Dispatch } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Profile } from "../../Interface";
import Followers from "./Followers";
import api from "../../api/api";

interface Props {
  isLoggedIn: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

interface profile {
  id?: string;
  description: string;
  favorite_field: Array<string>;
  nickname: string;
  owner_user: number;
  picture_url: string;
  // 내 팔로워들
  followers: Array<string>;
  // 내가 팔로우 하는 사람들
  followings: Array<string>;
  // 내가 올린 작품
  myItems: Array<string>;
  // 내가 찜한 작품
  likeItems: Array<string>;
  // 내가 구매한 작품
  purchaseItems: Array<string>;
}

const defaultProfile: profile = {
  description: "",
  favorite_field: [],
  nickname: "",
  owner_user: 0,
  picture_url: "",
  // 내 팔로워들
  followers: [],
  // 내가 팔로우 하는 사람들
  followings: [],
  // 내가 올린 작품
  myItems: [],
  // 내가 찜한 작품
  likeItems: [],
  // 내가 구매한 작품
  purchaseItems: [],
};

const ProfilePage = ({ isLoggedIn, setIsLoading }: Props): JSX.Element => {
  const params = useParams();
  const userEmail = params.nickname;

  const [profileObject, setProfileObject] = useState<profile>(defaultProfile);
  const [viewList, setViewList] = useState<boolean>(false);

  // const [values] = useState<작품obj[]>;

  const navigate = useNavigate();

  const viewFollow = () => {
    setViewList(!viewList);
  };

  const moveFavorite = () => {
    navigate("/profile/favorite");
  };

  // 전해줄 매개변수가 필요할거 같은데???
  const moveChat = () => {
    navigate("/chatting");
  };

  useEffect(() => {
    const getProfile = async () => {
      // 유저 프로필 정보 받아오기
      setProfileObject(defaultProfile);
    };
    getProfile();
  }, []);

  // 프로필 사진 등록 / 프로필 정보 변경

  return (
    <div>
      {viewList && <Followers />}
      <img src={profileObject.picture_url} alt="프로필사진" />
      <h2>{profileObject.nickname}</h2>
      {/* 프로필편집 컴포넌트이동 버튼 넣기 (폼태그 형식) */}
      <h3 onClick={viewFollow}>
        팔로워 수 : {profileObject.followers.length}{" "}
      </h3>
      <h3>팔로잉 수 : {profileObject.followings.length}</h3>
      <button onClick={moveFavorite}>선호분야선택버튼</button>
      <button onClick={moveChat}>채팅하기</button>

      {/* 큰 컴포넌트안에 작은 컴포넌트들 넣기? */}
      <div>
        <button>
          게시물버튼 누르면 내가 쓴 게시물들이 보여야함{profileObject.myItems}
        </button>
        <button>
          찜목록버튼 누르면 보일 컴포넌트들 {profileObject.likeItems}
        </button>
        <button>
          구매작품버튼 누르면 보일 컴포넌트들 {profileObject.purchaseItems}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
