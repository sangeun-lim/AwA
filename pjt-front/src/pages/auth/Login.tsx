import React, { useEffect } from "react";
import { useState, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import api from "../../api/api";
import axios from "axios";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

interface Props {
  isLoggedIn: boolean;
  getUserData: Function;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

interface LoginData {
  id: string;
  pw: string;
}

const defaultData = {
  id: "",
  pw: "",
};

function Login({ isLoggedIn, getUserData, setIsLoading }: Props): JSX.Element {
  const [loginForm, setLoginForm] = useState<LoginData>(defaultData);
  const navigate = useNavigate();

  const loginRequest = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        url: api.auth.login(),
        method: "post",
        data: {
          email: loginForm.id,
          password: loginForm.pw,
        },
      });
      setIsLoading(false);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        getUserData();
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      alert(err);
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
