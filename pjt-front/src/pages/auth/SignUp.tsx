import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import { SignUpData } from "../../api/apiInterface";
import { signupDefaultData } from "../../defaultData";
import { User } from "../../Interface";
import { loadingActions } from "../../store";
import { Term1, Term2 } from "./authTerms";

import style from "./SignUp.module.css";

const EMAIL_CHECK = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_VALIDATION =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;

function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signUpForm, setSignUpForm] = useState<SignUpData>(signupDefaultData);
  const [checkEmail, setCheckEmail] = useState<boolean | string>(false);
  const [checkNickname, setCheckNickname] = useState<boolean | string>(false);
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );
  const [userInput, setUserInput] = useState<string>("");
  const [ce, setCe] = useState<string>("");
  const [pass, setPass] = useState<boolean>(false);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setSignUpForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const checkEmailButton = async () => {
    if (EMAIL_CHECK.test(signUpForm.id)) {
      dispatch(loadingActions.toggle());
      try {
        const emailCheck = await api.auth.checkEmail(signUpForm.id);

        if (!emailCheck.data) {
          alert("이미 사용중인 이메일입니다.");
          setCheckEmail(false);
        } else {
          setCheckEmail(signUpForm.id);
          const response = await api.auth.email(signUpForm.id);
          setCe(response.data);
        }

        dispatch(loadingActions.toggle());
      } catch (err) {
        dispatch(loadingActions.toggle());
        console.error(err);
      }
    } else {
      alert("이메일 형식이 아닙니다!");
    }
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserInput(value);
  };

  const onCheckEmail = () => {
    if (String(ce) === userInput) {
      setPass(true);
      alert("인증이 완료되었습니다.");
    } else {
      alert("인증 코드가 다릅니다.");
    }
  };

  const checkNicknameButton = async () => {
    if (signUpForm.nickname.length < 2) {
      alert("두 글자 이상 입력해주세요");
    } else {
      try {
        dispatch(loadingActions.toggle());
        const nicknameCheck = await api.auth.checkNickname(signUpForm.nickname);
        dispatch(loadingActions.toggle());

        if (!nicknameCheck.data) {
          alert("중복 닉네임입니다.");
          setCheckNickname(false);
        } else {
          setCheckNickname(signUpForm.nickname);
        }
      } catch (err) {
        dispatch(loadingActions.toggle());
        console.error(err);
      }
    }
  };

  const signupRequest = async () => {
    try {
      dispatch(loadingActions.toggle());

      const response = await api.auth.signup(signUpForm);
      setCe(response.data);

      dispatch(loadingActions.toggle());
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다.");
        navigate("/auth/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (err) {
      dispatch(loadingActions.toggle());
      console.error(err);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (signUpForm.pw1 === signUpForm.pw2) {
      try {
        signupRequest();
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  // checkBox
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [infoCheck, setInfoCheck] = useState(false);

  const allCheckEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setUseCheck(true);
      setInfoCheck(true);
    } else {
      setAllCheck(false);
      setUseCheck(false);
      setInfoCheck(false);
    }
  };

  const useCheckEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const infoCheckEvent = () => {
    if (infoCheck === false) {
      setInfoCheck(true);
    } else {
      setInfoCheck(false);
    }
  };

  useEffect(() => {
    if (useCheck === true && infoCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [useCheck, infoCheck]);

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
    if (!!userObject) {
      navigate("/");
    }
  }, [navigate, userObject]);

  return (
    <div className={style.signUp}>
      <div className={style.container}>
        <div className={style.title}>약관 동의</div>

        <ul className={style.joinBox}>
          <li className={`${style.checkBox} ${style.check01}`}>
            <ul className={style.clearfix}>
              <li>이용약관, 개인정보 수집 및 이용에 모두 동의합니다.</li>
              <li className={style.checkAllBtn}>
                <input
                  type="checkbox"
                  name="chkAll"
                  id="chk"
                  className={style.chkAll}
                  checked={allCheck}
                  onChange={allCheckEvent}
                />
              </li>
            </ul>
          </li>
          <li className={`${style.checkBox} ${style.check02}`}>
            <ul className={style.clearfix}>
              <li>이용약관 동의(필수)</li>
              <li className={style.checkBtn}>
                <input
                  type="checkbox"
                  name="chk"
                  checked={useCheck}
                  onChange={useCheckEvent}
                />
              </li>
            </ul>
            <Term1 />
          </li>
          <li className={`${style.checkBox} ${style.check03}`}>
            <ul className={style.clearfix}>
              <li>개인정보 수집 및 이용에 대한 안내(필수)</li>
              <li className={style.checkAllBtn}>
                <input
                  type="checkbox"
                  name="chk"
                  checked={infoCheck}
                  onChange={infoCheckEvent}
                />
              </li>
            </ul>
            <Term2 />
          </li>
        </ul>
        {}
      </div>
      <div className={style.container}>
        <div className={style.title}>회원가입</div>

        <form onSubmit={onSubmit}>
          <div className={style.inputContainer}>
            <div className={style.idContainer}>
              <input
                name="id"
                id="id"
                type="email"
                value={signUpForm.id}
                onChange={onChange}
                required
                className={style.signInput}
                disabled={!!ce}
              />
              <label htmlFor="id">[필수]아이디 </label>
              <button
                type="button"
                onClick={checkEmailButton}
                className={style.btn}
                disabled={pass}
              >
                <span>이메일 인증</span>
              </button>
              <div className={style.bar}></div>
            </div>
          </div>
          {ce && !pass && (
            <div className={style.inputContainer}>
              <div className={style.idContainer}>
                <input
                  name="emailCheck"
                  id="emailCheck"
                  type="text"
                  value={userInput}
                  onChange={onEmailChange}
                  required
                  className={style.signInput}
                />
                <label htmlFor="emailCheck">인증번호를 입력해주세요 </label>
                <button
                  onClick={onCheckEmail}
                  type="button"
                  className={style.btn}
                >
                  <span>확인</span>
                </button>

                <div className={style.bar}></div>
              </div>
            </div>
          )}
          <div className={style.inputContainer}>
            <input
              name="pw1"
              id="password"
              type="password"
              value={signUpForm.pw1}
              onChange={onChange}
              required
              className={style.signInput}
            />
            <label htmlFor="password">[필수]비밀번호</label>
            <div className={style.bar}></div>
          </div>
          <div className={style.inputContainer}>
            <input
              name="pw2"
              id="password2"
              type="password"
              value={signUpForm.pw2}
              onChange={onChange}
              required
              className={style.signInput}
            />
            <label htmlFor="password2">[필수]비밀번호 확인</label>
            <div className={style.bar}></div>
          </div>
          {!PASSWORD_VALIDATION.test(signUpForm.pw1) && (
            <p className={style.smallText}>
              비밀번호는 8자 이상 문자와 숫자, 특수문자의 조합이어야합니다.
            </p>
          )}
          {PASSWORD_VALIDATION.test(signUpForm.pw1) &&
            signUpForm.pw1 !== signUpForm.pw2 && (
              <p className={style.smallText}>비밀번호가 다릅니다.</p>
            )}
          {PASSWORD_VALIDATION.test(signUpForm.pw1) &&
            signUpForm.pw1 === signUpForm.pw2 && (
              <p className={style.smallText}>비밀번호가 같습니다.</p>
            )}
          <div className={style.inputContainer}>
            <div className={style.idContainer}>
              <input
                name="nickname"
                id="nickname"
                type="text"
                value={signUpForm.nickname}
                onChange={onChange}
                required
                className={style.signInput}
              />
              <label htmlFor="nickname">[필수]닉네임</label>
              <div className={style.bar}></div>
              <button
                type="button"
                onClick={checkNicknameButton}
                className={style.btn}
              >
                중복확인
              </button>
            </div>
          </div>
          {checkNickname && <p className={style.smallText}>사용가능합니다.</p>}
          <div className={style.inputContainer}>
            <input
              name="birth"
              id="birth"
              type="date"
              value={signUpForm.birth}
              onChange={onChange}
              className={style.signInput}
            />
            <label htmlFor="birth" className={style.labelUp}>
              [선택]생년월일
            </label>
            <div className={style.bar}></div>
          </div>
          <div className={style.radio}>
            <div className={style.radioBtn}>
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
            </div>
            <div className={style.radioBtn}>
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
          </div>
          <div className={style.buttonContainer}>
            <button
              type="button"
              className={
                checkEmail &&
                checkNickname &&
                !!signUpForm.pw1 &&
                signUpForm.pw1 === signUpForm.pw2 &&
                useCheck === true &&
                infoCheck === true
                  ? style.buttonActive
                  : style.buttonDisabled
              }
            >
              <input
                disabled={
                  !(pass && checkNickname) &&
                  PASSWORD_VALIDATION.test(signUpForm.pw1) &&
                  signUpForm.pw1 === signUpForm.pw2
                }
                type="submit"
                value="회원가입"
                onClick={onSubmit}
                className={style.signSubmit}
                tabIndex={-1}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
