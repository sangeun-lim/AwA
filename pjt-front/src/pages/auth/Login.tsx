import React from "react";
import { useState } from "react";

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
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="id"
          type="text"
          value={loginForm.id}
          placeholder="ID"
          onChange={onChange}
        />
        <input
          name="pw"
          type="password"
          value={loginForm.pw}
          placeholder="Password"
          onChange={onChange}
        />
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
}

export default Login;
