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
  id: number;
  nickname: string;
  description: string;
  followers: Array<string>;
  followings: Array<string>;
  likeGenres: Array<string>;
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
  id: number;
  title: string;
  price: number;
  nickname: string;
  genres: Array<string>;
  material: string;
  detail: string;
  createdAt: Date;
  like: Array<User>;
  viewCount: number;
  comments: Array<Comment>;
}

// 공지사항 Object
export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

// 채팅방 Object
export interface ChattingRoom {
  id: number;
  uid: number;
  nickname: string;
  updatedAt: Date;
  image: string;
}

// 채팅메시지 Object
export interface Chatting {
  nickname: string;
  message: string;
  createdAt: Date;
  image: string;
}

// 신고 Object
export interface Report {
  id: number;
  uid: number; // 신고자 id
  itemId: number;
  category: string;
  content: string;
}
