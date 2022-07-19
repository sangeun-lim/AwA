// 유저 Object
export interface User {
  uid: number;
  email?: string;
  nickname: string;
  is_seller?: boolean;
  is_manager?: boolean;
}

// 프로필 Object
export interface Profile {
  pid: number;
  uid: number;
  nickname: string;
  description: string;
  followers: Array<string>;
  followings: Array<string>;
  like_genres: Array<string>;
}

// 댓글 Object
export interface Comment {
  cid: number;
  uid: number;
  nickname: string;
  content: string;
  created_at: string;
}

// 판매글 Object
export interface Item {
  id: number;
  title: string;
  price: number;
  nickname: string;
  genres: Array<string>;
  material: string;
  detail_info: string;
  created_at: Date;
  like: Array<User>;
  view_cnt: number;
}

// 공지사항 Object
export interface Notice {}

// 채팅 Object
export interface Chatting {}

// 신고 Object
export interface Report {}
