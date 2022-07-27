const HOST = "http://i7c101.p.ssafy.io:8080/";

const AUTH = "auth/";
const PROFILE = "profile/";

export default {
  auth: {
    login: () => HOST + AUTH + "sign-in",
    logout: () => HOST + AUTH + "logout",
    signup: () => HOST + AUTH + "sign-up",
  },
};
