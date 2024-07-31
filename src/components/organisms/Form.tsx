import styled from "styled-components";
import { FlexBox } from "../atoms";

interface Form {
  children: React.ReactNode;
  contentsWidth: number;
  isLoginForm?: boolean;
  totalSteps?: number;
  step?: number;
}

const Form = ({
  children,
  contentsWidth,
  isLoginForm = false,
  totalSteps,
  step,
}: Form) => {
  return (
    <Background>
      <Container $isLoginForm={isLoginForm}>
        <FormContainer
          as={isLoginForm ? "form" : "section"}
          style={{ maxWidth: contentsWidth }}
        >
          {totalSteps && (
            <FlexBox gap={5}>
              {Array(totalSteps)
                .fill(null)
                .map((_, idx) => (
                  <Dot key={idx} $isCurStep={step == idx + 1} />
                ))}
            </FlexBox>
          )}
          {children}
        </FormContainer>
      </Container>
    </Background>
  );
};

export default Form;

const Background = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 100px 0;
  background-color: ${({ theme }) => theme.color.gray[10]};
`;

const Container = styled.section<{ $isLoginForm: boolean }>`
  width: 95%;
  max-width: 690px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ $isLoginForm }) => ($isLoginForm ? "80px" : "60px")} 0 100px 0;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 14px 20px 0px rgba(33, 33, 33, 0.05);
`;

const FormContainer = styled.section`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const Dot = styled.div<{ $isCurStep: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme, $isCurStep }) =>
    $isCurStep ? theme.color.brand[50] : theme.color.gray[40]};
`;
