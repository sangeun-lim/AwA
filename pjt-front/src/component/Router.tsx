import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Preview from "../pages/Preview";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import FindPw from "../pages/auth/FindPw";
import Profile from "../pages/profile/Profile";
import Favorite from "../pages/profile/Favorite";
import Chatting from "../pages/Chatting";
import Auction from "../pages/auction/Auction";
import AuctionDetail from "../pages/auction/AuctionDetail";
import AuctionEdit from "../pages/auction/AuctionEdit";
import Notice from "../pages/notice/Notice";
import NoticeDetail from "../pages/notice/NoticeDetail";
import NoticeEdit from "../pages/notice/NoticeEdit";
import SearchResult from "../pages/SearchResult";
import Rank from "../pages/Rank";
import Error from "../pages/Error";

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/findpw" element={<FindPw />} />
        <Route path="/profile/:nickname" element={<Profile />} />
        <Route path="/profile/favorite" element={<Favorite />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
        <Route path="/auction/edit" element={<AuctionEdit />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />
        <Route path="/notice/edit" element={<NoticeEdit />} />
        <Route path="/searchresult" element={<SearchResult />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
