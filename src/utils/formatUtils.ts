import {
  CalendarData,
  DashboardTableData,
  QuestionsData,
  QuestionsDataPayload,
  UserStatus,
} from "../interfaces/challenge";
import { ParticipationTableData } from "../interfaces/participation";
import { theme } from "../styles/theme";

const formatDateToString = (date: Date | null) => {
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } else return "";
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
      return formatDashboardDate(key);
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
const formatQuestionsRemoveEmpty = (
  questionsData: QuestionsData
): QuestionsDataPayload => {
  const removeEmptyStrings = (array: string[]): string[] => {
    return array.filter((item) => item.trim() !== "");
  };

  return {
    basicQuestions: removeEmptyStrings(questionsData.basicQuestions),
    specialQuestions: questionsData.specialQuestions.map((special) => ({
      ...special,
      keywordId: special.keywordId < 0 ? null : special.keywordId,
      questions: removeEmptyStrings(special.questions),
    })),
  };
};

// Question List 빈 string으로 4개 채우기
const formatQuestionsCreateEmpty = (questionsData: QuestionsData) => {
  const createEmptyStrings = (array: string[]): string[] => {
    return Array(4)
      .fill(null)
      .map((_, idx) => array[idx] || "");
  };

  return {
    basicQuestions: createEmptyStrings(questionsData.basicQuestions),
    specialQuestions: questionsData.specialQuestions.map((ques) => ({
      ...ques,
      questions: createEmptyStrings(ques.questions),
    })),
  };
};

const formatDashboardData = (data: UserStatus[]): DashboardTableData[] => {
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
      transformedUser[item.date] = getStatus(item.status); // 최종 객체에 상태 추가
    });

    return transformedUser; // 변환된 객체 반환
  });
};

const formatDashboardDate = (stringDate: string) => {
  const getDayOfWeek = (date: Date) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[date.getDay()];
  };

  const date = new Date(stringDate); // 날짜 문자열을 Date 객체로 변환
  const formattedDate = date.toLocaleDateString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  });
  const dayOfWeek = getDayOfWeek(date); // 요일 계산

  return `${formattedDate} ${dayOfWeek}`;
};

const formatMainCalendarData = (data: UserStatus[]): CalendarData[] => {
  // 결과를 저장할 배열 초기화
  const result: CalendarData[] = [];

  // 각 사용자에 대해 반복
  data.forEach((user) => {
    user.statusList.forEach(({ date, status }) => {
      // 해당 날짜의 객체가 이미 존재하는지 확인
      let dateEntry = result.find((entry) => entry.date === date);

      // 존재하지 않으면 새로운 객체를 배열에 추가
      if (!dateEntry) {
        dateEntry = { date: date, participationCnt: 0 };
        result.push(dateEntry);
      }

      // status가 1이나 0인 경우 participationCnt 증가
      if (status === 1 || status === 0) {
        dateEntry.participationCnt += 1;
      }
    });
  });

  return result;
};

const formatParticipationInfoData = (data: ParticipationTableData[]) => {
  return data.map(
    ({
      bank,
      accountNum,
      email,
      deposit,
      writingCnt,
      commentCnt,
      smallTalkCnt,
      oneLine,
      ...rest
    }) => ({
      ...rest,
      accountNum: bank ? `${bank} ${accountNum}` : `${accountNum}`,
      email,
      deposit,
      writingCnt,
      commentCnt,
      smallTalkCnt,
      oneLine,
    })
  );
};

const isValidEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email);
};

export {
  formatDateToString,
  formatStringToDate,
  fieldTranslations,
  tableCellColor,
  formatQuestionsRemoveEmpty,
  formatQuestionsCreateEmpty,
  formatDashboardData,
  formatDashboardDate,
  formatMainCalendarData,
  formatParticipationInfoData,
  isValidEmail,
};
