const HOST = "http://i7c101.p.ssafy.io:8081/api/";

const AUTH = "auth/";
const NOTICE = "notice/";
const ARTWORK = "artwork/";
const PROFILE = "profile/";
const RANK = "rank/";
const FOLLOW = "follow/";
const SEARCH = "search/";
const LIKE = "like/";
const COMMENT = "comment/";

const rf = {
  auth: {
    login: () => HOST + AUTH + "sign-in",
    logout: () => HOST + AUTH + "logout",
    signup: () => HOST + AUTH + "sign-up",
    userinfo: () => HOST + AUTH + "userinfo",
  },

  notice: {
    create: () => HOST + NOTICE,
    readOrUpdateOrDelete: (noticeId: string) => HOST + NOTICE + `${noticeId}`,
    readAll: (pageNum: number) => HOST + NOTICE + `page/${pageNum}`,
  },

  artwork: {
    readAllOrPost: () => HOST + ARTWORK,
    readDetailOrUpdateOrDelete: (artwork_id: string) =>
      HOST + ARTWORK + `${artwork_id}`,
  },

  profile: {
    getOrUpdateProfile: (userEmail: string) => HOST + PROFILE + `${userEmail}`,
  },

  follow: {
    checkFollow: (fromUserEmail: string, toUserEmail: string) =>
      HOST + FOLLOW + `have/${fromUserEmail}/${toUserEmail}`,
    followUser: (fromUserEmail: string, toUserEmail: string) =>
      HOST + FOLLOW + `${fromUserEmail}/${toUserEmail}`,
  },

  rank: {
    getLikeRank: () => HOST + RANK + "like",
    getFollowRank: () => HOST + RANK + "follow",
  },

  search: {
    searchTitle: (word: string) => HOST + SEARCH + `title/${word}`,
    searchWriter: (word: string) => HOST + SEARCH + `writer/${word}`,
  },

  like: {
    likeCheck: (nickname: string, artwork_id: string) =>
      HOST + LIKE + `have/${nickname}/${artwork_id}`,
    likeArtwork: (nickname: string, artwork_id: string) =>
      HOST + LIKE + `${nickname}/${artwork_id}`,
  },

  chatting: {
    getUserList: () => HOST + PROFILE + "list",
  },

  comment: {
    createComment: () => HOST + "comment",
    editOrDeleteComment: (comment_id: string) =>
      HOST + COMMENT + `${comment_id}`,
  },
};

export default rf;
