// 유저 Object
export interface User {
  user_id: number;
  email: string;
  nickname: string;
  gender?: boolean | null;
  birth?: string | null;
}

interface Owner {
  _manager: boolean;
  _seller: boolean;
  authorities: { authority: string }[];
  birth: string;
  createdDate: string;
  email: string;
  genter: boolean;
  modifiedDate: string;
  nickname: string;
  refreshToken: string;
  roles: string[];
  sell_list: string[];
  user_id: number;
}

interface follow {
  createdDate: string;
  description: string;
  favorite_field: string[];
  modifiedDate: string;
  nickname: string;
  owner_user: Owner;
  profile_id: number;
  profile_picture_url: string;
}

// 프로필 Object
export interface Profile {
  // artwork_list: string[];
  // liked_artwork_list: string[];
  follower_list?: follow[];
  following_list?: follow[];
  description: string;
  favorite_field: string[];
  nickname: string;
  owner_user: number;
  picture_url: string;
}

// 댓글 Object
export interface Comment {
  comment_id: number;
  content: string;
  createdDate: string;
  modifiedDate: string;
  profile_id: number;
  profile_picture_url: string;
}

interface Media {
  type: string;
  url: string;
}

export interface ArtworkComment {
  comment_id: number;
  content: string;
  createdDate: Date;
  modifiedDate: Date;
  nickname: string;
  parent_artwork_id: number;
}

// 판매글 목록에 보이는 거
export interface ArtworkItem {
  artwork_id: number;
  comments: ArtworkComment[];
  attachmentRequestDtoList: Media[];
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

export interface NoticeEditing {
  title: string;
  content: string;
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

export interface editItem {
  title: string;
  price: number;
  ingredient: string;
  description: string;
}

export interface editComment {
  comment_id: number;
  content: string;
  nickname: string;
  parent_artwork_id: number;
  createdDate: Date;
  modifiedDate: Date;
}
