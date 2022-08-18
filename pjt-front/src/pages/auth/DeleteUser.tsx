import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { userObjectActions } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { loadingActions } from "./../../store";
import api from "../../api/api";
import style from "./DeleteUser.module.css";

const DeleteUser = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const userEmail = params.email || "";
  const [userInput, setUserInput] = useState<string>("");
  const [ce, setCe] = useState<string>("");
  const [pass, setPass] = useState<boolean>(false);
  const [secondPass, setSecondPass] = useState<boolean>(false);

  const checkEmailButton = async () => {
    dispatch(loadingActions.toggle());
    try {
      const response = await api.auth.emailPw(userEmail);
      if (response.status === 200) {
        setCe(response.data);
        dispatch(loadingActions.toggle());
      }
    } catch (err) {
      console.error(err);
      alert("이메일 인증 시도를 실패했습니다.");
      dispatch(loadingActions.toggle());
    }
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserInput(value);
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

  const deleteCurrentUser = async () => {
    const response = await api.auth.deleteUser(userEmail, userInput);
    if (response.data === 1) {
      alert("회원탈퇴 되었습니다.");
      dispatch(userObjectActions.logout());
      navigate("/");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className={style.container}>
        <div className={style.title}>회원탈퇴</div>
        <form className={style.changePassword}>
          {!secondPass && (
            <div className={style.inputContainer}>
              <input
                type="email"
                name="email"
                id="email"
                value={userEmail}
                disabled={true}
                className={style.emailInput}
              />
              <label htmlFor="email">이메일</label>
              <div className={style.bar}></div>
              <button
                type="submit"
                onClick={checkEmailButton}
                disabled={pass}
                className={style.btnActive}
              >
                <span>이메일 인증</span>
              </button>
            </div>
          )}

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
            <div className="d-flex justify-content-center">
              <div className={style.inputContainer}>
                <button
                  type="submit"
                  onClick={deleteCurrentUser}
                  className={style.btnActive}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;
