import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./Auction.module.css";

import api from "../../api/api";
import AuctionCard from "../../component/AuctionCard";
import { loadingActions } from "../../store";
import { ArtworkItem, User } from "./../../Interface";
import SearchComponent from "../../component/SearchComponent";

function Auction(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [itemList, setItemList] = useState<ArtworkItem[]>([]);
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

  const onClick = () => {
    navigate("/auction/create");
  };

  useEffect(() => {
    const callAuction = async () => {
      dispatch(loadingActions.toggle());
      try {
        const response = await api.artwork.readAll();

        if (response.status === 200) {
          setItemList(response.data);
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
        {userObject && (
          <button onClick={onClick} className={style.auctionButton}>
            상품등록
          </button>
        )}
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
