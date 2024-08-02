import styled from "styled-components";
import { FlexBox, Line } from "../atoms";
import { H2, B2 } from "../atoms/Text";
import { theme } from "../../styles/theme";
import { Dropdown } from "../molecules";
import { useState } from "react";

interface Frame {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
}

const Frame = ({ children, title, subTitle }: Frame) => {
  const [selectedChallenge, setSelectedChallenge] = useState("라이톤 챌린지");

  return (
    <Container>
      <FlexBox col gap={20} style={{ width: "900px" }}>
        {/*  ========== Header ==========  */}
        <FlexBox fullWidth justify="space-between">
          <FlexBox col gap={4}>
            <H2>{title}</H2>
            <B2 color={theme.color.gray[60]}>{subTitle}</B2>
          </FlexBox>
          <Dropdown
            list={["라이톤 챌린지", "렛츠인턴 챌린지", "어드민 챌린지"]}
            selectedItem={selectedChallenge}
            setSelectedItem={setSelectedChallenge}
          />
        </FlexBox>
        <Line />

        {/*  ========== Contents ==========  */}
        {children}
      </FlexBox>
    </Container>
  );
};

export default Frame;

const Container = styled.section`
  display: flex;
  justify-content: center;
  flex: 1;
  min-width: 980px;
  padding: 40px 0 200px 0;
  overflow-y: auto;
`;