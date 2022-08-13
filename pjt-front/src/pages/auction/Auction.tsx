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
import { useInView } from "react-intersection-observer";

function Auction(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const [itemList, setItemList] = useState<ArtworkItem[]>([]);
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );
  const loading = useSelector((state: { loading: boolean }) => state.loading);
  const [pageNum, setPageNum] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(100);

  const onClick = () => {
    navigate("/auction/create");
  };

  const callAuction = async () => {
    dispatch(loadingActions.toggle());
    try {
      const response = await api.artwork.getArtworks(pageNum);
      setPageNum(pageNum + 1);
      setItemList((prev) => prev.concat(response.data.artworkResponseDto));
      setLastPage(Math.floor(response.data.totalCount / 20) + 1);
      setTimeout(() => {
        dispatch(loadingActions.toggle());
      }, 1000);
    } catch (err) {
      console.log(err);
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {
    /* eslint-disable */
    callAuction();
  }, []);

  useEffect(() => {
    if (inView && !loading && pageNum <= lastPage) {
      callAuction();
      setPageNum((prev) => prev + 1);
    }
  }, [inView, loading]);

  return (
    <div>
      <div className={style.auction}>
        <section className={style.auctionTop}>
          <div>
            <div className={style.title}>Artwork Auction </div>
            <div className={style.content}>좋은 작품을 만날 기회</div>
          </div>
        </section>
        <div>
          {userObject ? (
            <button onClick={onClick} className={style.auctionButton}>
              상품등록
            </button>
          ) : (
            <></>
          )}
        </div>
        <Masonry columns={{ sm: 2, md: 3, xl: 4 }} spacing={1}>
          {itemList.map((item, i) => {
            return (
              <div key={i} className="grid-item">
                <AuctionCard item={item}></AuctionCard>
              </div>
            );
          })}
        </Masonry>
      </div>
      {pageNum > lastPage && (
        <div className={style.lastBox}>
          <span>마지막 게시글 입니다</span>
        </div>
      )}
      <div ref={ref}>.</div>
    </div>
  );
}

export default Auction;
