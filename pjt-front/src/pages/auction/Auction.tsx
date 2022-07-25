import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "./../../Interface";

function Auction(): JSX.Element {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState<Array<Item>>([]);

  const onClick = () => {
    navigate("/auction/edit");
  };

  return (
    <div>
      <h1>Auction</h1>
      <button onClick={onClick}>상품등록</button>
    </div>
  );
}

export default Auction;
