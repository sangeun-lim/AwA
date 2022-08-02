import React, { useEffect } from "react";
import { useState, Dispatch } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import { SignUpData } from "../../api/apiInterface";
import { signupDefaultData } from "../../defaultData";

import style from "./SignUp.module.css";

interface Props {
  isLoggedIn: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

function SignUp({ isLoggedIn, setIsLoading }: Props): JSX.Element {
  const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState<SignUpData>(signupDefaultData);
  const [checkEmail, setCheckEmail] = useState<boolean | string>(false);
  const [checkNickname, setCheckNickname] = useState<boolean | string>(false);

  const signupRequest = async () => {
    try {
      setIsLoading(true);

      const response = await api.auth.signup(signUpForm);

      setIsLoading(false);
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다.");
        navigate("/auth/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const checkEmailButton = async () => {
    setIsLoading(true);
    try {
      const emailCheck = await api.auth.checkEmail(signUpForm.id);

      setIsLoading(false);

      if (!emailCheck.data) {
        alert("이미 사용중인 이메일입니다.");
        setCheckEmail(false);
      } else {
        setCheckEmail(signUpForm.id);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const checkNicknameButton = async () => {
    setIsLoading(true);
    try {
      const nicknameCheck = await api.auth.checkNickname(signUpForm.nickname);
      setIsLoading(false);

      if (!nicknameCheck.data) {
        alert("중복 닉네임입니다.");
        setCheckNickname(false);
      } else {
        setCheckNickname(signUpForm.nickname);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

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
        signupRequest();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    if (checkEmail && signUpForm.id !== checkEmail) {
      setCheckEmail(false);
    }
  }, [checkEmail, signUpForm.id]);

  useEffect(() => {
    if (checkNickname && signUpForm.nickname !== checkNickname) {
      setCheckNickname(false);
    }
  }, [checkNickname, signUpForm.nickname]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="container d-flex justify-content-center">
      <div className={style.signup}>
        <div className={style.title}>Sign Up</div>

        <div className={style.signContainer}>
          <label htmlFor="id">아이디 </label>
          <div className={style.idContainer}>
            <input
              name="id"
              id="id"
              type="email"
              value={signUpForm.id}
              placeholder="[필수]아이디"
              onChange={onChange}
              required
              className={style.signInput}
            />
            <button onClick={checkEmailButton} className={style.btn}>
              중복확인
            </button>
          </div>
        </div>
        {checkEmail && <span>사용가능합니다.</span>}
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
        {signUpForm.pw1 && signUpForm.pw1 !== signUpForm.pw2 && (
          <span>비밀번호가 다릅니다.</span>
        )}
        {signUpForm.pw1 && signUpForm.pw1 === signUpForm.pw2 && (
          <span>비밀번호가 같습니다.</span>
        )}
        <div className={style.signContainer}>
          <label htmlFor="nickname">닉네임 </label>
          <div className={style.idContainer}>
            <input
              name="nickname"
              id="nickname"
              type="text"
              value={signUpForm.nickname}
              placeholder="[필수]닉네임"
              onChange={onChange}
              required
              className={style.signInput}
            />
            <button onClick={checkNicknameButton} className={style.btn}>
              중복확인
            </button>
          </div>
        </div>
        {checkNickname && <span>사용가능합니다.</span>}
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
        <input
          disabled={
            !(checkEmail && checkNickname) &&
            !!signUpForm.pw1 &&
            signUpForm.pw1 === signUpForm.pw2
          }
          type="submit"
          value="회원가입"
          onClick={onSubmit}
          className={
            checkEmail &&
            checkNickname &&
            !!signUpForm.pw1 &&
            signUpForm.pw1 === signUpForm.pw2
              ? style.signSubmit
              : style.signSubmitDisabled
          }
        />
      </div>
    </div>
  );
}

export default SignUp;
