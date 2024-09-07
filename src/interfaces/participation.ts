export interface ParticipationTableData {
  id: number;
  withdrawn: boolean;
  nickname: string;
  challengeCnt: number;
  challenges: string; // 추후 변경 예정
  startDate: string;
  position: string;
  teamName: string;
  joinDate: string;
  bank?: string;
  accountNum: string;
  email: string;
  deposit: number;
  writingCnt: number;
  commentCnt: number;
  smallTalkCnt: number;
  oneLine: string;
}
