import React from "react";
import { NavLink } from "react-router-dom";
import { ArtworkList } from "../../Interface";
import style from "../../component/AuctionCard.module.css";

function MyAuctionCard({ item }: { item: ArtworkList }): JSX.Element {
  const date = new Date(item.createdDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className={style.imageCard}>
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
            <div>{`${year}.${month}.${day}`}</div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default MyAuctionCard;
