import { Axios } from "./Axios";

interface PostChallengeCreateAPIParams {
  name: string;
  startDate: string;
  endDate: string;
  dates: string[];
  basicQuestions: string[];
  specialQuestions: { keyword: string; questions: string[] }[];
  emailList: string[];
}

// 챌린지 개설 API
export const postChallengeCreateAPI = async (
  requestDto: PostChallengeCreateAPIParams
) => {
  try {
    const {
      data: { data },
    } = await Axios.post("/challenge", requestDto);

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