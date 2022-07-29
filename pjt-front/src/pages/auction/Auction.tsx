import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import AuctionListItem from "../../component/AuctionListItem";
import { ArtworkItem } from "./../../Interface";

function Auction(): JSX.Element {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState<Array<ArtworkItem>>([]);

  const onClick = () => {
    navigate("/auction/edit");
  };

  const callAuction = async () => {
    const response = await axios({
      url: api.artwork.readAllOrPost(),
      method: "get",
    });

    if (response.status === 200) {
      const items = response.data;

      const newAuctions: Array<ArtworkItem> = items.map((auction: any) => {
        const {
          artwork_id,
          mediaList,
          genre,
          ingredient,
          like_count,
          price,
          sell_user,
          title,
          view_count,
          createdDate,
          profile_picture,
        } = auction;
        const newAuction: ArtworkItem = {
          artwork_id,
          mediaList,
          genre,
          ingredient,
          like_count,
          price,
          sell_user,
          title,
          view_count,
          createdDate,
          profile_picture,
        };
        return newAuction;
      });
      setItemList(newAuctions);
    }
  };

  useEffect(() => {
    callAuction();
  }, []);

  return (
    <>
      <h1>Auction</h1>
      <button onClick={onClick}>상품등록</button>
      {itemList.map((item) => {
        return (
          <div key={item.artwork_id}>
            <AuctionListItem item={item}></AuctionListItem>
          </div>
        );
      })}
    </>
  );
}

export default Auction;
