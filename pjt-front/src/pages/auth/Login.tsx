import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "./Login.module.css";
import { LoginData } from "./../../api/apiInterface";
import { loginDefaultData } from "./../../defaultData";
import api from "../../api/api";
import { loadingActions } from "../../store";
import { User } from "../../Interface";

interface Props {
  getUserData: Function;
}

function Login({ getUserData }: Props): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );
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
    if (!!userObject) {
      navigate("/");
    }
  }, [navigate, userObject]);

  return (
    <div className="d-flex justify-content-center">
      <div className={style.container}>
        <div className={style.title}>로그인</div>
        <form onSubmit={onSubmit} className={style.login}>
          <div className={style.inputContainer}>
            <input
              name="id"
              type="email"
              id="id"
              value={loginForm.id}
              onChange={onChange}
              className={style.loginInput}
              required
            />
            <label htmlFor="id" className={style.label}>
              아이디
            </label>
            <div className={style.bar}></div>
          </div>
          <div className={style.inputContainer}>
            <input
              name="pw"
              type="password"
              id="password"
              value={loginForm.pw}
              onChange={onChange}
              className={style.loginInput}
              required
            />
            <label htmlFor="password" className={style.label}>
              비밀번호
            </label>
            <div className={style.bar}></div>
          </div>
          <div className={style.buttonContainer}>
            <button>
              <input
                type="submit"
                value="로그인"
                className={style.loginSubmit}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
