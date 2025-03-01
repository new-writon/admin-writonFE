import {
  PatchOrganizationInfoAPIParams,
  PostOrganizationAPI,
  PostOrganizationAPIParams,
} from "../interfaces/organization";
import { Axios } from "./Axios";

// 조직 개설 API
export const postOrganizationAPI = async (
  file: File | null,
  createOrganizationRequestDto: PostOrganizationAPIParams
): Promise<PostOrganizationAPI> => {
  try {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append(
      "createOrganizationRequestDto",
      new Blob([JSON.stringify(createOrganizationRequestDto)], {
        type: "application/json",
      })
    );

    const {
      data: { data },
    } = await Axios.post("/organization", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;

    if (errorCode !== "A04") {
      console.error("Server Error:", error.response?.data || error.message);
    }

    throw error;
  }
};

// 조직 정보 수정 API
export const patchOrganizationInfoAPI = async (
  file: File | null,
  editOrganizationRequestDto: PatchOrganizationInfoAPIParams
) => {
  try {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append(
      "editOrganizationRequestDto",
      new Blob([JSON.stringify(editOrganizationRequestDto)], {
        type: "application/json",
      })
    );

    const {
      data: { data },
    } = await Axios.patch("/organization/info", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;

    if (errorCode !== "A04") {
      console.error("Server Error:", error.response?.data || error.message);
    }

    throw error;
  }
};

// 조직 온보딩 수정 API
export const patchOrganizationPositionAPI = async (
  positionList: string[]
): Promise<string[]> => {
  try {
    const {
      data: { data },
    } = await Axios.patch("/organization/position", positionList);

    return data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;

    if (errorCode !== "A04") {
      console.error("Server Error:", error.response?.data || error.message);
    }

    throw error;
  }
};

// 조직 포지션 목록 조회 API
export const getOrganizationPositionAPI = async (): Promise<string[]> => {
  try {
    const {
      data: { data },
    } = await Axios.get("/organization/position");

    return data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;

    if (errorCode !== "A04") {
      console.error("Server Error:", error.response?.data || error.message);
    }

    throw error;
  }
};
