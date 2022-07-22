import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../fbase";
import style from "./Login.module.css";

interface Props {
  isLoggedIn: boolean;
}

interface LoginData {
  id: string;
  pw: string;
}

const defaultData = {
  id: "",
  pw: "",
};

function Login({ isLoggedIn }: Props): JSX.Element {
  const [loginForm, setLoginForm] = useState<LoginData>(defaultData);
  const navigate = useNavigate();

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
      await signInWithEmailAndPassword(authService, loginForm.id, loginForm.pw);
      setLoginForm(defaultData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>LogIn</div>
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
  );
}

export default Login;
