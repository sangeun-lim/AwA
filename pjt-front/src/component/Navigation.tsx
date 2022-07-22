import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

function Navigation(): JSX.Element {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  return (
    <nav className={style.navBox}>
      <div
        className={!menuToggle ? style.bugerMenu : style.menu}
        onClick={() =>
          menuToggle ? setMenuToggle(false) : setMenuToggle(true)
        }
      >
        <div className={style.burgerLine1}></div>
        <div className={style.burgerLine2}></div>
        <div className={style.burgerLine3}></div>
      </div>

      <div
        className={[
          style.menuBox,
          !menuToggle ? style.menuBoxHidden : style.menuBoxVisible,
        ].join(" ")}
      >
        <div className={style.menuList}>
          <div className={style.left}>
            <NavLink
              to="/auction"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              Auction
            </NavLink>
            <NavLink
              to="/notice"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              Notice
            </NavLink>
          </div>
          <div className={style.center}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              AwA 이미지{" "}
            </NavLink>
          </div>
          <div className={style.right}>
            <NavLink
              to="/auth/login"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/auth/signup"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              SignUp
            </NavLink>
          </div>
          {/* <button>
            <NavLink to="/알림모달창">알림이모티콘</NavLink>
          </button>
          <button>
            <NavLink to="/검색바컴포넌트">검색이모티콘</NavLink>
          </button> */}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
