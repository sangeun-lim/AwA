import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import rf from "../api/rf";
import style from "./Rank.module.css";

interface Follow {
  nickname: string;
  email: string;
  profile_picture_url: string;
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
    <div className={style.Container}>
      <p className={style.rankTitle}>팔로우 랭킹</p>
      {followRank.map((item, index) => {
        return (
          <div className={style.listItem}>
            <div className={style.itemContent}>
              <li key={item.nickname} className={style.txtLine}>
                <span className={style.rankNumber}>
                  {index + 1}
                  {`. `}
                </span>{" "}
                {item.profile_picture_url ? (
                  <img
                    className={style.profileImage}
                    src={item.profile_picture_url}
                    alt="profile"
                  />
                ) : (
                  <img
                    className={style.profileImage}
                    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
                    alt="profile"
                  />
                )}{" "}
                <span>
                  <NavLink
                    to={`/profile/${item.email}`}
                    className={style.moveLink}
                  >
                    {item.nickname}
                  </NavLink>
                </span>
              </li>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RankFollow;
