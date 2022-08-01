const HOST = "http://i7c101.p.ssafy.io:8080/";

const AUTH = "auth/";
const NOTICE = "notice/";
const ARTWORK = "artwork/";
const PROFILE = "profile/";

const api = {
  auth: {
    login: () => HOST + AUTH + "sign-in",
    logout: () => HOST + AUTH + "logout",
    signup: () => HOST + AUTH + "sign-up",
    userinfo: () => HOST + AUTH + "userinfo",
  },

  notice: {
    create: () => HOST + NOTICE,
    readOrUpdateOrDelete: (noticeId: string) => HOST + NOTICE + `${noticeId}`,
    readAll: () => HOST + NOTICE + "list",
  },

  artwork: {
    readAllOrPost: () => HOST + ARTWORK,
    readDetailOrUpdateOrDelete: (artwork_id: string) =>
      HOST + ARTWORK + `${artwork_id}`,
  },

  profile: {
    getProfile: (userEmail: string) => HOST + PROFILE + `${userEmail}`,
  },
};

export default api;
