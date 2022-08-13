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
  newCommentType,
  ReportType,
  ChangePasswordType,
} from "./apiInterface";
import { getCookie } from "../cookie";

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

    email: async (email: string) => {
      const response = await axios({
        url: rf.auth.email(),
        method: "post",
        data: {
          email: email,
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

    changePassword: async (email: string, formData: ChangePasswordType) => {
      const response = await axios({
        url: rf.auth.changePassword(email),
        method: "post",
        headers: {
          password: formData.password,
        },
        data: {
          userEmail: formData.userEmail,
        },
      });
      return response;
    },

    checkPassword: async (email: string, password: string) => {
      const response = await axios({
        url: rf.auth.checkPassword(email),
        method: "post",
        data: {
          email: email,
          password: password,
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
          "X-AUTH-TOKEN": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
        },
        data: {
          title: formData.title,
          content: formData.content,
        },
      });
      return response;
    },

    updateOrDelete: async (
      id: string,
      formData: NewNoticeData | null,
      method: string
    ) => {
      const response = await axios({
        url: rf.notice.readOrUpdateOrDelete(id),
        method: method,
        headers: {
          "X-AUTH-TOKEN": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
        },
        data: formData,
      });

      return response;
    },
    read: async (id: string) => {
      const response = await axios({
        url: rf.notice.readOrUpdateOrDelete(id),
        method: "get",
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
          "X-AUTH-TOKEN": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
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

    updateOrDelete: async (
      id: string,
      formData: UpdateItemData | null,
      method: string
    ) => {
      const response = await axios({
        url: rf.artwork.readDetailOrUpdateOrDelete(id),
        method: method,
        headers: {
          "X-AUTH-TOKEN": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
        },
        data: formData,
      });

      return response;
    },

    read: async (id: string) => {
      const response = await axios({
        url: rf.artwork.readDetailOrUpdateOrDelete(id),
        method: "get",
      });
      return response;
    },

    getArtworks: async (pageNum: number) => {
      const response = await axios({
        url: rf.artwork.getArtworks(pageNum),
        method: "get",
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

    getEmail: async (nickname: string) => {
      const response = await axios({
        url: rf.profile.getEmail(nickname),
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
          "x-auth-token": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
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
          "x-auth-token": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
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
          "x-auth-token": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
        },
        method: method,
      });

      return response;
    },
  },

  comment: {
    createComment: async (formData: newCommentType) => {
      const response = await axios({
        url: rf.comment.createComment(),
        method: "post",
        headers: {
          "X-AUTH-TOKEN": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
        },
        data: {
          ...formData,
        },
      });

      return response;
    },

    getComment: async (comment_id: string) => {
      const response = await axios({
        url: rf.comment.getOrEditOrDeleteComment(comment_id),
        method: "get",
      });
      return response;
    },

    editComment: async (formData: newCommentType, comment_id: string) => {
      const response = await axios({
        url: rf.comment.getOrEditOrDeleteComment(comment_id),
        method: "put",
        headers: {
          "X-AUTH-TOKEN": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
        },
        data: {
          ...formData,
        },
      });
      return response;
    },

    deleteComment: async (comment_id: string) => {
      const response = await axios({
        url: rf.comment.getOrEditOrDeleteComment(comment_id),
        method: "delete",
        headers: {
          "X-AUTH-TOKEN": sessionStorage.getItem("token") || "",
          RefreshToken: getCookie("refresh_token") || "",
        },
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

  like: {
    checkLike: async (nickname: string, artwork_id: string) => {
      const response = await axios({
        url: rf.like.likeCheck(nickname, artwork_id),
        method: "get",
      });
      return response;
    },
    LikeArticle: async (
      nickname: string,
      artwork_id: string,
      method: string
    ) => {
      const response = await axios({
        url: rf.like.likeArtwork(nickname, artwork_id),
        method: method,
        data: {
          nickname: nickname,
          artwork_id: artwork_id,
        },
      });
      return response;
    },
  },

  report: {
    auctionReport: async (formData: ReportType, artworkId: string) => {
      const response = await axios({
        url: rf.report.report(artworkId),
        method: "post",
        data: {
          category: formData.category,
          content: formData.content,
          report_profile_nickname: formData.report_profile_nickname,
          reported_artwork_id: formData.reported_artwork_id,
        },
      });
      return response;
    },
  },
};

export default api;
