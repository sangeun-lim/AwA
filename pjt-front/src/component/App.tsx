import React, { useEffect } from "react";
import api from "../api/api";
import AppRouter from "./Router";
import style from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions, userObjectActions } from "../store";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const loading = useSelector((state: { loading: boolean }) => state.loading);

  const getUserData = async () => {
    dispatch(loadingActions.toggle());
    const token = localStorage.getItem("refresh_token") || "";
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
      const token = localStorage.getItem("refresh_token") || "";
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

    if (localStorage.getItem("token")) {
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
    </div>
  );
}

export default App;
