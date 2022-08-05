import React from "react";
import { useSelector } from "react-redux";
import AuctionCard from "../component/AuctionCard";
import SearchComponent from "../component/SearchComponent";
import { ArtworkItem } from "../Interface";

function SearchResult(): JSX.Element {
  const searchResults = useSelector(
    (state: { searchResults: ArtworkItem[] }) => state.searchResults
  );

  return (
    <>
      <h1>SearchResult</h1>
      <SearchComponent />
      {searchResults.length &&
        searchResults.map((item) => {
          return (
            <div key={item.artwork_id}>
              <AuctionCard item={item} />
            </div>
          );
        })}
    </>
  );
}

export default SearchResult;
