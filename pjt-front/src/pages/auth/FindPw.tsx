import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import style from "./FindPw.module.css";

function FindPw(): JSX.Element {
  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [ce, setCe] = useState<string>("");
  const [pass, setPass] = useState<boolean>(false);
  const [secondPass, setSecondPass] = useState<boolean>(false);
  const [onPasswordChange, setOnPasswordChange] = useState<string>("");

  const onChange = (e: any) => {
    setId(e.target.value);
  };

  useEffect(() => {}, [id, onPasswordChange]);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserInput(value);
  };

  const onCheckPw = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOnPasswordChange(value);
  };

  const checkEmailButton = async () => {
    const response = await api.auth.email(id);
    setCe(response.data);
  };

  const changePassword = async () => {
    const FormData = {
      userEmail: id,
      password: onPasswordChange,
    };
    const response = await api.auth.changePassword(id, FormData);
    if (response.status === 200) {
      alert("비밀번호가 변경되었습니다.");
      navigate("/auth/login");
    }
  };

  const onCheckEmail = () => {
    if (String(ce) === userInput) {
      setPass(true);
      setSecondPass(true);
      alert("인증이 완료되었습니다.");
    } else {
      alert("인증 코드가 다릅니다.");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className={style.container}>
        <div className={style.title}>비밀번호 찾기</div>
        <form className={style.changePassword}>
          <div className={style.inputContainer}>
            <input
              type="email"
              name="email"
              id="email"
              onChange={onChange}
              value={id}
              className={style.emailInput}
              required
            />
            <label htmlFor="email">이메일</label>
            <div className={style.bar}></div>
            <button
              type="submit"
              onClick={checkEmailButton}
              disabled={pass}
              className={style.btn}
            >
              <span>이메일 인증</span>
            </button>
          </div>

          <div className={style.inputContainer}>
            {ce && !pass && (
              <div>
                <div className={style.inputContainer}>
                  <input
                    name="emailCheck"
                    id="emailCheck"
                    type="text"
                    value={userInput}
                    onChange={onEmailChange}
                    className={style.emailInput}
                    required
                  />
                  <label htmlFor="emailCheck">인증번호를 입력해주세요. </label>
                  <div className={style.bar}></div>
                  <button
                    onClick={onCheckEmail}
                    type="button"
                    className={style.btn}
                  >
                    <span>확인</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          {secondPass && (
            <div className={style.inputContainer}>
              <input
                type="password"
                onChange={onCheckPw}
                value={onPasswordChange}
                className={style.emailInput}
                required
              />
              <label htmlFor="id">변경할 비밀번호를 입력해주세요. </label>
              <div className={style.bar}></div>

              <button
                onClick={changePassword}
                type="submit"
                className={style.btn}
              >
                <span>비밀번호 변경</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FindPw;
