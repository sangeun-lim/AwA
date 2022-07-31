// 유저 Object
export interface User {
  user_id: number;
  email: string;
  nickname: string;
  gender?: boolean | null;
  birth?: string | null;
}

// 프로필 Object
export interface Profile {
  id: string;
  nickname: string;
  description: string;
  followers: Array<string>;
  followings: Array<string>;
  likeGenres: Array<string>;
  profileImage: string;
}

// 댓글 Object
export interface Comment {
  id: number;
  uid: number;
  nickname: string;
  content: string;
  createdAt: Date;
}

interface Media {
  type: string;
  url: string;
}

// 판매글 목록에 보이는 거
export interface ArtworkItem {
  artwork_id: number;
  mediaList: Media[];
  genre: string[];
  ingredient: string;
  like_count: number;
  price: number;
  sell_user_email: string;
  sell_user_nickname: string;
  profile_picture: string;
  title: string;
  view_count: number;
  createdDate: string;
  description: string;
}

// 공지사항 Object
export interface NoticeItem {
  notice_id: number;
  title: string;
  content: string;
  createdDate: string;
  modifiedDate: string;
}

// 채팅방 Object
export interface ChattingRoom {
  id: string;
  user1: string;
  user2: string;
}

// 채팅메시지 Object
export interface MessageObject {
  roomName: string;
  email: string;
  message: string;
  createdAt: number;
}

// 신고 Object
export interface ReportObject {
  id: number;
  uid: number; // 신고자 id
  itemId: number;
  category: string;
  content: string;
}
