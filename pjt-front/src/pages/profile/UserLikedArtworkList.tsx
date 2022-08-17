import React, { useState } from "react";
import { LikeArtworkList } from "../../Interface";
import { NavLink } from "react-router-dom";
import MyAuctionCard from "./MyAuctionCard";
import { Masonry } from "@mui/lab";
import style from "./Profile.module.css";

interface Props {
  liked_artwork_list: LikeArtworkList[];
}

function UserLikedArtworkList({ liked_artwork_list }: Props): JSX.Element {
  return (
    <div>
      {/* {liked_artwork_list && (
        <Masonry columns={{ sm: 2, md: 3, xl: 4 }} spacing={1}>
          {liked_artwork_list.map((item) => {
            return (
              <div key={item.artwork_id} className="grid-item">
                <MyAuctionCard item={item} />
              </div>
            );
          })}
        </Masonry>
      )} */}
      {liked_artwork_list && (
        <div className={style.userLiked}>
          {liked_artwork_list.map((item) => {
            return (
              <div key={item.artwork_id}>
                <MyAuctionCard item={item} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserLikedArtworkList;
