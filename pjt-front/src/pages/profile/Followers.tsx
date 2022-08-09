import React, { useState } from "react";
import { Follow } from "../../Interface";

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
      <p onClick={getFollowers}>팔로워</p>
      {watchFollowList ? (
        <div>
          {follower_list.map((item) => {
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

export default Followers;
