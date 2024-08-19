import axios from "axios";
import useChallengeStore from "../states/ChallengeStore";

const baseURL = "http://localhost:8080";
// const baseURL = "https://api.writon.co.kr";

// challengeId param값으로 넣지 않을 API URL
const excludedUrl = [
  "/auth/reissue",
  "/auth/logout",
  "/organization/info",
  "/organization/position",
  "/challenge",
];

// axios 기본설정
export const Axios = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    // Token Header 설정
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ChallengeId Param 설정
    const { challengeId } = useChallengeStore.getState();

    if (challengeId && !excludedUrl.includes(config.url || "")) {
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
    const customStatusCode = error.response.data.code;
    switch (customStatusCode) {
      case "A01": {
        alert("로그인 세션이 만료되었습니다.");
        window.location.href = "/login";
        console.error("토큰 만료", customStatusCode);
        break;
      }
      default:
        console.error("알 수 없는 상태 코드: ", customStatusCode);
    }
    return Promise.reject(error);
  }
);
