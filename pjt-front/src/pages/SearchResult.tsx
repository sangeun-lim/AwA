import React from "react";
import { useSelector } from "react-redux";
import AuctionCard from "../component/AuctionCard";
import { ArtworkItem } from "../Interface";
import style from "../pages/SearchResult.module.css";
import { Masonry } from "@mui/lab";

function SearchResult(): JSX.Element {
  const searchResults = useSelector(
    (state: { searchResults: ArtworkItem[] }) => state.searchResults
  );

  return (
    <div className={style.auction}>
      {searchResults.length ? (
        <div>
          <div className={style.noResult}>검색결과입니다.</div>
          <Masonry columns={{ sm: 2, md: 3, xl: 4 }} spacing={1}>
            {searchResults.map((item, i) => {
              return (
                <div key={i}>
                  <AuctionCard item={item} />
                </div>
              );
            })}
          </Masonry>
        </div>
      ) : (
        <div className={style.noResult}>검색결과가 없습니다.</div>
      )}
    </div>
  );
}

export default SearchResult;
