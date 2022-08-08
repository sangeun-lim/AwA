import axios from "axios";
import rf from "./rf";
import {
  LoginData,
  SignUpData,
  NewNoticeData,
  NewItemData,
  UpdateItemData,
  UpdateProfileObject,
  QueryType,
} from "./apiInterface";

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

    getUserObject: async (token: string) => {
      const response = await axios({
        url: rf.auth.userinfo(),
        method: "get",
        headers: {
          RefreshToken: token,
        },
      });

      return response;
    },
  },

  notice: {
    readAll: async (pageNum: number) => {
      const response = await axios({
        url: rf.notice.readAll(pageNum),
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
          "X-AUTH-TOKEN": localStorage.getItem("token") || "",
          RefreshToken: localStorage.getItem("refresh_token") || "",
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
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("token") || "",
          RefreshToken: localStorage.getItem("refresh_token") || "",
        },
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
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("token") || "",
          RefreshToken: localStorage.getItem("refresh_token") || "",
        },
        data: formData,
      });

      return response;
    },
  },

  profile: {
    getProfile: async (email: string) => {
      const response = await axios({
        url: rf.profile.getOrUpdateProfile(email),
        method: "get",
      });

      return response;
    },

    updateProfile: async (
      email: string,
      formData: UpdateProfileObject,
      imageUrl: string
    ) => {
      const response = await axios({
        url: rf.profile.getOrUpdateProfile(email),
        headers: {
          "x-auth-token": localStorage.getItem("token") || "",
          RefreshToken: localStorage.getItem("refresh_token") || "",
        },
        method: "put",
        data: { ...formData, profile_picture_url: imageUrl },
      });

      return response;
    },
  },

  follow: {
    checkFollow: async (fromUserEmail: string, toUserEmail: string) => {
      const response = await axios({
        url: rf.follow.checkFollow(fromUserEmail, toUserEmail),
        headers: {
          "x-auth-token": localStorage.getItem("token") || "",
          RefreshToken: localStorage.getItem("refresh_token") || "",
        },
        method: "get",
      });

      return response;
    },

    followOrUnfollow: async (
      fromUserEmail: string,
      toUserEmail: string,
      method: string
    ) => {
      const response = await axios({
        url: rf.follow.followUser(fromUserEmail, toUserEmail),
        headers: {
          "x-auth-token": localStorage.getItem("token") || "",
          RefreshToken: localStorage.getItem("refresh_token") || "",
        },
        method: method,
      });

      return response;
    },
  },

  search: {
    searchTitle: async (formData: QueryType) => {
      const response = await axios({
        url: rf.search.searchTitle(formData.word),
        method: "post",
        data: {
          genre: formData.genres,
          genre_count: formData.genres.length,
          max_price: formData.max_price,
          min_price: formData.min_price,
          status: formData.status,
        },
      });

      return response;
    },

    searchWriter: async (formData: QueryType) => {
      const response = await axios({
        url: rf.search.searchWriter(formData.word),
        method: "post",
        data: {
          genre: formData.genres,
          genre_count: formData.genres.length,
          max_price: formData.max_price,
          min_price: formData.min_price,
          status: formData.status,
        },
      });

      return response;
    },
  },

  chatting: {
    getUserList: async (userEmailList: string[]) => {
      const response = await axios({
        url: rf.chatting.getUserList(),
        method: "post",
        data: {
          userEmailList,
        },
      });

      return response;
    },
  },
};

export default api;
