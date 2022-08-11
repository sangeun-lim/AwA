import React, { useState } from "react";
import { ArtworkList } from "../../Interface";
import { NavLink } from "react-router-dom";
import MyAuctionCard from "./MyAuctionCard";
import { Masonry } from "@mui/lab";

interface Props {
  artwork_list: ArtworkList[];
}

function UserArtworkList({ artwork_list }: Props): JSX.Element {
  return (
    <div>
      {artwork_list && (
        <Masonry columns={{ sm: 2, md: 3, xl: 4 }} spacing={1}>
          {artwork_list.map((item) => {
            return (
              <div key={item.artwork_id} className="grid-item">
                <MyAuctionCard item={item} />
              </div>
            );
          })}
        </Masonry>
      )}
    </div>
  );
}

export default UserArtworkList;
