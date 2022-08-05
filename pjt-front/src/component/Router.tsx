import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Preview from "../pages/Preview";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import FindPw from "../pages/auth/FindPw";
import Profile from "../pages/profile/Profile";
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
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  getUserData: Function;
}

const AppRouter = ({ getUserData }: Props): JSX.Element => {
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

  const [selectChat, setSelectChat] = useState<string | null>(null); // 채팅 상대유저의 이메일을 저장

  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview" element={<Preview />} />
          <Route
            path="/auth/login"
            element={<Login getUserData={getUserData} />}
          />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/findpw" element={<FindPw />} />
          <Route path="/profile/:email" element={<Profile />} />
          {userObject && (
            <Route
              path="/chatting"
              element={
                <Chatting
                  selectChat={selectChat}
                  setSelectChat={setSelectChat}
                />
              }
            />
          )}
          <Route path="/auction" element={<Auction />} />
          <Route
            path="/auction/detail/:id"
            element={<AuctionDetailOrUpdate />}
          />
          {userObject && (
            <Route path="/auction/create" element={<AuctionCreate />} />
          )}
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<NoticeDetailAndEdit />} />
          <Route path="/notice/create" element={<NoticeCreate />} />
          <Route path="/searchresult/:word" element={<SearchResult />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
