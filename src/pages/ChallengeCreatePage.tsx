import { useContext, useState } from "react";
import { Categories, Modal } from "../components/molecules";
import {
  BasicInfo,
  CompleteOrg,
  Frame,
  Participate,
  Questions,
} from "../components/organisms";
import { Button, FlexBox, Line } from "../components/atoms";
import { ScrollContext } from "../states/FrameContext";
import { BasicInfoData, QuestionsData } from "../interfaces/challenge";
import { formatDateToString, formatQuestions } from "../utils/formatUtils";
import { useMutation } from "@tanstack/react-query";
import { postChallengeCreateAPI } from "../apis/challengeAPI";
import useChallengeStore from "../states/ChallengeStore";

const buttonText = {
  empty: ["", "이전", "이전", "이전"],
  dark: [
    "완료하고 넘어가기",
    "완료하고 넘어가기",
    "참여자 초대 완료하기",
    "챌린지 개설 완료",
  ],
};

const categoryList = [
  "1. 챌린지 기본 정보 입력",
  "2. 챌린지 질문 입력",
  "3. 참여자 정보 입력",
  "4. 최종 확인",
];

const ChallengeCreatePage = () => {
  const scrollToTop = useContext(ScrollContext);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { setChallengeId, setChallengeList } = useChallengeStore();

  const [basicInfoData, setBasicInfoData] = useState<BasicInfoData>({
    name: "",
    startDate: formatDateToString(new Date()),
    endDate: formatDateToString(new Date()),
    dates: ["2024-08-17", "2024-08-19", "2024-08-20"],
  });
  const [questionsData, setQuestionsData] = useState<QuestionsData>({
    basicQuestions: ["", "", "", ""],
    specialQuestions: [],
  });
  const [emailList, setEmailList] = useState<string[]>([]);

  const movePage = (path: -1 | 1) => {
    setSelectedCategory((prev) => prev + path);
    scrollToTop();
  };

  const completeStep1 = () => {
    if (
      basicInfoData.name &&
      basicInfoData.startDate &&
      basicInfoData.endDate &&
      basicInfoData.dates.length != 0
    ) {
      movePage(1);
    } else {
      alert("입력값을 모두 입력하세요.");
    }
  };
  const completeStep2 = () => {
    if (
      questionsData.basicQuestions[0] &&
      questionsData.specialQuestions.some((item) => item.questions[0] != "")
    ) {
      movePage(1);
    } else {
      alert("필수 입력값을 모두 입력하세요.");
    }
  };
  const completeStep3 = () => {
    if (emailList.length == 0) {
      const checked = confirm(
        "이메일을 입력하지 않았습니다. 참여자 초대를 건너뛰시겠습니까?"
      );
      if (checked) movePage(1);
    } else {
      movePage(1);
    }
  };

  const { mutate: handleCreateChallenge } = useMutation({
    mutationFn: () =>
      postChallengeCreateAPI({
        ...basicInfoData,
        ...formatQuestions(questionsData),
        emailList,
      }),
    onSuccess: (data) => {
      // Challenge Dropdown List 변경
      const { challengeResponseList: list } = data;
      setChallengeList(list);
      setChallengeId(list[list.length - 1].id);

      // Modal Open
      setIsOpenModal(true);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const buttonFn = [
    completeStep1,
    completeStep2,
    completeStep3,
    handleCreateChallenge,
  ];

  return (
    <Frame
      title="챌린지 개설"
      subTitle="챌린지 개설 관련 설명 글이 들어갑니다. 챌린지를 개설 관련 설명 글이 들어갑니다. 챌린지를 개설 관련 설명 글이 들어갑니다."
      hasDropdown={false}
      noLine
    >
      <FlexBox col fullWidth gap={60}>
        {/* ========== Categories ========== */}
        <Categories
          list={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isClickDisabled
        />

        {/* ========== Contents ========== */}
        {selectedCategory == 0 && (
          <BasicInfo
            isEdit
            gap={50}
            data={basicInfoData}
            setData={setBasicInfoData}
          />
        )}
        {selectedCategory == 1 && (
          <Questions
            isEdit
            gap={50}
            data={questionsData}
            setData={setQuestionsData}
          />
        )}
        {selectedCategory == 2 && (
          <Participate
            isEdit
            gap={50}
            isEditBtn={false}
            emailList={[]}
            pendingEmailList={emailList}
            setPendingEmailList={setEmailList}
          />
        )}
        {selectedCategory == 3 && (
          <FlexBox fullWidth col gap={50}>
            <BasicInfo gap={50} data={basicInfoData} />
            <Line />
            <Questions gap={50} data={questionsData} />
            <Line />
            <Participate gap={50} emailList={emailList} isPending />
          </FlexBox>
        )}

        {/* ========== Buttons ========== */}
        <FlexBox fullWidth justify="center" align="center" gap={12}>
          {selectedCategory !== 0 && (
            <Button type="empty" size="lg" onClick={() => movePage(-1)}>
              {buttonText.empty[selectedCategory]}
            </Button>
          )}
          <Button type="dark" size="lg" onClick={buttonFn[selectedCategory]}>
            {buttonText.dark[selectedCategory]}
          </Button>
          {selectedCategory === 2 && (
            <Button
              type="none"
              size="lg"
              rightArrow
              onClick={() => movePage(1)}
            >
              참여자 초대 건너뛰기
            </Button>
          )}
        </FlexBox>
      </FlexBox>
      {isOpenModal && (
        <Modal setIsOpenModal={setIsOpenModal} isClickDisabled>
          <FlexBox col gap={20} align="center">
            <CompleteOrg isChallenge />
          </FlexBox>
        </Modal>
      )}
    </Frame>
  );
};

export default ChallengeCreatePage;
