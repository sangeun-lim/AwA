import React, { useEffect, useState } from "react";
import style from "./TopButton.module.css";

function TopButton(): JSX.Element {
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setBtnStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      /* eslint-disable */
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  }, [ScrollY]);
  return (
    <div className={style.wrap}>
      <button
        className={BtnStatus ? style.topBtn : style.topBtnActive}
        onClick={handleTop}
      >
        TOP
      </button>
    </div>
  );
}
export default TopButton;
