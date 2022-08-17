import React from "react";
import { NavLink } from "react-router-dom";
import { ArtworkItem } from "../Interface";
import style from "./AuctionCard.module.css";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";

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
            <div>
              {item.is_sell === 0 || item.is_sell === 2 ? (
                <div className={style.isSell}>
                  <BsBookmark className={style.sellBookmark} />
                  <div className={style.sell}>판매중</div>
                </div>
              ) : (
                <div className={style.isSell}>
                  <BsFillBookmarkFill className={style.soldoutBookmark} />
                  <div className={style.soldout}>판매완료</div>
                </div>
              )}
            </div>
            <div className={style.itemInfo}>
              <h3>{item.title}</h3>
              <div>{item.genre[0]}</div>
              <div>
                {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </div>
              <div>{`${year}.${month}.${day}`}</div>
            </div>
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
              <div className={style.profileInfo}>
                <img
                  src={item.profile_picture}
                  alt="profileImg"
                  className={style.profileImg}
                />
                <div className={style.profileName}>
                  {item.sell_user_nickname}
                </div>
              </div>
            </NavLink>
          ) : (
            <NavLink
              to={`/profile/${item.sell_user_email}`}
              className={style.moveLink}
            >
              <div className={style.profileInfo}>
                <img
                  src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568917764/noticon/stddia3lvzo8napn15ec.png"
                  alt="profileImg"
                  className={style.profileImg}
                />
                <div className={style.profileName}>
                  {item.sell_user_nickname}
                </div>
              </div>
            </NavLink>
          )}
          <div className={style.like}>
            <div className={style.likeHeart}>❤</div>
            <div>{item.like_count}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionCard;
