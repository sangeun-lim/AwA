import React, { useState } from "react";
import { LikeArtworkList } from "../../Interface";
import style from "./UserAuctionCard.module.css";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";

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
      <div className={`${styles.auctionList}`}>
        {watchLikedArtworkList ? (
          <div>
            {liked_artwork_list.length &&
              liked_artwork_list.map((item) => {
                return (
                  <div key={item.artwork_id} className={style.imageCard}>
                    <div className={style.container}>
                      <img
                        src={item.picture_url}
                        alt="AuctionImg"
                        className={style.auctionImg}
                      />
                      <NavLink to={`/auction/detail/${item.artwork_id}`}>
                        <div className={style.overlay}></div>
                        <div className={style.content}>
                          <h3>{item.title}</h3>
                          <div>{item.genre[0]}</div>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default UserLikedArtworkList;
