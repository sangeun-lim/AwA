import React, { useState } from "react";
import { ArtworkList } from "../../Interface";
import AuctionCard from "../../component/AuctionCard";

interface Props {
  artwork_list: ArtworkList[];
}

function UserArtworkList({ artwork_list }: Props): JSX.Element {
  const [watchArtworkList, setWatchArtworkList] = useState<boolean>(true);

  const getArtworkList = async () => {
    setWatchArtworkList(!watchArtworkList);
  };

  return (
    <div>
      <button onClick={getArtworkList}>내 게시글</button>
      {watchArtworkList ? (
        <div>
          {artwork_list.length &&
            artwork_list.map((item) => {
              return (
                <div key={item.artwork_id}>
                  {/* 옥션카드 형태로 받아올라했는데, 데이터 받는게 완전 달라서 이거는...
                  새롭게 컴포넌트를 만들던가 css를 해줘야될거같은데.. */}
                  <img src={item.picture_url} alt="게시물사진" />
                  <p>{item.title}</p>
                </div>
              );
            })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default UserArtworkList;
