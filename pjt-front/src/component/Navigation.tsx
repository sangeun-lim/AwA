import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import style from "./Navigation.module.css";
import { User } from "./../Interface";
import { useDispatch, useSelector } from "react-redux";
import { userObjectActions } from "../store";
import { GoSearch } from "react-icons/go";
import { BsChatFill } from "react-icons/bs";
import SearchComponent from "./SearchComponent";
import { debounce } from "lodash";
import { setCookie } from "../cookie";
import { GrSearch } from "react-icons/gr";
import api from "../api/api";
import { searchResultsActions } from "../store";

function Navigation(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const [searchWord, setSearchWord] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchWord(value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchWord.length < 2) {
      alert("검색어를 2자 이상 입력해주세요");
    } else {
      const q = {
        genres: [],
        genre_count: 0,
        max_price: 30000000,
        min_price: 0,
        status: 0,
        word: searchWord,
      };
      const response = await api.search.searchTitle(q);
      const response2 = await api.search.searchWriter(q);

      const result = [...response.data, ...response2.data];

      dispatch(searchResultsActions.setResults(result));
      navigate(`/searchresult/${searchWord}`);
    }
  };

  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 300);
  const { pathname } = useLocation();

  const logoutRequest = async () => {
    dispatch(userObjectActions.logout());
    sessionStorage.setItem("token", "");
    setCookie("refresh_token", "");
    navigate("/");
  };

  const Logout = () => {
    logoutRequest();
  };

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    if (windowWidth >= 769) {
      setMenuToggle(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    setSearchBar(false);
    setMenuToggle(false);
  }, [pathname, windowWidth]);

  return (
    <div className={style.nav}>
      <nav className={searchBar ? style.navBoxSearch : style.navBox}>
        <div className={style.burgerBox}>
          <div
            className={!menuToggle ? style.burgerMenu : style.menu}
            onClick={() =>
              menuToggle ? setMenuToggle(false) : setMenuToggle(true)
            }
          >
            <div className={style.burgerLine1}></div>
            <div className={style.burgerLine2}></div>
            <div className={style.burgerLine3}></div>
          </div>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? style.active : "")}
            >
              <img
                src="./img/logo.png"
                alt="로고"
                className={style.burgerLogoImg}
              />
            </NavLink>
          </div>
          <div className={style.iconBox}>
            {userObject ? (
              <div>
                <NavLink
                  to="/chatting"
                  className={({ isActive }) =>
                    isActive ? style.chattingIconActive : style.chattingIcon
                  }
                >
                  <BsChatFill />
                </NavLink>
              </div>
            ) : null}
            <GoSearch
              onClick={() => setSearchBar(!searchBar)}
              className={style.searchIcon}
            />
          </div>
        </div>

        <div className={style.menuBox}>
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
                <img
                  src="./img/logo.png"
                  alt="로고"
                  className={style.logoImg}
                />
              </NavLink>
            </div>
            {userObject ? (
              // 로그인 했을 때
              <div className={style.right}>
                <div className={style.profile}>
                  <NavLink
                    to={`/profile/${userObject.email}`}
                    className={({ isActive }) => (isActive ? style.active : "")}
                    onClick={() =>
                      menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                    }
                  >
                    {userObject.nickname}
                  </NavLink>
                  <p>님 환영합니다!</p>
                </div>
                <div>
                  <NavLink
                    to="/chatting"
                    className={({ isActive }) =>
                      isActive ? style.chattingIconActive : style.chattingIcon
                    }
                  >
                    <BsChatFill />
                  </NavLink>
                </div>
                <button onClick={Logout} className={style.btn}>
                  Logout
                </button>
                <GoSearch
                  onClick={() => setSearchBar(!searchBar)}
                  className={style.searchIcon}
                />
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
                <GoSearch
                  onClick={() => setSearchBar(!searchBar)}
                  className={style.searchIcon}
                />
              </div>
            )}
          </div>
          {/* burgerMenu */}
          <div
            className={!menuToggle ? style.menuBoxHidden : style.menuBoxVisible}
          >
            <div className={style.burgerList}>
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
            {userObject ? (
              // 로그인 했을 때
              <div className={style.burgerList}>
                <NavLink
                  to={`/profile/${userObject.email}`}
                  className={({ isActive }) => (isActive ? style.active : "")}
                  onClick={() =>
                    menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                  }
                >
                  Profile
                </NavLink>
                <button onClick={Logout} className={style.btn}>
                  Logout
                </button>
              </div>
            ) : (
              // 로그인 안 했을 때
              <div className={style.burgerList}>
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

        <div
          className={searchBar ? style.navSearchBarActive : style.navSearchBar}
        >
          <div className={style.searchComponent}>
            <SearchComponent />
          </div>
          <div className={style.smmallSearchComponent}>
            <form onSubmit={onSubmit} className={style.searchForm}>
              <input
                type="text"
                value={searchWord}
                onChange={onChange}
                placeholder="검색어를 입력해주세요"
                className={style.searchBar}
                required
              />
              <button className={style.searchButton}>
                <GrSearch className={style.searchIcon} />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
