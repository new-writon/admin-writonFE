import { useContext, useState } from "react";
import {
  Form,
  ManageOrg,
  CreateOrg,
  CompleteOrg,
} from "../components/organisms";
import { ScrollContext } from "../states/FrameContext";
import { PostOrganizationAPIParams } from "../interfaces/organization";
import { useMutation } from "@tanstack/react-query";
import { postOrganizationAPI } from "../apis";
import useOrganizationStore from "../states/OrganizationStore";

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

  const {
    setOrganizationId,
    setOrganizationName,
    setOrganizationLogo,
    setThemeColor,
  } = useOrganizationStore();

  const moveStep = (path: 1 | -1) => {
    setStep(step + path);
    scrollToTop();
  };

  const { mutate: handleCreateOrganization } = useMutation({
    mutationFn: () => postOrganizationAPI(file, createRequestDto),
    onSuccess: ({
      organizationId,
      organizationName,
      organizationLogo,
      themeColor,
    }) => {
      setOrganizationId(organizationId);
      setOrganizationName(organizationName);
      setOrganizationLogo(organizationLogo || null);
      setThemeColor(themeColor);
    },
    onError: (err) => {
      console.error(err);
    },
  });

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
