import { useSelector } from "react-redux";
import { User } from "../../Interface";
import { NavLink } from "react-router-dom";

import LoggedInHome from "./LoggedInHome";
import NotLoggedInHome from "./NotLoggedInHome";
import style from "./Home.module.css";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

function Carousel(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div>
      <Slider {...settings}>
        <div className={style.slideBox}>
          <div className={style.slideContent}>
            <div className={style.content1}>
              <h1>당신이 좋아할 만한 작품들이 한가득!</h1>
              <div>AwA와 함께 많은 작품들을 만나보세요.</div>
              <div>회원가입 후 로그인을 하면 작품을 추천해드립니다.</div>
            </div>
            <NavLink to="/auction">
              <button className={style.slideBtn1}>지금 바로 구매하기!</button>
            </NavLink>
          </div>
          <img src="./img/frame1.png" alt="" />
        </div>
        <div className={style.slideBox}>
          <div className={style.slideContent}>
            <div className={style.content2}>
              <h1>좋은 작품을 판매할 수 있는 기회!</h1>
              <div>멋진 작품을 판매할 수 있는 기회를 제공합니다.</div>
              <div>AwA와 함께라면 당신의 작품은 더욱 빛날거예요!</div>
            </div>
            <NavLink to="/auction">
              <button className={style.slideBtn2}>지금 바로 판매하기!</button>
            </NavLink>
          </div>
          <img src="./img/frame2.png" alt="" />
        </div>
        <div className={style.slideBox}>
          <div className={style.slideContent}>
            <div className={style.content3}>
              <h1>공지사항을 꼭 확인해주세요!</h1>
              <div>
                상품 판매 혹은 구매를 하기 전에는 공지사항을 꼭 확인해 주세요.
              </div>
              <div>공지사항 확인은 AwA를 더 즐길 수 있도록 도와줍니다!</div>
            </div>
            <NavLink to="/notice">
              <button className={style.slideBtn3}>공지사항 확인하기!</button>
            </NavLink>
          </div>
          <img src="./img/frame3.png" alt="" />
        </div>
        <div className={style.slideBox}>
          <div className={style.slideContent}>
            <div className={style.content4}>
              <h1>AwA에서 이 모든것을 누려보세요!</h1>
              <div>내 작품을 팔고 좋은 작품을 살 수 있는 기회!</div>
              <div>회원가입 후 이 모든 것을 누려보세요.</div>
            </div>
            <NavLink to="/auth/signup">
              <button className={style.slideBtn4}>회원가입 하러가기!</button>
            </NavLink>
          </div>
          <img src="./img/frame4.png" alt="" />
        </div>
      </Slider>
    </div>
  );
}

function Home(): JSX.Element {
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );
  return (
    <>
      <header className={style.Header}>
        <Carousel />
      </header>
      {userObject ? (
        <LoggedInHome></LoggedInHome>
      ) : (
        <NotLoggedInHome></NotLoggedInHome>
      )}
    </>
  );
}

export default Home;
