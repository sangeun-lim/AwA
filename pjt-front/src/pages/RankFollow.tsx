import axios from "axios";
import React, { useEffect, useState } from "react";
import rf from "../api/rf";
import style from "./Rank.module.css";

interface Follow {
  nickname: string;
}

function RankFollow(): JSX.Element {
  const [followRank, setFollowRank] = useState<Array<Follow>>([]);

  const followRankRequest = async () => {
    const response = await axios({
      url: rf.rank.getFollowRank(),
      method: "get",
    });
    if (response.status === 200) {
      const followRankList = response.data;
      setFollowRank(followRankList);
    }
  };

  useEffect(() => {
    followRankRequest();
  }, []);

  return (
    <div className={style.rank}>
      <div>
        <p>팔로우 랭킹</p>
        {followRank.map((item, index) => {
          return (
            <li key={item.nickname}>
              {index + 1} | {item.nickname}
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default RankFollow;
