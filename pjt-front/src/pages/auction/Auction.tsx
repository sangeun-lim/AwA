import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./Auction.module.css";

import api from "../../api/api";
import AuctionCard from "../../component/AuctionCard";
import { loadingActions } from "../../store";
import { ArtworkItem } from "./../../Interface";
import SearchComponent from "../../component/SearchComponent";

function Auction(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [itemList, setItemList] = useState<ArtworkItem[]>([]);

  const onClick = () => {
    navigate("/auction/create");
  };

  useEffect(() => {
    const callAuction = async () => {
      dispatch(loadingActions.toggle());
      try {
        const response = await api.artwork.readAll();

        if (response.status === 200) {
          const items = response.data;

          const newAuctions: Array<ArtworkItem> = items.map((auction: any) => {
            const {
              artwork_id,
              attachmentRequestDtoList,
              comments,
              genre,
              ingredient,
              like_count,
              price,
              sell_user_email,
              sell_user_nickname,
              title,
              view_count,
              createdDate,
              profile_picture,
              description,
            } = auction;

            const newAuction: ArtworkItem = {
              artwork_id,
              comments,
              attachmentRequestDtoList,
              genre,
              ingredient,
              like_count,
              price,
              sell_user_email,
              sell_user_nickname,
              title,
              view_count,
              createdDate,
              profile_picture,
              description,
            };

            return newAuction;
          });

          setItemList(newAuctions);
        }
        dispatch(loadingActions.toggle());
      } catch (err) {
        console.log(err);
        dispatch(loadingActions.toggle());
      }
    };

    callAuction();
  }, [dispatch]);

  return (
    <div className={style.auction}>
      <section className={style.auctionTop}>
        <SearchComponent />
      </section>
      <div>
        <button onClick={onClick} className={style.auctionButton}>
          상품등록
        </button>
        <div className={`${style.auctionList}`}>
          {itemList.map((item) => {
            return (
              <div key={item.artwork_id} className={style.auctionCard}>
                <AuctionCard item={item}></AuctionCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Auction;
