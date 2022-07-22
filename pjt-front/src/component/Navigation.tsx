import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

interface Props {
  userEmail: string | null | undefined;
}

function Navigation({ userEmail }: Props): JSX.Element {
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
        {/* NavBar */}
        <div className={style.navList}>
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
              AwA 이미지
            </NavLink>
          </div>
          {userEmail ? (
            // 로그인 했을 때
            <div className={style.right}>
              <div className={style.profile}>
                <NavLink
                  to={`/profile/${userEmail}`}
                  className={({ isActive }) => (isActive ? style.active : "")}
                  onClick={() =>
                    menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                  }
                >
                  {userEmail}
                </NavLink>
                <p>님 환영합니다!</p>
              </div>
              <NavLink
                to="/auth/logout"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                Logout
              </NavLink>
            </div>
          ) : (
            // 로그인 안 했을 때
            <div className={style.right}>
              <NavLink
                to="/auth/signup"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                SignUp
              </NavLink>
              <NavLink
                to="/auth/login"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                Login
              </NavLink>
            </div>
          )}

          {/* <button>
            <NavLink to="/알림모달창">알림이모티콘</NavLink>
          </button>
          <button>
            <NavLink to="/검색바컴포넌트">검색이모티콘</NavLink>
          </button> */}
        </div>
        {/* bugerMenu */}
        <div>
          <div className={style.bugerList}>
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
          {userEmail ? (
            // 로그인 했을 때
            <div className={style.bugerList}>
              <NavLink
                to={`/profile/${userEmail}`}
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/auth/logout"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                Logout
              </NavLink>
            </div>
          ) : (
            // 로그인 안 했을 때
            <div>
              <NavLink
                to="/auth/signup"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                SignUp
              </NavLink>
              <NavLink
                to="/auth/login"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
