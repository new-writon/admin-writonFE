import styled from "styled-components";
import { FlexBox, Line } from "../atoms";
import { H2, B2 } from "../atoms/Text";
import { theme } from "../../styles/theme";
import { Dropdown } from "../molecules";
import useChallengeStore from "../../states/ChallengeStore";

interface Frame {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  noLine?: boolean;
  hasDropdown?: boolean;
}

const Frame = ({
  children,
  title,
  subTitle,
  noLine,
  hasDropdown = true,
}: Frame) => {
  const { challengeId, setChallengeId, challengeList } = useChallengeStore();

  return (
    <Container>
      <FlexBox col gap={20} style={{ width: "900px" }}>
        {/*  ========== Header ==========  */}
        <FlexBox fullWidth justify="space-between">
          <FlexBox col gap={4}>
            <H2>{title}</H2>
            <B2 color={theme.color.gray[60]}>{subTitle}</B2>
          </FlexBox>
          {hasDropdown && (
            <Dropdown
              list={challengeList}
              selectedItemId={challengeId}
              setSelectedItemId={setChallengeId}
            />
          )}
        </FlexBox>
        {!noLine && <Line />}

        {/*  ========== Contents ==========  */}
        {children}
      </FlexBox>
    </Container>
  );
};

export default Frame;

const Container = styled.section`
  height: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 980px;
  padding: 40px 0 100px 0;
`;
