import React from "react";
import { useState } from "react";
import "./Login.css";

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
    <div className="container">
      <div className="title">LogIn</div>
      <form onSubmit={onSubmit} className="login">
        <div className="inputContainer">
          <input
            name="id"
            type="text"
            value={loginForm.id}
            placeholder="ID"
            onChange={onChange}
            className="loginInput"
          />
        </div>
        <div className="inputContainer">
          <input
            name="pw"
            type="password"
            value={loginForm.pw}
            placeholder="Password"
            onChange={onChange}
            className="loginInput"
          />
        </div>
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
}

export default Login;
