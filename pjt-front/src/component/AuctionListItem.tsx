import React from "react";
import { NavLink } from "react-router-dom";
import { ArtworkItem } from "../Interface";

interface Props {
  item: ArtworkItem;
}

const AuctionListItem = ({ item }: Props): JSX.Element => {
  const date = new Date(item.createdDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const imageUrlList = item.mediaList;

  return (
    <div>
      <p>
        {imageUrlList.length && (
          <div>
            {imageUrlList.map((image) => (
              <span key={image.url}>
                <img
                  src={image.url}
                  alt={`${image.url}-${image.type}`}
                  width="10%"
                  height="10%"
                />
              </span>
            ))}
          </div>
        )}
      </p>
      <b>
        <NavLink to={`/auction/${item.artwork_id}`}>{item.title}</NavLink>
      </b>
      <span>
        {item.price}원 | {`${year}.${month}.${day}`} | {item.sell_user}
      </span>
    </div>
  );
};

export default AuctionListItem;
