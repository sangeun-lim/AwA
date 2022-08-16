import React, { useEffect } from "react";
import api from "../api/api";
import AppRouter from "./Router";
import style from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions, userObjectActions } from "../store";
import { getCookie } from "../cookie";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const loading = useSelector((state: { loading: boolean }) => state.loading);

  const getUserData = async () => {
    dispatch(loadingActions.toggle());
    const token = getCookie("refresh_token") || "";
    try {
      const response = await api.auth.getUserObject(token);
      dispatch(loadingActions.toggle());
      if (response.status === 200) {
        dispatch(userObjectActions.login(response.data));
      }
    } catch (err) {
      console.error(err);
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      dispatch(loadingActions.toggle());
      const token = getCookie("refresh_token") || "";
      try {
        const response = await api.auth.getUserObject(token);

        dispatch(loadingActions.toggle());

        if (response.status === 200) {
          dispatch(userObjectActions.login(response.data));
        }
      } catch (err) {
        console.error(err);
        dispatch(loadingActions.toggle());
      }
    };

    if (getCookie("refresh_token")) {
      getUserData();
    } else {
      dispatch(userObjectActions.logout());
    }
  }, [dispatch]);

  return (
    <div>
      {loading && (
        <div className={style.loading}>
          <div id={style.load}>
            <div>다</div>
            <div>니</div>
            <div>입</div>
            <div>중</div>
            <div>딩</div>
            <div>로</div>
          </div>
        </div>
      )}
      <AppRouter getUserData={getUserData} />
      <footer className={style.footer}>
        <p className={style.footerText1}>&copy; SSAFY</p>
        <p className={style.footerText2}>후원계좌: 93....</p>
        <p className={style.footerText2}>문의메일: seon_hyuk97@kakao.com</p>
      </footer>
    </div>
  );
}

export default App;
