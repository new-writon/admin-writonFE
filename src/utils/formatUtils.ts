import { theme } from "../styles/theme";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
const fieldTranslations = (key: string) => {
  switch (key) {
    case "name":
      return "이름";
    case "nickname":
      return "닉네임";
    case "challengeCnt":
      return "참여한 챌린지 수";
    case "challenges":
      return "참여 챌린지";
    case "startDate":
      return "챌린지 시작 날짜";
    case "position":
      return "포지션";
    case "teamName":
      return "팀명";
    case "joinDate":
      return "합류 날짜";
    case "accountNum":
      return "계좌번호";
    case "email":
      return "이메일";
    case "deposit":
      return "보증금";
    case "writingCnt":
      return "작성 글 수";
    case "commentCnt":
      return "댓글 수";
    case "smallTalkCnt":
      return "스몰톡 투척 횟수";
    case "oneLine":
      return "한 줄 소개";
    default:
      return key;
  }
};

const tableCellColor = (value: string) => {
  switch (value) {
    case "참여":
      return theme.color.green[50];
    case "미참여":
      return theme.color.red[60];
    default:
      return theme.color.gray[80];
  }
};

export { formatDate, fieldTranslations, tableCellColor };
