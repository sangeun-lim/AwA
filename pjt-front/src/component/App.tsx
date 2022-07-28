import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authService } from "../fbase";
import AppRouter from "./Router";

function App(): JSX.Element {
  const [userObject, setUserObject] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject(user);
      } else {
        setUserObject(null);
      }
    });
  }, []);

  return (
    <div>
      <AppRouter isLoggedIn={!!userObject} userObject={userObject} />
    </div>
  );
}

export default App;
