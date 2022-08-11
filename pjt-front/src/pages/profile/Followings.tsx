import React, { useState } from "react";
import { Follow } from "../../Interface";
import style from "./Profile.module.css";

interface Props {
  following_list: Follow[];
}

function Followings({ following_list }: Props): JSX.Element {
  const [watchFollowList, setWatchFollowList] = useState<boolean>(false);

  const getFollowings = async () => {
    setWatchFollowList(!watchFollowList);
  };

  return (
    <div>
      <div onClick={getFollowings}>팔로잉</div>
      {watchFollowList ? (
        <div>
          {following_list.map((item) => {
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

export default Followings;
