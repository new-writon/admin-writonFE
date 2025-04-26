import Cookies from "js-cookie";

const removeAccessTokenExpireCookie = () => {
  Cookies.remove("access_token_expire");
};

const setAccessTokenExpireCookie = () => {
  // 토큰 쿠키 관리 로직
  const expirationTime = new Date(Date.now() + 62 * 60 * 1000); // 로그인하고서 1시간 2분 뒤 (실제 만료시간보다 여유시간 2분 추가해서 설정)

  removeAccessTokenExpireCookie();
  Cookies.set("access_token_expire", "valid_status", {
    expires: expirationTime,
  });
};

export { setAccessTokenExpireCookie, removeAccessTokenExpireCookie };
