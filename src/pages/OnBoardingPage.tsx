import { useContext, useState } from "react";
import {
  Form,
  ManageOrg,
  CreateOrg,
  CompleteOrg,
} from "../components/organisms";
import { ScrollContext } from "../states/FrameContext";

const OnBoardingPage = () => {
  const [step, setStep] = useState(1);
  const scrollToTop = useContext(ScrollContext);

  const [createRequestDto, setCreateRequestDto] =
    useState<PostOrganizationAPIParams>({
      name: "", // 조직 이름
      themeColor: "brand", // 테마컬러
      positions: [], // 포지션
    });
  const [file, setFile] = useState<File | null>(null); // 조직 로고
  const moveStep = (path: 1 | -1) => {
    setStep(step + path);
    scrollToTop();
  };

  return (
    <Form contentsWidth={430} totalSteps={3} step={step}>
      {step == 1 && (
        <CreateOrg
          moveStep={moveStep}
          data={createRequestDto}
          setData={setCreateRequestDto}
          setFile={setFile}
        />
      )}
      {step == 2 && (
        <ManageOrg
          moveStep={moveStep}
          data={createRequestDto.positions}
          setData={setCreateRequestDto}
          handleCreate={handleCreateOrganization}
        />
      )}
      {step == 3 && <CompleteOrg />}
    </Form>
  );
};

export default OnBoardingPage;
