import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Preview from "../pages/Preview";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import FindPw from "../pages/auth/FindPw";
import Profile from "../pages/profile/Profile";
import Favorite from "../pages/profile/Favorite";
import Chatting from "../pages/Chatting/Chatting";
import Auction from "../pages/auction/Auction";
import AuctionDetail from "../pages/auction/AuctionDetail";
import AuctionEdit from "../pages/auction/AuctionEdit";
import Notice from "../pages/notice/Notice";
import NoticeDetailAndEdit from "../pages/notice/NoticeDetailAndEdit";
import NoticeCreate from "../pages/notice/NoticeCreate";
import SearchResult from "../pages/SearchResult";
import Rank from "../pages/Rank";
import Error from "../pages/Error";
import Navigation from "./Navigation";
import { User } from "./../Interface";
import { useState } from "react";

interface Props {
  isLoggedIn: boolean;
  userObject: User | null;
  getUserData: Function;
}

const AppRouter = ({
  isLoggedIn,
  userObject,
  getUserData,
}: Props): JSX.Element => {
  const [selectChat, setSelectChat] = useState<string | null>(null); // 채팅 상대유저의 이메일을 저장

  return (
    <>
      <Router>
        <Navigation userEmail={userObject?.email} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview" element={<Preview />} />
          <Route
            path="/auth/login"
            element={
              <Login isLoggedIn={isLoggedIn} getUserData={getUserData} />
            }
          />
          <Route
            path="/auth/signup"
            element={<SignUp isLoggedIn={isLoggedIn} />}
          />
          <Route path="/auth/findpw" element={<FindPw />} />
          <Route
            path="/profile/:nickname"
            element={<Profile isLoggedIn={isLoggedIn} />}
          />
          <Route path="/profile/favorite" element={<Favorite />} />
          {userObject && (
            <Route
              path="/chatting"
              element={
                <Chatting
                  userObject={userObject}
                  selectChat={selectChat}
                  setSelectChat={setSelectChat}
                />
              }
            />
          )}
          <Route path="/auction" element={<Auction />} />
          <Route path="/auction/:id" element={<AuctionDetail />} />
          {userObject && (
            <Route
              path="/auction/edit"
              element={<AuctionEdit userObject={userObject} />}
            />
          )}
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<NoticeDetailAndEdit />} />
          <Route path="/notice/create" element={<NoticeCreate />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
