import axios from "axios";
import React, { useEffect, useState } from "react";
import rf from "../api/rf";
import style from "./Rank.module.css";

interface Like {
  title: string;
}

interface Follow {
  nickname: string;
}

function Rank(): JSX.Element {
  const [followRank, setFollowRank] = useState<Array<Follow>>([]);
  const [likeRank, setLikeRank] = useState<Array<Like>>([]);

  const likeRankRequest = async () => {
    const response = await axios({
      url: rf.rank.getLikeRank(),
      method: "get",
    });

    if (response.status === 200) {
      const likeList = response.data;
      setLikeRank(likeList);
    }
  };

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
    likeRankRequest();
    followRankRequest();
  }, []);

  return (
    <div className={style.rank}>
      <div>
        <p>주간 베스트 랭킹</p>
        {likeRank.map((item, index) => {
          return (
            <li key={item.title + index}>
              {index + 1} | {item.title}
            </li>
          );
        })}
      </div>
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
      {/* <div>
        <p>판매 랭킹</p>
        {likeRank.map((item, index) => {
          return (
            <div key={item.title}>
              {index + 1} | {item.title}
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default Rank;
