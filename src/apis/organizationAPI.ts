import {
  PostOrganizationAPI,
  PostOrganizationAPIParams,
} from "../interfaces/organization";
import { Axios } from "./Axios";

// 조직 개설 API
export const postOrganizationAPI = async (
  file: File | null,
  createRequestDto: PostOrganizationAPIParams
): Promise<PostOrganizationAPI> => {
  try {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append(
      "createRequestDto",
      new Blob([JSON.stringify(createRequestDto)], { type: "application/json" })
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
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("Error creating question:", error.message);
    }
    throw error;
  }
};
