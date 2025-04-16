import styled from "styled-components";

interface FlexBox {
  children: React.ReactNode;
  as?: string;
  col?: boolean;
  gap?: number;
  justify?: string;
  align?: string;
  padding?: string;
  fullWidth?: boolean;
  isFlex1?: boolean;
  isFlexWrap?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
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
