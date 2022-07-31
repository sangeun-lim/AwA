import React from "react";
import { NavLink } from "react-router-dom";
import { Item } from "../Interface";
import style from "./AuctionCard.module.css";

const AuctionCard = (): JSX.Element => {
  return (
    <div>
      <div className={style.container}>
        <div className={style.profile}>
          <img
            src="https://placeimg.com/30/30/any"
            alt="profileImg"
            className={style.profileImg}
          />
          <span className={style.profileName}>React</span>
        </div>
        <img
          src="https://placeimg.com/300/400/any"
          alt="AuctionImg"
          className={style.auctionImg}
        />
        <div className={style.overlay}></div>
        <div className={style.content}>
          <h1>
            <NavLink to={`/auction`}>Title</NavLink>
          </h1>
          <div>조소</div>
          <div>3시간 전</div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
