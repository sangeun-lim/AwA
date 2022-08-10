import axios from "axios";
import React, { useEffect, useState } from "react";
import rf from "../api/rf";
import style from "./Rank.module.css";

interface Like {
  title: string;
}

function RankLike(): JSX.Element {
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

  useEffect(() => {
    likeRankRequest();
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
    </div>
  );
}

export default RankLike;
