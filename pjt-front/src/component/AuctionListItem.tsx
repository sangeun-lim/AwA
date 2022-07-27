import React from "react";
import { NavLink } from "react-router-dom";
import { Item } from "../Interface";

interface Props {
  item: Item;
}

const AuctionListItem = ({ item }: Props): JSX.Element => {
  const date = new Date(item.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div>
      <p>
        {item.imageUrl && (
          <img src={item.imageUrl} alt="image" width="20%" height="20%" />
        )}
      </p>
      <b>
        <NavLink to={`/auction/${item.id}`}>{item.title}</NavLink>
      </b>
      <span>
        {item.price}원 | {`${year}.${month}.${day}`} | {item.nickname}
      </span>
    </div>
  );
};

export default AuctionListItem;
