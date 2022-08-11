import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "./Home.module.css";
import { GrSearch } from "react-icons/gr";
import { ArtworkItem, User } from "./../Interface";
import { useDispatch, useSelector } from "react-redux";
import { Masonry } from "@mui/lab";
import api from "./../api/api";
import { useInView } from "react-intersection-observer";
import { loadingActions } from "./../store";

function Home(): JSX.Element {
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );
  const loading = useSelector((state: { loading: boolean }) => state.loading);
  const [searchWord, setSearchWord] = useState<string>("");
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(100);
  const [items, setItems] = useState<ArtworkItem[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchWord(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const getListItem = async () => {
    dispatch(loadingActions.toggle());
    try {
      const response = await api.artwork.getArtworks(pageNum);
      setPageNum(pageNum + 1);
      setItems((prev) => prev.concat(response.data.artworkResponseDto));
      setLastPage(Math.floor(response.data.totalCount / 20) + 1);
      dispatch(loadingActions.toggle());
    } catch (err) {
      console.error(err);
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {
    if (!userObject) {
      /* eslint-disable */
      getListItem();
    }
  }, []);

  useEffect(() => {
    if (inView && !loading && pageNum <= lastPage) {
      getListItem();
      setPageNum((prev) => prev + 1);
    }
  }, [inView, loading]);

  return (
    <>
      <header className={style.Header}>
        <div>캐러셀?</div>
      </header>
      <section>
        <form onSubmit={onSubmit} className={style.searchForm}>
          <input
            type="text"
            value={searchWord}
            onChange={onChange}
            placeholder="검색어를 입력해주세요"
            className={style.searchBar}
            required
          />
          <button className={style.searchButton}>
            <GrSearch className={style.searchIcon} />
          </button>
        </form>
      </section>
      {!userObject && (
        <section className={style.secondSection}>
          <h3 className={style.subTitle}>AwA의 새로운 작품들을 만나보세요</h3>
          <hr className={style.subLine}></hr>
          <div className={style.masonryBox}>
            <Masonry columns={{ sm: 2, md: 3, xl: 4 }} spacing={1}>
              {items.map((item) => {
                return (
                  <div key={item.artwork_id}>
                    <img
                      className={style.masonryImg}
                      src={item.attachmentRequestDtoList[0].url}
                      alt="이미지"
                    />
                  </div>
                );
              })}
            </Masonry>
          </div>
        </section>
      )}
      {!userObject && pageNum > lastPage && (
        <div className={style.lastBox}>
          <span>마지막 게시글 입니다</span>
        </div>
      )}
      <div ref={ref}>.</div>
    </>
  );
}

export default Home;
