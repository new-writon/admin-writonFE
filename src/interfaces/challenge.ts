export interface BasicInfoData {
  name: string;
  startDate: string;
  endDate: string;
  dates: string[];
}

export interface BasicInfo {
  isEdit?: boolean;
  gap?: number;
  data: BasicInfoData | undefined;
  setData?: React.Dispatch<React.SetStateAction<BasicInfoData>>;
}

export interface SpecialQuestion {
  keyword: string;
  questions: string[];
}

export interface QuestionsData {
  basicQuestions: string[];
  specialQuestions: SpecialQuestion[];
}

export interface Questions {
  gap: number;
  hasEditBtn?: boolean;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  data: QuestionsData;
  setData?: React.Dispatch<React.SetStateAction<QuestionsData>>;
}
