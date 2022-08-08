import React, { useState } from "react";
import { LikeArtworkList } from "../../Interface";

interface Props {
  liked_artwork_list: LikeArtworkList[];
}

function UserLikedArtworkList({ liked_artwork_list }: Props): JSX.Element {
  const [watchLikedArtworkList, setwatchLikedArtworkList] =
    useState<boolean>(false);

  const getArtworkList = async () => {
    setwatchLikedArtworkList(!watchLikedArtworkList);
  };

  return (
    <div>
      <button onClick={getArtworkList}>좋아요한 게시글</button>
      {watchLikedArtworkList ? (
        <div>
          {liked_artwork_list.length &&
            liked_artwork_list.map((item) => {
              return (
                <div key={item.artwork_id}>
                  <img src={item.picture_url} alt="게시물사진" />
                  <p>{item.title}</p>
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

export default UserLikedArtworkList;
