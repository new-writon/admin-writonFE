import { useState } from "react";
import { Categories, Modal } from "../components/molecules";
import {
  BasicInfo,
  CompleteOrg,
  Frame,
  Participate,
  Questions,
} from "../components/organisms";
import { Button, FlexBox, Line } from "../components/atoms";
import { ScrollToTopFn } from "../utils/ScrollToTop";

const buttonText = {
  empty: ["", "이전", "이전", "이전"],
  dark: [
    "완료하고 넘어가기",
    "완료하고 넘어가기",
    "참여자 초대 완료하기",
    "챌린지 개설 완료",
  ],
};

const ChallengeCreatePage = () => {
  const categoryList = [
    "1. 챌린지 기본 정보 입력",
    "2. 챌린지 질문 입력",
    "3. 참여자 정보 입력",
    "4. 최종 확인",
  ];
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const movePage = (path: -1 | 1) => {
    setSelectedCategory((prev) => prev + path);
    ScrollToTopFn();
  };

  const completeStep1 = () => {
    movePage(1);
  };
  const completeStep2 = () => {
    movePage(1);
  };
  const completeStep3 = () => {
    movePage(1);
  };

  const buttonFn = [
    completeStep1,
    completeStep2,
    completeStep3,
    () => setIsOpenModal(true),
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
        {selectedCategory == 0 && <BasicInfo isEdit gap={50} />}
        {selectedCategory == 1 && <Questions isEdit gap={50} />}
        {selectedCategory == 2 && (
          <Participate isEdit gap={50} isEditBtn={false} />
        )}
        {selectedCategory == 3 && (
          <FlexBox fullWidth col gap={50}>
            <BasicInfo gap={50} />
            <Line />
            <Questions gap={50} />
            <Line />
            <Participate gap={50} />
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
