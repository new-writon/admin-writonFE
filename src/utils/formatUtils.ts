const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const fieldTranslations: { [key: string]: string } = {
  name: "이름",
  nickname: "닉네임",
  challengeCnt: "참여한 챌린지 수",
  challenges: "참여 챌린지",
  startDate: "챌린지 시작 날짜",
  position: "포지션",
  teamName: "팀명",
  joinDate: "합류 날짜",
  accountNum: "계좌번호",
  email: "이메일",
  deposit: "보증금",
  writingCnt: "작성 글 수",
  commentCnt: "댓글 수",
  smallTalkCnt: "스몰톡 투척 횟수",
  oneLine: "한 줄 소개",
};

export { formatDate, fieldTranslations };
