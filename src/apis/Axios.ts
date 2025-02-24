import axios from "axios";
import useChallengeStore from "../states/ChallengeStore";

// const baseURL = "http://localhost:8080";
const baseURL = "https://admin.writon.co.kr";

// challengeId param값으로 넣지 않을 API URL
const excludedParamsUrl = [
  "/auth/login",
  "/auth/reissue",
  "/auth/logout",
  "/organization",
  "/organization/info",
  "/organization/position",
  "/challenge",
];

const excludedTokenUrl = ["/auth/login"];

// axios 기본설정
export const Axios = axios.create({
  baseURL,
  timeout: 60 * 60 * 1000, // 1시간 (이메일 전송시간 오래걸림)
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    // Token Header 설정
    const token = localStorage.getItem("accessToken");
    if (token && !excludedTokenUrl.includes(config.url || "")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ChallengeId Param 설정
    const { challengeId } = useChallengeStore.getState();

    if (challengeId && !excludedParamsUrl.includes(config.url || "")) {
      config.params = {
        ...config.params,
        challengeId,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 오류 인터셉트 설정
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const customStatusCode = error.response.data.code;

    switch (customStatusCode) {
      // =============== Auth Error ===============
      case "A03": {
        alert(error.response.data.message);
        window.location.href = "/login";
        break;
      }
      case "A04": {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const accessToken = localStorage.getItem("accessToken");

          const response = await Axios.post("/auth/reissue", {
            accessToken,
            refreshToken,
          });

          // 새로운 Access Token 저장
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          Axios(originalRequest);
        } catch (error: any) {
          if (error.response) {
            console.error("Server Error:", error.response.data);
          } else {
            console.error("Error creating question:", error.message);
          }
        }
        break;
      }
      case "A05": {
        alert(error.response.data.message);
        window.location.href = "/login";
        break;
      }

      // =============== Participation Error ===============
      case "P01": {
        alert(error.response.data.message);
        break;
      }
      default:
        console.error("알 수 없는 상태 코드: ", customStatusCode);
    }
    return Promise.reject(error);
  }
);
