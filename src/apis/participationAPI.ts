import { ParticipationTableData } from "../interfaces/participation";
import { Axios } from "./Axios";

interface APIResponse {
  data: ParticipationTableData[];
}

// 참여자 정보 조회 API
export const getParticipationInfoAPI = async (): Promise<
  ParticipationTableData[]
> => {
  try {
    const {
      data: { data },
    } = await Axios.get<APIResponse>("/participation/info");

    return data.map(
      ({
        bank,
        accountNum,
        email,
        deposit,
        writingCnt,
        commentCnt,
        smallTalkCnt,
        oneLine,
        ...rest
      }) => ({
        ...rest,
        accountNum: bank ? `${bank} ${accountNum}` : `${accountNum}`,
        email,
        deposit,
        writingCnt,
        commentCnt,
        smallTalkCnt,
        oneLine,
      })
    );
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("Error creating question:", error.message);
    }
    throw error;
  }
};

// 이메일 목록 조회 API
export const getParticipationEmailAPI = async () => {
  try {
    const {
      data: { data },
    } = await Axios.get("/participation/email");

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

// 참여자 강퇴 API
export const postParticipationWithdrawalAPI = async (
  userChallengeIdList: number[]
) => {
  try {
    const {
      data: { data },
    } = await Axios.post("/participation/withdrawal", userChallengeIdList);
    console.log(data);
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

// 참여자 초대 API
export const postParticipationParticipateAPI = async (emailList: string[]) => {
  console.log(emailList);
  try {
    const {
      data: { data },
    } = await Axios.post("/participation/participate", emailList);

    console.log(data);
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
