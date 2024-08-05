import { useContext, useState } from "react";
import {
  Form,
  ManageOrgFirst,
  CreateOrg,
  CompleteOrg,
} from "../components/organisms";
import { ScrollContext } from "../states/FrameContext";

const OnBoardingPage = () => {
  const [step, setStep] = useState(1);
  const scrollToTop = useContext(ScrollContext);

  const moveStep = (path: 1 | -1) => {
    setStep(step + path);
    scrollToTop();
  };

  return (
    <Form contentsWidth={430} totalSteps={3} step={step}>
      {step == 1 && <CreateOrg moveStep={moveStep} />}
      {step == 2 && <ManageOrgFirst moveStep={moveStep} />}
      {step == 3 && <CompleteOrg />}
    </Form>
  );
};

export default OnBoardingPage;
