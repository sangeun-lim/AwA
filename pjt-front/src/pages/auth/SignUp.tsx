import React from "react";
import { useState } from "react";

interface SignUpData {
  id: string;
  pw1: string;
  pw2: string;
  nickname: string;
  birth: string;
  gender: boolean | null;
}

const defaultData = {
  id: "",
  pw1: "",
  pw2: "",
  nickname: "",
  birth: "",
  gender: null,
};

function SignUp(): JSX.Element {
  const [signUpForm, setSignUpForm] = useState<SignUpData>(defaultData);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setSignUpForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    setSignUpForm(defaultData);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="id">아이디 </label>
        <input
          name="id"
          id="id"
          type="text"
          value={signUpForm.id}
          placeholder="[필수]아이디"
          onChange={onChange}
          required
          // 중복확인
        />
        <br />
        <label htmlFor="password">비밀번호 </label>
        <input
          name="pw1"
          id="password"
          type="password"
          value={signUpForm.pw1}
          placeholder="[필수]비밀번호"
          onChange={onChange}
          required
        />
        <br />
        <label htmlFor="password2">비밀번호 확인 </label>
        <input
          name="pw2"
          id="password2"
          type="password"
          value={signUpForm.pw2}
          placeholder="[필수]비밀번호 확인"
          onChange={onChange}
          required
        />
        <br />
        <label htmlFor="nickname">닉네임 </label>
        <input
          name="nickname"
          id="nickname"
          type="text"
          value={signUpForm.nickname}
          placeholder="[필수]닉네임"
          onChange={onChange}
          required
          //중복확인
        />
        <br />
        <label htmlFor="birth">생년월일</label>
        <input
          name="birth"
          id="birth"
          type="date"
          value={signUpForm.birth}
          placeholder="[선택]생년월일"
          onChange={onChange}
        />
        <br />
        <label htmlFor="male">남</label>
        <input
          name="gender"
          id="male"
          type="radio"
          value="true"
          onChange={onChange}
        />
        <label htmlFor="female">여</label>
        <input
          name="gender"
          id="female"
          type="radio"
          value="false"
          onChange={onChange}
        />
        <br />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
}

export default SignUp;
