import axios from "axios";
import useChallengeStore from "../states/ChallengeStore";
import useOrganizationStore from "../states/OrganizationStore";
import { errorMsg } from "../utils/errorUtils";
import useAuthStore from "../states/AuthStore";

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

let isTokenHandled = false;

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

      case "A05":     // ACCESS_TOKEN_NOT_FOUND
      case "A06":     // REFRESH_TOKEN_EXPIRATION
      case "A07": {   // REFRESH_TOKEN_INCONSISTENCY
        if (!isTokenHandled) {     // 중복 에러 처리 방지
          isTokenHandled = true;

          const { reset: challengeReset } = useChallengeStore.getState();
          const { reset: organizationReset } = useOrganizationStore.getState();
          
          if (requestURL !== "/auth/check") {
            alert(errorMsg[customStatusCode]);
            challengeReset();
            organizationReset();
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
        console.error("알 수 없는 상태 코드: ", customStatusCode);
    }

    return Promise.reject(error);
  }
);
