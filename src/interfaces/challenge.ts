export interface BasicInfoData {
  name: string;
  startDate: string;
  endDate: string;
  processDates: string[];
}

export interface BasicInfoProps {
  isEdit?: boolean;
  gap?: number;
  data: BasicInfoData;
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

export interface QuestionsProps {
  gap: number;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit?: () => void;
  data: QuestionsData;
  setData?: React.Dispatch<React.SetStateAction<QuestionsData>>;
  backupData?: QuestionsData;
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
