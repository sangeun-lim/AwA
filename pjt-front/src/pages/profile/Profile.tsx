import { useEffect, useState } from "react";
import { Profile } from "../../Interface";

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
};

const ProfilePage = ({ isLoggedIn }: Props): JSX.Element => {
  const [id, setId] = useState();
  const [nickname, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  const [likeGenres, setLikeGenres] = useState();

  const getProfile = async () => {
    // 사용자 정보 획득 하기
    let accessToken = localStorage.getItem("accessToken");

    // setId(data.id);
    // setNickName(data.properties.nickname);?
    // setProfileImage(data.properties.profileImage);
    // setFollowers();
    // setFollowings();
    // setLikeGenres();
  };

  // 팔로워 버튼을 눌렀을때 컴포넌트 연결

  // 팔로잉 버튼를 눌렀을때 컴포넌트 연결

  // 선호분야 버튼을 눌렀을때 컴포넌트 연결

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {/* 내 프로필일때 */}
      <img src={profileImage}></img>
      <h2>{nickname}</h2>
      {/* 프로필편집 컴포넌트 버튼형식*/}
      <h3>게시물 수</h3>
      <h3>팔로워 수</h3>
      <button>팔로우목록버튼</button>
      <h3>팔로잉 수</h3>
      <button>팔로잉목록버튼</button>
      <button>선호분야선택버튼</button>

      <h3>게시물버튼 누르면 보일 컴포넌트들</h3>
      <h3>찜목록버튼 누르면 보일 컴포넌트들</h3>
      <h3>구매작품버튼 누르면 보일 컴포넌트들</h3>

      {/* 다른사람 프로필일때 */}
      <img src={profileImage}></img>
      <h2>{nickname}</h2>

      {/* 게시물수를 나타내야되나? */}
      <h3>게시물 수</h3>
      <h3>팔로워 수</h3>
      <button>팔로우목록버튼</button>
      <h3>팔로잉 수</h3>
      <button>팔로잉목록버튼</button>

      <button>팔로우하기 버튼</button>
      <button>채팅 연결 컴포넌트</button>
      <button>선호분야 확인하는 버튼</button>

      <h3>게시물버튼 누르면 보일 컴포넌트들</h3>
      <h3>찜목록버튼 누르면 보일 컴포넌트들</h3>
      <h3>구매작품버튼 누르면 보일 컴포넌트들</h3>
    </div>
  );
};

export default ProfilePage;
