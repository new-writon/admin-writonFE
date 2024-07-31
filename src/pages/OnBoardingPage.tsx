import { useState } from "react";
import {
  Form,
  ManageOrgFirst,
  CreateOrg,
  CompleteOrg,
} from "../components/organisms";
import { ScrollToTopFn } from "../utils/ScrollToTop";

const OnBoardingPage = () => {
  const [step, setStep] = useState(1);

  const moveStep = (path: 1 | -1) => {
    ScrollToTopFn();
    setStep(step + path);
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
