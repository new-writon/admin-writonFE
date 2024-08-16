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
