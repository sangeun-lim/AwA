import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Error(): JSX.Element {
  const navigate = useNavigate();
  const [t, setT] = useState<number>(5);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  useEffect(() => {
    const id = setInterval(() => {
      setT((t) => t - 1);
      console.log(t);
    }, 1000);
    if (t === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [t]);

  return (
    <div>
      <h1>존재하지 않는 페이지 입니다.</h1>
      <p>{t}초 후 홈으로 이동합니다.</p>
    </div>
  );
}

export default Error;
