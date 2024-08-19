import {
  DashboardTableData,
  QuestionsData,
  UserStatus,
} from "../interfaces/challenge";
import { theme } from "../styles/theme";

const formatDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatStringToDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
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

// Question List 에서 빈 string 전부 제거
const formatQuestions = (questionsData: QuestionsData): QuestionsData => {
  const removeEmptyStrings = (array: string[]): string[] => {
    return array.filter((item) => item.trim() !== "");
  };

  return {
    basicQuestions: removeEmptyStrings(questionsData.basicQuestions),
    specialQuestions: questionsData.specialQuestions.map((special) => ({
      ...special,
      questions: removeEmptyStrings(special.questions),
    })),
  };
};

const formatDashboardData = (data: UserStatus[]): DashboardTableData[] => {
  const getDayOfWeek = (date: Date) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[date.getDay()];
  };

  const getStatus = (status: number) => {
    switch (status) {
      case 1:
        return "참여";
      case 0:
        return "늦참";
      case -1:
        return "미참여";
      default:
        return String(status);
    }
  };

  return data.map((user) => {
    // 변환된 데이터를 담을 객체
    const transformedUser: DashboardTableData = { name: user.name };

    // statusList를 순회하며 날짜와 상태를 변환
    user.statusList.forEach((item) => {
      const date = new Date(item.date); // 날짜 문자열을 Date 객체로 변환
      const formattedDate = date.toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
      });
      const dayOfWeek = getDayOfWeek(date); // 요일 계산
      const key = `${formattedDate} ${dayOfWeek}`; // 최종 키 생성

      transformedUser[key] = getStatus(item.status); // 최종 객체에 상태 추가
    });

    return transformedUser; // 변환된 객체 반환
  });
};

export {
  formatDateToString,
  formatStringToDate,
  fieldTranslations,
  tableCellColor,
  formatQuestions,
  formatDashboardData,
};
