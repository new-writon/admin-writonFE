import Cookies from "js-cookie";

const removeAccessTokenExpireCookie = () => {
  Cookies.remove("access_token_expire");
};

const setAccessTokenExpireCookie = () => {
  // 토큰 쿠키 관리 로직
  const expirationTime = new Date(Date.now() + 1000 * 60 * 60); // 로그인하고서 1시간 뒤

  removeAccessTokenExpireCookie();
  Cookies.set("access_token_expire", "valid_status", {
    expires: expirationTime,
  });
};

export { setAccessTokenExpireCookie, removeAccessTokenExpireCookie };
