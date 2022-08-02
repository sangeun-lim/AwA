import React, { useEffect } from "react";
import { useState, Dispatch } from "react";
import { useNavigate } from "react-router-dom";

import style from "./Login.module.css";
import { LoginData } from "./../../api/apiInterface";
import { loginDefaultData } from "./../../defaultData";
import api from "../../api/api";

interface Props {
  isLoggedIn: boolean;
  getUserData: Function;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

function Login({ isLoggedIn, getUserData, setIsLoading }: Props): JSX.Element {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState<LoginData>(loginDefaultData);

  const loginRequest = async () => {
    setIsLoading(true);

    try {
      const response = await api.auth.login(loginForm);
      setIsLoading(false);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        getUserData();
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      loginRequest();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="d-flex justify-content-center">
      <div className={style.container}>
        <div className={style.title}>로그인</div>
        <form onSubmit={onSubmit} className={style.login}>
          <div className={style.inputContainer}>
            <input
              name="id"
              type="email"
              value={loginForm.id}
              placeholder="ID"
              onChange={onChange}
              className={style.loginInput}
              required
            />
          </div>
          <div className={style.inputContainer}>
            <input
              name="pw"
              type="password"
              value={loginForm.pw}
              placeholder="Password"
              onChange={onChange}
              className={style.loginInput}
              required
            />
          </div>
          <br />
          <input type="submit" value="로그인" className={style.loginSubmit} />
        </form>
      </div>
    </div>
  );
}

export default Login;
