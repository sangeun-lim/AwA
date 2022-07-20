import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Preview from "../pages/Preview";
import Login from "../pages/auth/Login";

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
