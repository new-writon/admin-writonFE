import { ParticipationTableData } from "../interfaces/participation";
import { formatParticipationInfoData } from "../utils/formatUtils";
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

    return formatParticipationInfoData(data);
  } catch (error: any) {
    const errorCode = error.response?.data?.code;

    if (errorCode !== "A04") {
      console.error("Server Error:", error.response?.data || error.message);
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
    const errorCode = error.response?.data?.code;

    if (errorCode !== "A04") {
      console.error("Server Error:", error.response?.data || error.message);
    }

    throw error;
  }
};

// 참여자 강퇴 API
export const postParticipationWithdrawalAPI = async (
  userChallengeIdList: number[]
): Promise<ParticipationTableData[]> => {
  try {
    const {
      data: { data },
    } = await Axios.post<APIResponse>(
      "/participation/withdrawal",
      userChallengeIdList
    );

    return formatParticipationInfoData(data);
  } catch (error: any) {
    const errorCode = error.response?.data?.code;

    if (errorCode !== "A04") {
      console.error("Server Error:", error.response?.data || error.message);
    }

    throw error;
  }
};

// 참여자 초대 API
export const postParticipationParticipateAPI = async (emailList: string[]) => {
  try {
    const {
      data: { data },
    } = await Axios.post("/participation/participate", emailList);

    return data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;

    if (errorCode !== "A04") {
      console.error("Server Error:", error.response?.data || error.message);
    }

    throw error;
  }
};
