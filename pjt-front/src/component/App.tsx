import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import AppRouter from "./Router";
import { User } from "./../Interface";

function App(): JSX.Element {
  const [userObject, setUserObject] = useState<User | null>(null);

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
      <AppRouter
        isLoggedIn={!!userObject}
        userObject={userObject}
        getUserData={getUserData}
      />
    </div>
  );
}

export default App;
