import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import style from "./ChangePw.module.css";
import { useDispatch } from "react-redux";
import { loadingActions } from "./../../store";

function ChangePw(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pw, setPw] = useState<string>("");
  const [checkPw, setCheckPw] = useState<boolean>(false);
  const [onPasswordChange, setOnPasswordChange] = useState<string>("");

  const params = useParams();
  const userEmail = params.email || "";

  const onChangePw = (e: any) => {
    setPw(e.target.value);
  };

  useEffect(() => {}, [pw]);

  const checkPassword = async () => {
    dispatch(loadingActions.toggle());
    try {
      const response = await api.auth.checkPassword(userEmail, pw);
      if (response.data === 1) {
        setCheckPw(true);
        alert("확인되었습니다.");
        dispatch(loadingActions.toggle());
      } else {
        alert("비밀번호가 틀립니다.");
        dispatch(loadingActions.toggle());
      }
    } catch (err) {
      console.error(err);
      alert("비밀번호 변경 시도를 실패했습니다.");
      dispatch(loadingActions.toggle());
    }
  };

  const onCheckPw = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOnPasswordChange(value);
  };

  const changePw = async () => {
    const FormData = {
      userEmail: userEmail,
      password: onPasswordChange,
    };
    const response = await api.auth.changePassword(userEmail, FormData);
    if (response.status === 200) {
      alert("비밀번호가 변경되었습니다.");
      navigate(`/profile/${userEmail}`);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className={style.container}>
        <div className={style.title}>비밀번호 변경</div>
        <form className={style.changePassword}>
          <div className={style.inputContainer}>
            <input
              type="password"
              onChange={onChangePw}
              value={pw}
              className={style.emailInput}
              required
            />
            <label htmlFor="password">현재 비밀번호확인</label>
            <div className={style.bar}></div>
            <button type="submit" onClick={checkPassword} className={style.btn}>
              <span>확인</span>
            </button>
          </div>
          {checkPw && (
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

              <button onClick={changePw} type="submit" className={style.btn}>
                <span>비밀번호 변경</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ChangePw;
