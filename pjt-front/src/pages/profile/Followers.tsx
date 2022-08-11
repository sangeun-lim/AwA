// import { style } from "@mui/system";
import React, { useState } from "react";
import { Follow } from "../../Interface";
import style from "./Profile.module.css";

interface Props {
  follower_list: Follow[];
}

function Followers({ follower_list }: Props): JSX.Element {
  const [watchFollowList, setWatchFollowList] = useState<boolean>(false);

  const getFollowers = async () => {
    setWatchFollowList(!watchFollowList);
  };

  return (
    <div>
      <div onClick={getFollowers}>팔로워</div>
      {watchFollowList ? (
        <div>
          {follower_list.map((item) => {
            return (
              <div key={item.nickname} className={style.followList}>
                <div>
                  <img src={item.profile_picture_url} alt="프로필사진" />
                </div>

                <div className={style.followListName}>{item.nickname}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Followers;
