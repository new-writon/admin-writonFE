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
  keywordId: number;
  keyword: string;
  questions: string[];
}

export interface QuestionsData {
  basicQuestions: string[];
  specialQuestions: SpecialQuestion[];
}

export interface SpecialQuestionPayload {
  keywordId: number | null;
  keyword: string;
  questions: string[];
}

export interface QuestionsDataPayload {
  basicQuestions: string[];
  specialQuestions: SpecialQuestionPayload[];
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

export interface CalendarData {
  date: string;
  participationCnt: number;
}

export interface MainCalendarProps {
  calendarData: CalendarData[];
  totalCnt: number;
  style?: React.CSSProperties;
}

// ========== API Interface ==========
export interface PostChallengeCreateAPIParams
  extends BasicInfoData,
    QuestionsDataPayload {
  emailList: string[];
}
