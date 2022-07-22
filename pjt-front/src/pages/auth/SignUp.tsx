import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../fbase";
import style from "./SignUp.module.css";

interface Props {
  isLoggedIn: boolean;
}

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

function SignUp({ isLoggedIn }: Props): JSX.Element {
  const [signUpForm, setSignUpForm] = useState<SignUpData>(defaultData);
  const navigate = useNavigate();

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setSignUpForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (signUpForm.pw1 === signUpForm.pw2) {
      try {
        await createUserWithEmailAndPassword(
          authService,
          signUpForm.id,
          signUpForm.pw1
        );
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Sign Up</div>
      <form onSubmit={onSubmit} className={style.signup}>
        <div className={style.signContainer}>
          <label htmlFor="id">아이디 </label>
          <input
            name="id"
            id="id"
            type="email"
            value={signUpForm.id}
            placeholder="[필수]아이디"
            onChange={onChange}
            required
            className={style.signInput}
            // 중복확인
          />
        </div>
        <div className={style.signContainer}>
          <label htmlFor="password">비밀번호 </label>
          <input
            name="pw1"
            id="password"
            type="password"
            value={signUpForm.pw1}
            placeholder="[필수]비밀번호"
            onChange={onChange}
            required
            className={style.signInput}
          />
        </div>
        <div className={style.signContainer}>
          <label htmlFor="password2">비밀번호 확인 </label>
          <input
            name="pw2"
            id="password2"
            type="password"
            value={signUpForm.pw2}
            placeholder="[필수]비밀번호 확인"
            onChange={onChange}
            required
            className={style.signInput}
          />
        </div>
        <div className={style.signContainer}>
          <label htmlFor="nickname">닉네임 </label>
          <input
            name="nickname"
            id="nickname"
            type="text"
            value={signUpForm.nickname}
            placeholder="[필수]닉네임"
            onChange={onChange}
            required
            className={style.signInput}
            //중복확인
          />
        </div>
        <div className={style.signContainer}>
          <label htmlFor="birth">생년월일</label>
          <input
            name="birth"
            id="birth"
            type="date"
            value={signUpForm.birth}
            placeholder="[선택]생년월일"
            onChange={onChange}
            className={style.signInput}
          />
        </div>
        <div className={style.select}>
          <input
            name="gender"
            id="male"
            type="radio"
            value="true"
            onChange={onChange}
            className={style.radioInput}
          />
          <label htmlFor="male" className={style.radioLabel}>
            남
          </label>
          <input
            name="gender"
            id="female"
            type="radio"
            value="false"
            onChange={onChange}
            className={style.radioInput}
          />
          <label htmlFor="female" className={style.radioLabel}>
            여
          </label>
        </div>
        <br />
        <input type="submit" value="회원가입" className={style.signSubmit} />
      </form>
    </div>
  );
}

export default SignUp;
