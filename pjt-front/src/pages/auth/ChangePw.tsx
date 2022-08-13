import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

// 회원정보 변경에서만 쓰여야 할 것 같은 비밀번호 변경 컴포넌트
// 비밀번호 찾기 다음에 이동하는 페이지로도 쓰여야되고

function ChangePw(): JSX.Element {
  const navigate = useNavigate();
  const [pw, setPw] = useState<string>("");
  const [id, setId] = useState<string>("");

  const onChangePw = (e: any) => {
    setPw(e.target.value);
  };

  const onChangeId = (e: any) => {
    setId(e.target.value);
  };

  useEffect(() => {}, [pw]);

  const changePw = async () => {
    // const response = await api.auth.changePassword(pw);
  };

  return <div></div>;
}

export default ChangePw;
