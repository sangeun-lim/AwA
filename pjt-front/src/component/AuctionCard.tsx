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
    <div className={style.imageCard}>
      <div className={style.container}>
        {item.attachmentRequestDtoList.length && (
          <img
            src={item.attachmentRequestDtoList[0].url}
            alt="AuctionImg"
            className={style.auctionImg}
          />
        )}

        <NavLink to={`/auction/detail/${item.artwork_id}`}>
          <div className={style.overlay}></div>
          <div className={style.content}>
            <h3>{item.title}</h3>
            <div>{item.genre[0]}</div>
            {item.is_sell === 0 || item.is_sell === 2 ? (
              <div>판매중</div>
            ) : (
              <div>판매완료</div>
            )}
            <div>{item.price}원</div>
            <div>{`${year}.${month}.${day}`}</div>
          </div>
        </NavLink>
      </div>
      <div className={style.profileContainer}>
        <div className={style.profile}>
          {item.profile_picture ? (
            <NavLink
              to={`/profile/${item.sell_user_email}`}
              className={style.moveLink}
            >
              <img
                src={item.profile_picture}
                alt="profileImg"
                className={style.profileImg}
              />
              <span className={style.profileName}>
                {item.sell_user_nickname}
              </span>
            </NavLink>
          ) : (
            <NavLink
              to={`/profile/${item.sell_user_email}`}
              className={style.moveLink}
            >
              <img
                src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
                alt="profileImg"
                className={style.profileImg}
              />
              <span className={style.profileName}>
                {item.sell_user_nickname}
              </span>
            </NavLink>
          )}
          <span>❤ {item.like_count}</span>
        </div>
      </div>
    </div>
  );
}

export default AuctionCard;
