import React from "react";
import { useSelector } from "react-redux";
import AuctionCard from "../component/AuctionCard";
// import SearchComponent from "../component/SearchComponent";
import { ArtworkItem } from "../Interface";
import style from "../pages/SearchResult.module.css";
import { Masonry } from "@mui/lab";

function SearchResult(): JSX.Element {
  const searchResults = useSelector(
    (state: { searchResults: ArtworkItem[] }) => state.searchResults
  );

  return (
    <div className={style.auction}>
      {/* 이 검색컴포넌트가 검색 결과에 필요한가? 필요없는거 같은데 */}
      {/* <SearchComponent /> */}
      {searchResults.length ? (
        <Masonry columns={{ sm: 1, md: 2, xl: 4 }} spacing={1}>
          {searchResults.map((item) => {
            return (
              <div key={item.artwork_id}>
                <AuctionCard item={item} />
              </div>
            );
          })}
        </Masonry>
      ) : (
        <div className={style.noResult}>검색결과가 없습니다.</div>
      )}
    </div>
  );
}

export default SearchResult;
