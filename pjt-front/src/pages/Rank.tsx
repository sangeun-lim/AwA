import React from "react";
import RankFollow from "./RankFollow";
import RankLike from "./RankLike";

function Rank(): JSX.Element {
  return (
    <div>
      <RankFollow></RankFollow>
      <RankLike></RankLike>
    </div>
  );
}

export default Rank;
