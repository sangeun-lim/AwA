import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authService } from "../fbase";
import AppRouter from "./Router";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userObject, setUserObject] = useState<User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
      } else {
        setIsLoggedIn(false);
        setUserObject(null);
      }
    });
  });

  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} userObject={userObject} />
    </div>
  );
}

export default App;
