import React from "react";
import { useState } from "react";
import style from "./Login.module.css";

interface LoginData {
  id: string;
  pw: string;
}

const defaultData = {
  id: "",
  pw: "",
};

function Login(): JSX.Element {
  const [loginForm, setLoginForm] = useState<LoginData>(defaultData);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    setLoginForm(defaultData);
  };

  return (
    <div className={style.container}>
      <div className={style.title}>LogIn</div>
      <form onSubmit={onSubmit} className={style.login}>
        <div className={style.inputContainer}>
          <input
            name="id"
            type="text"
            value={loginForm.id}
            placeholder="ID"
            onChange={onChange}
            className={style.loginInput}
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
          />
        </div>
        <br />
        <input type="submit" value="로그인" className={style.loginSubmit} />
      </form>
    </div>
  );
}

export default Login;
