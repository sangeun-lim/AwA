import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Preview from "../pages/Preview";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import FindPw from "../pages/auth/FindPw";
import Profile from "../pages/profile/Profile";
import Favorite from "../pages/profile/Favorite";
import Chatting from "../pages/chatting/Chatting";
import Auction from "../pages/auction/Auction";
import AuctionDetailOrUpdate from "../pages/auction/AuctionDetailOrUpdate";
import AuctionCreate from "../pages/auction/AuctionCreate";
import Notice from "../pages/notice/Notice";
import NoticeDetailAndEdit from "../pages/notice/NoticeDetailAndEdit";
import NoticeCreate from "../pages/notice/NoticeCreate";
import SearchResult from "../pages/SearchResult";
import Rank from "../pages/Rank";
import Error from "../pages/Error";
import Navigation from "./Navigation";
import { User } from "./../Interface";
import { useState, Dispatch } from "react";

interface Props {
  isLoggedIn: boolean;
  userObject: User | null;
  getUserData: Function;
  setUserObject: Dispatch<React.SetStateAction<User | null>>;
}

const AppRouter = ({
  isLoggedIn,
  userObject,
  getUserData,
  setUserObject,
}: Props): JSX.Element => {
  const [selectChat, setSelectChat] = useState<string | null>(null); // 채팅 상대유저의 이메일을 저장

  return (
    <>
      <Router>
        <Navigation
          userEmail={userObject?.email}
          setUserObject={setUserObject}
        />
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
          <Route
            path="/auction/detail/:id"
            element={<AuctionDetailOrUpdate userObject={userObject} />}
          />
          {userObject && (
            <Route
              path="/auction/create"
              element={<AuctionCreate userObject={userObject} />}
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
