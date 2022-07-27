import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../Interface";
import Followers from "./Followers";

interface Props {
  isLoggedIn: boolean;
}

const defaultProfile: Profile = {
  id: "",
  nickname: "",
  description: "",
  profileImage: "",
  followers: [],
  followings: [],
  likeGenres: [],
  // 내가쓴거 : [],
  // 찜목록: [],
  // 구매작품: [],
};

const ProfilePage = ({ isLoggedIn }: Props): JSX.Element => {
  // nickname 가져오기
  // const params = useParams();
  const [profileObject, setProfileObject] = useState<Profile>(defaultProfile);
  const [viewList, setViewList] = useState<boolean>(false);

  // const [values] = useState<작품obj[]>;

  const navigate = useNavigate();

  const viewFollow = () => {
    setViewList(!viewList);
  };

  const moveFavorite = () => {
    navigate("/profile/favorite");
  };

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

  return (
    <div>
      {viewList && <Followers />}
      <img src={profileObject.profileImage} alt="프로필사진" />
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
        <button> 게시물버튼 누르면 내가 쓴 게시물들이 보여야함 </button>
        <button> 찜목록버튼 누르면 보일 컴포넌트들 </button>
        <button> 구매작품버튼 누르면 보일 컴포넌트들 </button>
      </div>
    </div>
  );
};

export default ProfilePage;
