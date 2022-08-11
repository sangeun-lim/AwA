import React from "react";
import RankFollow from "./RankFollow";
import RankLike from "./RankLike";
import style from "./Rank.module.css";

function Rank(): JSX.Element {
  return (
    <div>
      <section className={style.rankTop}>
        <div>
          <div className={style.title}>랭킹</div>
          <div className={style.content}>
            클릭을 통해 AwA의 인플루언서와 베스트 게시물로 이동할 수 있습니다!
          </div>
        </div>
      </section>
      <br />
      {/* 랭킹 보여주는거 하나 더 있으면 꽉차서 안 밋밋할거같긴한데 */}
      <div className="d-flex flex-row justify-content-around">
        <RankFollow></RankFollow>
        <RankLike></RankLike>
        {/* <RankLike></RankLike> */}
      </div>
    </div>
  );
}

export default Rank;
