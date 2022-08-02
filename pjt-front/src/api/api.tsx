const HOST = "http://i7c101.p.ssafy.io:8080/";

const AUTH = "auth/";
const NOTICE = "notice/";
const ARTWORK = "artwork/";
const PROFILE = "profile/";

const api = {
  auth: {
    login: async (formData: LoginData) => {
      const response = await axios({
        url: rf.auth.login(),
        method: "post",
        data: {
          email: formData.id,
          password: formData.pw,
        },
      });

      return response;
    },

    signup: async (formData: SignUpData) => {
      const response = await axios({
        url: rf.auth.signup(),
        method: "post",
        data: {
          birth: formData.birth,
          email: formData.id,
          gender: formData.gender,
          nickname: formData.nickname,
          password: formData.pw1,
        },
      });

      return response;
    },

    checkEmail: async (email: string) => {
      const response = await axios({
        url: rf.auth.signup() + `/email/${email}`,
        method: "get",
      });

      return response;
    },

    checkNickname: async (nickname: string) => {
      const response = await axios({
        url: rf.auth.signup() + `/nickname/${nickname}`,
        method: "get",
      });

      return response;
    },
  },

  notice: {
    readAll: async () => {
      const response = await axios({
        url: rf.notice.readAll(),
        method: "get",
      });

      return response;
    },

    post: async (formData: NewNoticeData) => {
      const response = await axios({
        url: rf.notice.create(),
        method: "post",
        headers: {
          token: localStorage.getItem("token") || "",
        },
        data: {
          title: formData.title,
          content: formData.content,
        },
      });
      return response;
    },

    readOrUpdateOrDelete: async (
      id: string,
      formData: NewNoticeData | null,
      method: string
    ) => {
      const response = await axios({
        url: rf.notice.readOrUpdateOrDelete(id),
        method: method,
        headers: {
          token: localStorage.getItem("token") || "",
        },
        data: formData,
      });

      return response;
    },
  },

  artwork: {
    readAll: async () => {
      const response = await axios({
        url: rf.artwork.readAllOrPost(),
        method: "get",
      });

      return response;
    },

    post: async (
      formData: NewItemData,
      genresList: string[],
      imageUrlList: string[]
    ) => {
      const response = await axios({
        url: rf.artwork.readAllOrPost(),
        method: "post",
        headers: { token: localStorage.getItem("token") || "" },
        data: {
          ...formData,
          genre: genresList,
          attachmentList: imageUrlList.map((item) => {
            return { type: "image", url: item };
          }),
        },
      });

      return response;
    },

    readOrUpdateOrDelete: async (
      id: string,
      formData: UpdateItemData | null,
      method: string
    ) => {
      const response = await axios({
        url: rf.artwork.readDetailOrUpdateOrDelete(id),
        method: method,
        headers: { token: localStorage.getItem("token") || "" },
        data: formData,
      });

      return response;
    },
  },

  profile: {
    getProfile: (userEmail: string) => HOST + PROFILE + `${userEmail}`,
  },
};

export default api;
