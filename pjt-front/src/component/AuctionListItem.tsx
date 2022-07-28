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

  const imageUrlList = item.imageUrlList;

  return (
    <div>
      <p>
        {imageUrlList && (
          <div>
            {imageUrlList.map((image, id) => (
              <span key={id}>
                <img
                  src={image}
                  alt={`${image}-${id}`}
                  width="10%"
                  height="10%"
                />
              </span>
            ))}
          </div>
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
