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
    let access_token = new URL(window.location.href).searchParams.get(
      "refresh_token"
    );
    console.log(access_token);
    setCookie("refresh_token", params.params || "");
    /* eslint-disable */
    getUserData(params.params || "");
    navigate("/");
  }, [navigate]);

  return <div></div>;
}

export default OnSocialLogin;
