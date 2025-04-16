import { styled } from "styled-components";
import ScrollLock from "../../utils/ScrollLock";
import { FlexBox } from ".";
import { H4 } from "./Text";
import { theme } from "../../styles/theme";

interface Loading {
  text: string;
  hasBackdrop?: boolean;
}

const Loading = ({ text, hasBackdrop = true }: Loading) => (
  <LoadingWrapper $hasBackdrop={hasBackdrop}>
    <ScrollLock />
    <FlexBox col align="center" gap={12}>
      <SpinnerBlue />
      <H4 color={theme.color.gray[80]}>{text}</H4>
    </FlexBox>
  </LoadingWrapper>
);

export default Loading;

const LoadingWrapper = styled.div<{ $hasBackdrop: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ $hasBackdrop }) =>
    $hasBackdrop ? "rgba(0, 0, 0, 0.1)" : "transparent"};
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerBlue = styled.div`
  border: 4px solid transparent; /* Border color of the spinner */
  border-top: 4px solid ${({ theme }) => theme.color.brand[50]}; /* Color of the spinner */
  border-right: 4px solid ${({ theme }) => theme.color.brand[50]}; /* Color of the spinner */
  border-bottom: 4px solid ${({ theme }) => theme.color.brand[50]}; /* Color of the spinner */
  border-radius: 50%; /* Makes it a circle */
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite; /* Spinning animation */
`;
