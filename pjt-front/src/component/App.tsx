import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import AppRouter from "./Router";
import { User } from "./../Interface";
import style from "./App.module.css";

function App(): JSX.Element {
  const [userObject, setUserObject] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserData = async () => {
    const token = localStorage.getItem("token") || "";

    const response = await axios({
      url: api.auth.userinfo(),
      method: "get",
      headers: {
        token: token,
      },
    });

    if (response.status === 200) {
      setUserObject(response.data);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      setUserObject(null);
    }
  }, []);

  return (
    <div>
      {isLoading && (
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
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default App;
