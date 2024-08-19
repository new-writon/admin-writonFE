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
  data: QuestionsData | undefined;
  setData?: React.Dispatch<React.SetStateAction<QuestionsData>>;
}

export interface DashboardTableData {
  name: string;
  [date: string]: string;
}

interface Status {
  date: string;
  status: number;
}

export interface UserStatus {
  name: string;
  statusList: Status[];
}

// ========== API Interface ==========
export interface PostChallengeCreateAPIParams
  extends BasicInfoData,
    QuestionsData {
  emailList: string[];
}
