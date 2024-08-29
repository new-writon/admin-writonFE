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
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("Error creating question:", error.message);
    }
    throw error;
  }
};

// 로그아웃 API
export const postAuthLogoutAPI = async () => {
  try {
    await Axios.delete("/auth/logout");
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("Error creating question:", error.message);
    }
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
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("Error creating question:", error.message);
    }
    throw error;
  }
};
