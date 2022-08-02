import React from "react";
<<<<<<< pjt-front/src/pages/Home.tsx
import { useDispatch } from "react-redux";
import ReportModal from "./ReportModal";
import { loadingActions } from "../store";
import ReportModal from "./auction/ReportModal";

function Home(): JSX.Element {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(loadingActions.toggle());
  };

  return (
    <div className="container">
      <h1>home</h1>
      <button onClick={onClick}>안녕</button>
      <ReportModal></ReportModal>
    </div>
  );
}

export default Home;
