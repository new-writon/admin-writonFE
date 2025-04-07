import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titleMap: { [key: string]: string } = {
  "/login": "로그인 | Writon Admin",
  "/onBoarding": "온보딩 | Writon Admin",
  "/challenge/create": "챌린지 개설 | Writon Admin",
  "/challenge/dashboard": "챌린지 참여 현황 | Writon Admin",
  "/challenge/info": "챌린지 정보 | Writon Admin",
  "/challenge/question": "챌린지 질문 관리 | Writon Admin",
  "/challenge/custom": "기능 커스텀 | Writon Admin",
  "/participation/info": "참여자 정보 | Writon Admin",
  "/participation/participate": "참여자 초대 | Writon Admin",
  "/organization/edit": "조직 정보 설정 | Writon Admin",
};

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const title = titleMap[path] || "Writon Admin";
    document.title = title;
  }, [location]);

  return null;
};

export default TitleManager;
