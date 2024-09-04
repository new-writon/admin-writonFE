import styled from "styled-components";

const calculatePercentage = (participationCnt: number, totalCnt: number) =>
  Math.round((participationCnt / totalCnt) * 100);

const getColorByPercentage = (percentage: number) => {
  if (percentage < 30) return "red";
  if (percentage < 70) return "green";
  return "blue";
};

const getStylesByColor = (color: string) => {
  switch (color) {
    case "red":
      return {
        textColor: "#DA1E28",
        backgroundColor: "rgba(218, 30, 40, 0.06)",
      };
    case "green":
      return {
        textColor: "#198038",
        backgroundColor: "rgba(25, 128, 56, 0.06)",
      };
    case "blue":
    default:
      return {
        textColor: "#0F62FE",
        backgroundColor: "rgba(15, 98, 254, 0.06)",
      };
  }
};

const StatisticsBadge = ({
  participationCnt,
  totalCnt,
}: {
  participationCnt: number;
  totalCnt: number;
}) => {
  const percentage = calculatePercentage(participationCnt, totalCnt);
  const color = getColorByPercentage(percentage);
  const { textColor, backgroundColor } = getStylesByColor(color);

  return (
    <Container $backgroundColor={backgroundColor}>
      <MemberCount>
        {participationCnt}/{totalCnt}
        <span className="count">명</span>
      </MemberCount>
      <Percentage $textColor={textColor}>{percentage}%</Percentage>
    </Container>
  );
};

export default StatisticsBadge;

// Styled components
const Container = styled.div<{ $backgroundColor: string }>`
  display: flex;
  width: 80px;
  height: 80px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${({ $backgroundColor }) => $backgroundColor};
`;

const MemberCount = styled.span`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 160%;
  color: ${({ theme }) => theme.color.gray[80]};
  letter-spacing: 0.5px;
  .count {
    color: ${({ theme }) => theme.color.gray[80]};
    opacity: 0.8;
    font-size: 12px;
    font-weight: 500;
    line-height: 160%;
  }
`;

const Percentage = styled.span<{ $textColor: string }>`
  color: ${({ $textColor }) => $textColor};
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 130%;
`;
