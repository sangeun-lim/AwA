import React, { useState } from "react";
import { ArtworkList } from "../../Interface";
import style from "./UserAuctionCard.module.css";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
interface Props {
  artwork_list: ArtworkList[];
}

function UserArtworkList({ artwork_list }: Props): JSX.Element {
  const [watchArtworkList, setWatchArtworkList] = useState<boolean>(false);

  const getArtworkList = async () => {
    setWatchArtworkList(!watchArtworkList);
  };

  return (
    <div>
      <button onClick={getArtworkList}>내 게시글</button>
      <div className={`${styles.auctionList}`}>
        {watchArtworkList ? (
          <div>
            {artwork_list.length &&
              artwork_list.map((item) => {
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

export default UserArtworkList;
