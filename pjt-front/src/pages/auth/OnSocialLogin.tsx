import { useEffect } from "react";

function OnSocialLogin() {
  useEffect(() => {
    let Token = new URL(window.location.href).searchParams.get("refreshToken");
    console.log(Token);
  }, []);

  return <div></div>;
}

export default OnSocialLogin;
