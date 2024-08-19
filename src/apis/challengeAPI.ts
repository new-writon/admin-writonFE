import {
  BasicInfoData,
  PostChallengeCreateAPIParams,
  QuestionsData,
  UserStatus,
} from "../interfaces/challenge";
import { Axios } from "./Axios";

// 챌린지 개설 API
export const postChallengeAPI = async (
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

// 챌린지 참여현황 조회 API
export const getChallengeDashboardAPI = async (): Promise<UserStatus[]> => {
  try {
    const {
      data: { data },
    } = await Axios.get("/challenge/dashboard");

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

// 챌린지 기본정보 조회 API
export const getChallengeInfoAPI = async (): Promise<BasicInfoData> => {
  try {
    const {
      data: { data },
    } = await Axios.get("/challenge/info");

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

// 챌린지 질문 조회 API
export const getChallengeQuestionsAPI = async (): Promise<QuestionsData> => {
  try {
    const {
      data: { data },
    } = await Axios.get("/challenge/questions");

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

// 챌린지 기본정보 수정 API
export const putChallengeInfoAPI = async (
  requestDto: BasicInfoData
): Promise<BasicInfoData> => {
  try {
    const {
      data: { data },
    } = await Axios.put("/challenge/info", requestDto);

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

// 챌린지 질문 수정 API
export const putChallengeQuestionsAPI = async (
  requestDto: QuestionsData
): Promise<QuestionsData> => {
  try {
    const {
      data: { data },
    } = await Axios.put("/challenge/questions", requestDto);

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
