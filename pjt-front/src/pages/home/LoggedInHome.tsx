import { useEffect, useState } from "react";
import api from "./../../api/api";
import { ArtworkItem, User } from "../../Interface";
import RankLike from "../RankLike";
import style from "./LoggedInHome.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "./../../store";
import { Masonry } from "@mui/lab";
import AuctionCard from "../../component/AuctionCard";
import { useInView } from "react-intersection-observer";
import RankFollow from "../RankFollow";

function LoggedInHome() {
  const dispatch = useDispatch();
  const loading = useSelector((state: { loading: boolean }) => state.loading);
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );

  const [ref, inView] = useInView();
  const [items, setItems] = useState<ArtworkItem[]>([]);
  const [changeRank, setChangeRank] = useState<boolean>(false);
  const [isLast, setIsLast] = useState<boolean>(false);

  const [t, setT] = useState<number>(8);

  useEffect(() => {
    setTimeout(() => {
      setChangeRank(!changeRank);
    }, 8000);
  }, [changeRank]);

  useEffect(() => {
    const id = setInterval(() => {
      setT((t) => t - 1);
    }, 1000);
    if (t === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [t]);

  const getOnlyFollowItems = async () => {
    dispatch(loadingActions.toggle());

    try {
      const response = await api.artwork.getFollowingItems(userObject.email, 1);
      setItems((prev) => prev.concat(response.data.artworkResponseDto));
      setTimeout(() => {
        dispatch(loadingActions.toggle());
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("정보를 불러오는데 실패했습니다.");
      dispatch(loadingActions.toggle());
    }
  };

  const getRecommends = async () => {
    dispatch(loadingActions.toggle());

    try {
      const response = await api.artwork.getRecommends(userObject.email);

      if (response.data.totalCount < 12) {
        setItems((prev) => prev.concat(response.data.artworkResponseDto));
      } else {
        setIsLast(true);
      }
      setTimeout(() => {
        dispatch(loadingActions.toggle());
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("정보를 불러오는데 실패했습니다.");
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {
    /* eslint-disable */
    getOnlyFollowItems();
  }, []);

  useEffect(() => {
    if (inView && !loading && !isLast) {
      /* eslint-disable */
      getRecommends();
    }
  }, [inView, loading]);

  return (
    <>
      <div className={style.Body}>
        <div className={style.feed}>
          {items && (
            <Masonry columns={{ sm: 2, md: 3, xl: 4 }} spacing={1}>
              {items.map((item, i) => {
                return (
                  <div key={i} className="grid-item">
                    <AuctionCard item={item}></AuctionCard>
                  </div>
                );
              })}
            </Masonry>
          )}
        </div>
        {changeRank ? (
          <div className={`${style.ranking} ${style.startEffect}`}>
            <RankFollow></RankFollow>
          </div>
        ) : (
          <div className={`${style.ranking} ${style.startEffect}`}>
            <RankLike></RankLike>
          </div>
        )}
      </div>
      {isLast && (
        <div className={style.lastBox}>
          <span>마지막 게시글 입니다</span>
        </div>
      )}
      <div ref={ref}>.</div>
    </>
  );
}

export default LoggedInHome;
