import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setCookie } from "./../../cookie";

interface Props {
  getUserData: Function;
}

function OnSocialLogin({ getUserData }: Props) {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCookie("refresh_token", params.params || "");
    getUserData(params.params || "");
    navigate("/");
  }, []);

  return <div></div>;
}

export default OnSocialLogin;
