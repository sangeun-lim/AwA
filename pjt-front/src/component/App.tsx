import React, { useEffect, useState } from "react";
import api from "../api/api";
import AppRouter from "./Router";
import { User } from "./../Interface";
import style from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../store";

function App(): JSX.Element {
  const [userObject, setUserObject] = useState<User | null>(null);
  const dispatch = useDispatch();
  const loading = useSelector((state: { loading: boolean }) => state);

  const getUserData = async () => {
    dispatch(loadingActions.toggle());
    const token = localStorage.getItem("token") || "";
    try {
      const response = await api.auth.getUserObject(token);
      dispatch(loadingActions.toggle());
      if (response.status === 200) {
        setUserObject(response.data);
      }
    } catch (err) {
      console.error(err);
      dispatch(loadingActions.toggle());
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      dispatch(loadingActions.toggle());
      const token = localStorage.getItem("token") || "";
      try {
        const response = await api.auth.getUserObject(token);
        dispatch(loadingActions.toggle());
        if (response.status === 200) {
          setUserObject(response.data);
        }
      } catch (err) {
        console.error(err);
        dispatch(loadingActions.toggle());
      }
    };

    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      setUserObject(null);
    }
  }, [dispatch]);

  return (
    <div>
      {loading.loading && (
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
      <AppRouter
        isLoggedIn={!!userObject}
        userObject={userObject}
        getUserData={getUserData}
        setUserObject={setUserObject}
      />
    </div>
  );
}

export default App;
