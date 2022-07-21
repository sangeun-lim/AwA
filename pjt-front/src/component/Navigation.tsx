import React from "react";
import { NavLink } from "react-router-dom";
import "../component/style/Navigation.css";

function Navigation(): JSX.Element {
  return (
    // 로그인했을때와 안했을때 구분해야되는디
    <nav>
      <ul>
        <li>
          <NavLink to="/auction">Auction</NavLink>
        </li>
        <li>
          <NavLink to="/notice">Notice</NavLink>
        </li>

        <li>
          <li>
            <NavLink to="/">AwA 이미지 </NavLink>
          </li>
        </li>

        {/* <button>
        <NavLink to="/알림모달창">알림이모티콘</NavLink>
      </button> */}

        <li>
          <NavLink to="/auth/login">Login</NavLink>
        </li>

        <li>
          <NavLink to="/auth/signup">SignUp</NavLink>
        </li>

        {/* <button>
        <NavLink to="/검색바컴포넌트">검색이모티콘</NavLink>
      </button> */}
      </ul>
    </nav>
  );
}

export default Navigation;
