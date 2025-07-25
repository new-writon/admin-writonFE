import axios from "axios";
import useChallengeStore from "../states/ChallengeStore";
import { errorMsg } from "../utils/errorUtils";
import useAuthStore from "../states/AuthStore";
import {
  setAccessTokenExpireCookie,
  removeAccessTokenExpireCookie,
} from "../utils/cookieUtils";
import { Mutex } from "async-mutex";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:8080";
const baseURL = "https://admin.writon.co.kr";

// challengeId param값으로 넣지 않을 API URL
const excludedParamsUrl = [
  "/auth/login",
  "/auth/reissue",
  "/auth/logout",
  "/auth/check",
  "/organization",
  "/organization/info",
  "/organization/position",
  "/challenge",
];

const reissueMutex = new Mutex();

// axios 기본설정
export const Axios = axios.create({
  baseURL,
  timeout: 60 * 60 * 1000, // 1시간 (이메일 전송시간 오래걸림)
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
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
    const requestURL = originalRequest.url;

    // prettier-ignore
    switch (customStatusCode) {
      // =============== Auth Error ===============
      case "A03": {     // UNAUTHORIZED_TOKEN
        alert(error.response.data.message);
        window.location.href = "/login";
        break;
      }
      
      case "A04": {    // ACCESS_TOKEN_EXPIRATION
        try {
          // mutex를 획득한 요청만 이 블록 실행
          return await reissueMutex.runExclusive(async () => {
            const isValid = Cookies.get("access_token_expire");

            // 토큰이 여전히 만료 상태라면 재발급 요청
            if (!isValid) {
              await Axios.post("/auth/reissue");
              setAccessTokenExpireCookie();
            }

            // 기존 API 재요청
            return Axios(originalRequest);
          })
        } catch (error: any) {
          removeAccessTokenExpireCookie();
          alert("reissue error");
          window.location.href = "/login";
        }
        break;
      }

      case "A05":     // ACCESS_TOKEN_NOT_FOUND
      case "A06":     // REFRESH_TOKEN_EXPIRATION
      case "A07": {   // REFRESH_TOKEN_INCONSISTENCY
        const { isTokenHandled, setIsTokenHandled } = useAuthStore.getState();

        if (!isTokenHandled) {     // 중복 에러 처리 방지
          setIsTokenHandled(true);
          
          if (requestURL !== "/auth/check") {
            alert(errorMsg[customStatusCode]);
            removeAccessTokenExpireCookie();
          }

          window.location.href = "/login";
        }

        break;
      }

      // =============== Participation Error ===============
      case "P01": {   // EMAIL_DUPLICATION
        alert(error.response.data.message);
        break;
      }

      default: 
        console.error(error.response);
    }

    return Promise.reject(error);
  }
);
