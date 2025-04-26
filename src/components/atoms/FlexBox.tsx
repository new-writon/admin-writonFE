import styled from "styled-components";

interface FlexBox {
  children: React.ReactNode;    // FlexBox 내부 컴포넌트
  as?: string;                  // 시멘틱 코드를 위한 태그명 변경
  col?: boolean;                // flex-direction: column
  gap?: number;                 // gap: {number}px
  justify?: string;             // justify-content
  align?: string;               // align-items
  padding?: string;             // padding
  fullWidth?: boolean;          // width: 100%
  isFlex1?: boolean;            // flex: 1
  isFlexWrap?: boolean;         // flexWrap: wrap
  style?: React.CSSProperties;  // 기타 커스텀 스타일
  onClick?: () => void;         // 버튼 핸들러
}

const FlexBox = ({
  children,
  as = "div",
  col,
  gap,
  justify,
  align,
  padding,
  fullWidth,
  style,
  isFlex1,
  isFlexWrap,
  onClick,
}: FlexBox) => {
  return (
    <Container
      style={{
        flexDirection: col ? "column" : "row",
        gap: `${gap}px` || "0px",
        justifyContent: justify || "flex-start",
        alignItems: align || "flex-start",
        padding: padding || "0",
        width: fullWidth ? "100%" : "auto",
        flex: isFlex1 ? 1 : "none",
        flexWrap: isFlexWrap ? "wrap" : "nowrap",
        ...style,
      }}
      onClick={onClick}
      as={as}
    >
      {children}
    </Container>
  );
};

export default FlexBox;

const Container = styled.div`
  display: flex;
`;
