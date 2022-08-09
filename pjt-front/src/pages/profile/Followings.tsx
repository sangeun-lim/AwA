import React, { useState } from "react";
import { Follow } from "../../Interface";

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
      <p onClick={getFollowings}>팔로잉</p>
      {watchFollowList ? (
        <div>
          {following_list.map((item) => {
            return (
              <li key={item.nickname}>
                <img src={item.profile_picture_url} alt="프로필사진" /> |{" "}
                {item.nickname}
              </li>
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
