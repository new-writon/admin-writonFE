import axios from "axios";
import useChallengeStore from "../states/ChallengeStore";
import useAuthStore from "../states/AuthStore";

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
    const requestURL = originalRequest.url;

    // prettier-ignore
    switch (customStatusCode) {
      case "A03": {     // UNAUTHORIZED_TOKEN
        alert(error.response.data.message);
        window.location.href = "/login";
        break;
      }

      // =============== Auth Error ===============
      case "A04": {    // ACCESS_TOKEN_EXPIRATION
        const {
          isReissuing,
          setIsReissuing,
          reissuePromise,
          setReissuePromise,
        } = useAuthStore.getState();

        try {
          if (!isReissuing) {
            // 재발급 시작
            setIsReissuing(true);
            const promise = Axios.post("/auth/reissue");
            setReissuePromise(promise);

            await promise;

            // 재발급 성공 시, 상태 초기화
            setIsReissuing(false);
            setReissuePromise(null);
          } else {
            // 이미 재발급 중이면 기다림
            await reissuePromise;
          }

          // 기존 API 재요청
          return Axios(originalRequest);

        } catch (error: any) {
          setIsReissuing(false);
          setReissuePromise(null);
          alert("reissue error");

          window.location.href = "/login";
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
