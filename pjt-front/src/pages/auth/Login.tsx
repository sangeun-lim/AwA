import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import style from "./Login.module.css";
import { LoginData } from "./../../api/apiInterface";
import { loginDefaultData } from "./../../defaultData";
import api from "../../api/api";
import { loadingActions } from "../../store";

interface Props {
  isLoggedIn: boolean;
  getUserData: Function;
}

function Login({ isLoggedIn, getUserData }: Props): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState<LoginData>(loginDefaultData);

  const loginRequest = async () => {
    dispatch(loadingActions.toggle());

    try {
      const response = await api.auth.login(loginForm);
      dispatch(loadingActions.toggle());

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        getUserData();
        navigate("/");
      }
    } catch (err) {
      dispatch(loadingActions.toggle());
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
