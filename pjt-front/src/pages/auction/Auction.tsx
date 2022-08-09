import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./Auction.module.css";

import api from "../../api/api";
import AuctionCard from "../../component/AuctionCard";
import { loadingActions } from "../../store";
import { ArtworkItem, User } from "./../../Interface";
import SearchComponent from "../../component/SearchComponent";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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
      </div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3, 1300: 4 }}
      >
        <Masonry>
          {itemList.map((item) => {
            return (
              <div key={item.artwork_id} className="grid-item">
                <AuctionCard item={item}></AuctionCard>
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Auction;
