import { BasicInfoData, QuestionsData } from "../interfaces/challenge";
import { formatDateToString } from "../utils/formatUtils";

const recommendKeywords = ["성장", "목표", "갈등해결", "역량", "문화", "경험"];

const defaultBasicInfoData: BasicInfoData = {
  name: "",
  startDate: formatDateToString(new Date()),
  endDate: formatDateToString(new Date()),
  processDates: ["2024-08-29", "2024-08-30", "2024-08-31"],
};

const defaultQuestionsData: QuestionsData = {
  basicQuestions: ["", "", "", ""],
  specialQuestions: [],
};

export { recommendKeywords, defaultBasicInfoData, defaultQuestionsData };
