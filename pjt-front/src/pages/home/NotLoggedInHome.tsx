import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "./NotLoggedInHome.module.css";
import { GrSearch } from "react-icons/gr";
import { ArtworkItem } from "../../Interface";
import { useDispatch } from "react-redux";
import api from "../../api/api";
import { loadingActions } from "../../store";

function NotLoggedInHome() {
  const dispatch = useDispatch();

  const [searchWord, setSearchWord] = useState<string>("");

  const [items, setItems] = useState<ArtworkItem[]>([]);
  const [secondItems, setSecondItems] = useState<ArtworkItem[]>([]);

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
      const response = await api.artwork.getArtworks(1);
      const response2 = await api.artwork.getArtworks(2);
      setItems(response.data.artworkResponseDto);
      setSecondItems(response2.data.artworkResponseDto);
      dispatch(loadingActions.toggle());
    } catch (err) {
      console.error(err);
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {
    /* eslint-disable */
    getListItem();
  }, []);

  return (
    <>
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

      <section className={style.secondSection}>
        <h3 className={style.subTitle}>AwA의 새로운 작품들을 만나보세요</h3>
        <hr className={style.subLine}></hr>
        <div className={style.infinity_slide}>
          <div className={style.slide}>
            {items.map((item) => {
              return (
                <div key={item.artwork_id}>
                  <img
                    className={style.img}
                    src={item.attachmentRequestDtoList[0].url}
                    alt="이미지"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.middleBox}></div>
        <div className={style.infinity_slide}>
          <div className={style.slide2}>
            {secondItems.map((item) => {
              return (
                <div key={item.artwork_id}>
                  <img
                    className={style.img}
                    src={item.attachmentRequestDtoList[0].url}
                    alt="이미지"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default NotLoggedInHome;
