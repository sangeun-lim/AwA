import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuctionListItem from "../../component/AuctionListItem";
import { Item } from "./../../Interface";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "../../fbase";

function Auction(): JSX.Element {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState<Array<Item>>([]);

  const onClick = () => {
    navigate("/auction/edit");
  };

  const callAuction = async () => {
    const q = query(
      collection(dbService, "auction"),
      orderBy("createdAt", "desc")
    );

    const auctions = (await getDocs(q)).docs;

    const newAuctions: Array<Item> = auctions.map((auction) => {
      const {
        imageUrlList,
        title,
        price,
        nickname,
        genres,
        material,
        detail,
        createdAt,
        like,
        viewCount,
        comments,
      } = auction.data();
      const newAuction: Item = {
        imageUrlList,
        title,
        price,
        nickname,
        genres,
        material,
        detail,
        createdAt,
        like,
        viewCount,
        comments,
        id: auction.id,
      };
      return newAuction;
    });
    setItemList(newAuctions);
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
          <div key={item.id}>
            <AuctionListItem item={item}></AuctionListItem>
          </div>
        );
      })}
    </>
  );
}

export default Auction;
