import React, { useState } from "react";
import { ArtworkList } from "../../Interface";
import { NavLink } from "react-router-dom";
import MyAuctionCard from "./MyAuctionCard";
import { Masonry } from "@mui/lab";
import style from "./Profile.module.css";

interface Props {
  artwork_list: ArtworkList[];
}

function UserArtworkList({ artwork_list }: Props): JSX.Element {
  return (
    <div>
      {artwork_list && (
        <div className={style.userLiked}>
          {artwork_list.map((item) => {
            return (
              <div key={item.artwork_id} className="grid-item">
                <MyAuctionCard item={item} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserArtworkList;
