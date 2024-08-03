interface ParticipationTableData {
  name: string;
  nickname: string;
  challengeCnt: number;
  challenges: string;
  startDate: string;
  position: string;
  teamName: string;
  joinDate: string;
  accountNum: number;
  email: string;
  deposit: number;
  writingCnt: number;
  commentCnt: number;
  smallTalkCnt: number;
  oneLine: string;
}

interface isParticipateTableData {
  name: string;
  [date: string]: string;
}

export type { ParticipationTableData, isParticipateTableData };
