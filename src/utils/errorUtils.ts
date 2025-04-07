const errorMsg: Record<string, string> = {
  A05: "토큰이 만료되었습니다. 다시 로그인 해주십시오.", // ACCESS_TOKEN_NOT_FOUND
  A06: "장시간 로그인 상태입니다. 다시 로그인 해주십시오.", // REFRESH_TOKEN_EXPIRATION
  A07: "잘못된 접근입니다. 다시 로그인 해주십시오.", // REFRESH_TOKEN_INCONSISTENCY
};

export { errorMsg };
