import axios from "axios";

const baseURL = "https://api.writon.co.kr";

// axios 기본설정
export const Axios = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
});

// 오류 인터셉트 설정
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const customStatusCode = error.response.data.code;
    switch (customStatusCode) {
      case "A01": {
        break;
      }
      default:
        console.error("알 수 없는 상태 코드: ", customStatusCode);
    }
    return Promise.reject(error);
  }
);
