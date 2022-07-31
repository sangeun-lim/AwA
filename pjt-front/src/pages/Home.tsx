import React from "react";
import AuctionCard from "../component/AuctionCard";
// import ReportModal from "./ReportModal";

function Home(): JSX.Element {
  return (
    <div className="container">
      <h1>home</h1>
      {/* <ReportModal></ReportModal> */}
      <AuctionCard></AuctionCard>
    </div>
  );
}

export default Home;
