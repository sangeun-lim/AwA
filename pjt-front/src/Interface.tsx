// 유저 Object
export interface User {
  user_id: number;
  email: string;
  nickname: string;
  gender?: boolean | null;
  birth?: string | null;
  _manager: boolean;
}

interface Owner {
  _manager: boolean;
  _seller: boolean;
  authorities: { authority: string }[];
  birth: string;
  createdDate: string;
  email: string;
  gender: boolean;
  modifiedDate: string;
  nickname: string;
  refreshToken: string;
  roles: string[];
  sell_list: string[];
  user_id: number;
}

export interface Follow {
  createdDate: string;
  description: string;
  favorite_field: string[];
  modifiedDate: string;
  nickname: string;
  owner_user: Owner;
  profile_id: number;
  profile_picture_url: string;
}

export interface ArtworkList {
  artwork_id: number;
  title: string;
  picture_url: string;
  genre: string[];
  createdDate: string;
}

export interface LikeArtworkList {
  artwork_id: number;
  title: string;
  picture_url: string;
  genre: string[];
  createdDate: string;
}

// 프로필 Object
export interface Profile {
  artwork_list: ArtworkList[];
  liked_artwork_list: LikeArtworkList[];
  follower_list: Follow[];
  following_list: Follow[];
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
  comment_id: string;
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
export interface MyChatList {
  id?: string;
  partnerEmail?: string;
  nickname?: string;
  profile_picture_url?: string;
  createdDate?: number;
  recentlyDate?: string;
  recentlyMessage?: string;
}

// 채팅메시지 Object
export interface Message {
  sender: string;
  createdDate: number;
  message: string;
  receiver: string;
}

export interface NewMessage {
  sender: string;
  createdDate: number;
  message: string;
  receiver: string;
  roomName: string;
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
  comment_id: string;
  content: string;
  nickname: string;
  parent_artwork_id: number;
  createdDate: Date;
  modifiedDate: Date;
}
