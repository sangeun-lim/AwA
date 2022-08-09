import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./Auction.module.css";

import api from "../../api/api";
import AuctionCard from "../../component/AuctionCard";
import { loadingActions } from "../../store";
import { ArtworkItem, User } from "./../../Interface";
import SearchComponent from "../../component/SearchComponent";
import { Masonry } from "@mui/lab";

function Auction(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [itemList, setItemList] = useState<ArtworkItem[]>([]);
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );
  const [pageNum, setPageNum] = useState<number>(1);

  const onClick = () => {
    navigate("/auction/create");
  };

  const callAuction = async () => {
    dispatch(loadingActions.toggle());
    try {
      const response = await api.artwork.getArtworks(pageNum);
      setPageNum(pageNum + 1);
      setItemList((prev) => prev.concat(response.data.artworkResponseDto));
      dispatch(loadingActions.toggle());
    } catch (err) {
      console.log(err);
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    /* eslint-disable */
    callAuction();
  }, []);

  return (
    <div id="auctionPage" className={style.auction}>
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
      <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={1}>
        {itemList.map((item, i) => {
          return (
            <div key={i} className="grid-item">
              <AuctionCard item={item}></AuctionCard>
            </div>
          );
        })}
      </Masonry>
    </div>
  );
}

export default Auction;
