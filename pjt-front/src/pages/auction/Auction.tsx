import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./Auction.module.css";

import api from "../../api/api";
import AuctionCard from "../../component/AuctionCard";
import { loadingActions } from "../../store";
import { ArtworkItem, User } from "./../../Interface";
import { Masonry } from "@mui/lab";
import { useInView } from "react-intersection-observer";
import TopButton from "../../component/TopButton";

const FAVORITE = ["회화", "조소", "건축", "공예", "서예", "디지털", "기타"];

function Auction(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  const [itemList, setItemList] = useState<ArtworkItem[]>([]);
  const [itemListByGenre, setItemListByGenre] = useState<ArtworkItem[]>([]);
  const [checkByGenre, setCheckByGenre] = useState<boolean>(false);

  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );
  const loading = useSelector((state: { loading: boolean }) => state.loading);
  const [pageNum, setPageNum] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(100);
  const [selectGenre, setSelectGenre] = useState<string>("");

  const onClick = () => {
    navigate("/auction/create");
  };

  const checkOnlyOne = async (checkThis: any) => {
    const checkboxes = document.getElementsByName("genre") as
      | HTMLInputElement
      | any;

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else if (checkboxes[i].checked === true) {
        setCheckByGenre(true);
        setSelectGenre(checkboxes[i].value);
      } else if (selectGenre === checkboxes[i].value) {
        setCheckByGenre(false);
        setSelectGenre("");
      }
    }
  };

  const callAuctionByGenre = async () => {
    dispatch(loadingActions.toggle());
    try {
      const response = await api.artwork.getArtworkInGenre(selectGenre);
      setItemListByGenre(response.data);
      dispatch(loadingActions.toggle());
    } catch (err) {
      console.error(err);
      dispatch(loadingActions.toggle());
    }
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
      console.error(err);
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {
    if (selectGenre && checkByGenre) {
      callAuctionByGenre();
    }
  }, [selectGenre, checkByGenre]);

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
    <>
      {checkByGenre ? (
        <div>
          <div className={style.auction}>
            <section className={style.auctionTop}>
              <div>
                <div className={style.title}>Artwork Auction </div>
                <div className={style.content}>좋은 작품을 만날 기회</div>
              </div>
            </section>
            <div className={style.searchOption}>
              <span>작품종류</span>
              <div className={style.options}>
                {FAVORITE.map((item) => {
                  return (
                    <div key={item}>
                      <input
                        type="checkbox"
                        value={item}
                        id={`home${item}`}
                        name="genre"
                        onClick={(e) => checkOnlyOne(e.target)}
                      />
                      <label htmlFor={`home${item}`}>{item}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.auctionButtonBox}>
              {userObject ? (
                <button onClick={onClick} className={style.auctionButton}>
                  상품등록
                </button>
              ) : (
                <></>
              )}
            </div>
            <Masonry columns={{ sm: 2, md: 3, xl: 4 }} spacing={1}>
              {itemListByGenre.map((item, i) => {
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
          <TopButton></TopButton>

          <div ref={ref}>.</div>
        </div>
      ) : (
        <div>
          <div className={style.auction}>
            <section className={style.auctionTop}>
              <div>
                <div className={style.title}>Artwork Auction </div>
                <div className={style.content}>좋은 작품을 만날 기회</div>
              </div>
            </section>
            <div className={style.searchOption}>
              <span>작품종류</span>
              <div className={style.options}>
                {FAVORITE.map((item) => {
                  return (
                    <div key={item}>
                      <input
                        type="checkbox"
                        value={item}
                        id={`home${item}`}
                        name="genre"
                        onClick={(e) => checkOnlyOne(e.target)}
                      />
                      <label htmlFor={`home${item}`}>{item}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.auctionButtonBox}>
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
          <TopButton></TopButton>
          <div ref={ref}>.</div>
        </div>
      )}
    </>
  );
}

export default Auction;
