import React from "react";
import { NavLink } from "react-router-dom";
import { ArtworkItem } from "../Interface";
import style from "./AuctionCard.module.css";

function AuctionCard({ item }: { item: ArtworkItem }): JSX.Element {
  const date = new Date(item.createdDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div>
      <div className={style.container}>
        {item.mediaList.length && (
          <img
            src={item.mediaList[0].url}
            alt="AuctionImg"
            className={style.auctionImg}
          />
        )}
        <div className={style.profile}>
          {item.profile_picture ? (<img
            src={item.profile_picture}
            alt="profileImg"
            className={style.profileImg}
          />) : (<img
            src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
            alt="profileImg"
            className={style.profileImg}
          />)}
          <span className={style.profileName}>{item.sell_user_nickname}</span>
        </div>
        <div className={style.overlay}></div>
        <div className={style.content}>
          <h1>
            <NavLink to={`/auction/detail/${item.artwork_id}`}>
              {item.title}
            </NavLink>
          </h1>
          <div>{item.genre[0]}</div>
          <div>{`${year}.${month}.${day}`}</div>
        </div>
      </div>
    </div>
  );
}

export default AuctionCard;
