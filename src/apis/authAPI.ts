import { Axios } from "./Axios";

// 로그인 API
export const postAuthLoginAPI = async (
  identifier: string,
  password: string
) => {
  try {
    const {
      data: { data },
    } = await Axios.post("/auth/login", {
      identifier,
      password,
    });

    return data;
  } catch (error: any) {
    const errorStatus = error.response?.status;

    if (errorStatus === 504) {
      alert(
        "서버와의 응답시간이 초과했습니다. \n해당 문제가 반복될 시 개발자에게 문의하세요."
      );
    }

    throw error;
  }
};

// 로그아웃 API
export const postAuthLogoutAPI = async () => {
  try {
    await Axios.delete("/auth/logout");
  } catch (error: any) {
    throw error;
  }
};

// 토큰 재발급 API
export const postAuthReissueAPI = async () => {
  try {
    const {
      data: {
        data: { accessToken, refreshToken },
      },
    } = await Axios.post("/auth/reissue");

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (error: any) {
    throw error;
  }
};

// 토큰 확인 API
export const getAuthCheckAPI = async () => {
  try {
    await Axios.get("/auth/check");
  } catch (error: any) {
    throw error;
  }
};
