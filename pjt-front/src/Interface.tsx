// 유저 Object
export interface User {
  id: number;
  email?: string;
  nickname: string;
  isSeller?: boolean;
  isManager?: boolean;
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

// 판매글 Object
export interface Item {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  nickname: string;
  genres: Array<string>;
  material: string;
  itemImage?: string;
  detail: string;
  createdAt: Date;
  like: Array<User>;
  viewCount: number;
  comments: Array<Comment>;
}

// 공지사항 Object
export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
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
export interface Report {
  id: number;
  uid: number; // 신고자 id
  itemId: number;
  category: string;
  content: string;
}
