import axios from "axios";
import React, { useState, useEffect } from "react";
import api from "../api/api";
import { ArtworkItem } from "../Interface";

interface AuctionRank {
  title: string;
  artwork_id: number;
}

const defaultAuctionRank: AuctionRank = {
  title: "",
  artwork_id: 0,
};

function Rank(): JSX.Element {
  // const [itemList, setItemList] = useState<Array<ArtworkItem>>([]);
  const [itemList, setItemList] = useState<Array<AuctionRank>>([]);
  // const [followRank, setFollowRank] = useState<Array<>>([]);
  // const [판매자랭킹?, set판매자랭킹?] = useState<Array<>>([]);

  // useEffect(() => {
  //   const callAuctionRank = async () => {
  //     setIsLoading(true);
  //     try {
  // const response = await axios({
  //   url: api.artwork.readAllOrPost(),
  //   method: "get",
  // });
  // if (response.status === 200) {
  //   const items = response.data;

  //   const auctionsRank: Array<AuctionRank> = items.map((auction: any) => {
  //     const { artwork_id, title } = auction;
  //     const auctionR: AuctionRank = { artwork_id, title };
  //     return auctionR;
  //   });
  //   setItemList(auctionsRank);

  // const newAuctions: Array<ArtworkItem> = items.map((auction: any) => {
  //   const {
  //     artwork_id,
  //     attachmentRequestDtoList,
  //     genre,
  //     ingredient,
  //     like_count,
  //     price,
  //     sell_user_email,
  //     sell_user_nickname,
  //     title,
  //     view_count,
  //     createdDate,
  //     profile_picture,
  //     description,
  //   } = auction;
  //   const newAuction: ArtworkItem = {
  //     artwork_id,
  //     mediaList: attachmentRequestDtoList,
  //     genre,
  //     ingredient,
  //     like_count,
  //     price,
  //     sell_user_email,
  //     sell_user_nickname,
  //     title,
  //     view_count,
  //     createdDate,
  //     profile_picture,
  //     description,
  //   };
  //   return newAuction;
  // });
  // setItemList(newAuctions);
  //       }
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setIsLoading(false);
  //     }
  //   };
  //   callAuctionRank();
  // }, [setIsLoading]);

  // function bestRank() {
  //   let bestArray: any = [];
  //   {
  //     itemList.map((item) => {
  //       for (let i = 0; i < itemList.length; i++) {
  //         bestArray.push(
  //           <div key={item.artwork_id}>
  //             {i + 1} {item.title}
  //           </div>
  //         );
  //       }
  //     });
  //   }
  //   return bestArray;
  // }

  return (
    <div className="d-flex flex-row justify-content-around">
      <div>
        <p>주간 베스트 랭킹</p>
        {itemList.map((item, index) => {
          return (
            // 여기에 index 수가 10 이하 까지만 이라는 조건 if문 줄수있나?
            <div key={item.artwork_id}>
              {index + 1}
              {item.title}
            </div>
          );
        })}
      </div>
      <div>
        <p>팔로우 랭킹</p>
        {itemList.map((item, index) => {
          return (
            <div key={item.artwork_id}>
              {index + 1}
              {item.title}
            </div>
          );
        })}
      </div>
      <div>
        <p>판매자 랭킹</p>
        {itemList.map((item, index) => {
          return (
            <div key={item.artwork_id}>
              {index + 1}
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rank;
