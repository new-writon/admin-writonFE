import { DefaultTheme, styled } from "styled-components";

interface TextProps {
  children: React.ReactNode; // 글자 텍스트
  color?: string; // 글자 색상
  style?: any; // 이외 스타일
  onClick?: () => void; // 클릭 이벤트
}

interface WeightTextProps extends TextProps {
  weight?: "r" | "m" | "sb" | "b"; // 글자 굵기 (regular, medium, semibold, bold)
}

interface FontProps {
  theme: DefaultTheme;
  $fontTheme: string;
}

const formatWeight = (weight: "r" | "m" | "sb" | "b") => {
  switch (weight) {
    case "r":
      return 400;
    case "m":
      return 500;
    case "sb":
      return 600;
    case "b":
      return 700;
    default:
      return;
  }
};

// Heading1
export const H1 = ({ children, color, style, onClick }: TextProps) => {
  return (
    <Text $fontTheme="h1" style={{ color: color, ...style }} onClick={onClick}>
      {children}
    </Text>
  );
};

// Heading2
export const H2 = ({ children, color, style, onClick }: TextProps) => {
  return (
    <Text $fontTheme="h2" style={{ color: color, ...style }} onClick={onClick}>
      {children}
    </Text>
  );
};

// Heading3
export const H3 = ({ children, color, style, onClick }: TextProps) => {
  return (
    <Text $fontTheme="h3" style={{ color: color, ...style }} onClick={onClick}>
      {children}
    </Text>
  );
};

// Heading4 (default: bold)
export const H4 = ({
  children,
  weight = "b",
  color,
  style,
  onClick,
}: WeightTextProps) => {
  return (
    <Text
      $fontTheme="h4"
      style={{ color: color, fontWeight: formatWeight(weight), ...style }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

// Body1 (default: medium)
export const B1 = ({
  children,
  weight = "m",
  color,
  style,
  onClick,
}: WeightTextProps) => {
  return (
    <Text
      $fontTheme="b1"
      style={{ color: color, fontWeight: formatWeight(weight), ...style }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

// Body2 (default: medium)
export const B2 = ({
  children,
  weight = "m",
  color,
  style,
  onClick,
}: WeightTextProps) => {
  return (
    <Text
      $fontTheme="b2"
      style={{ color: color, fontWeight: formatWeight(weight), ...style }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

// Caption1
export const C1 = ({ children, color, style, onClick }: TextProps) => {
  return (
    <Text $fontTheme="c1" style={{ color: color, ...style }} onClick={onClick}>
      {children}
    </Text>
  );
};

// Caption2
export const C2 = ({ children, color, style, onClick }: TextProps) => {
  return (
    <Text $fontTheme="c2" style={{ color: color, ...style }} onClick={onClick}>
      {children}
    </Text>
  );
};

// Label1
export const L1 = ({ children, color, style, onClick }: TextProps) => {
  return (
    <Text $fontTheme="l1" style={{ color: color, ...style }} onClick={onClick}>
      {children}
    </Text>
  );
};

// Label2 (default: medium)
export const L2 = ({
  children,
  weight = "m",
  color,
  style,
  onClick,
}: WeightTextProps) => {
  return (
    <Text
      $fontTheme="l2"
      style={{ color: color, fontWeight: formatWeight(weight), ...style }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

// Label3 (default: medium)
export const L3 = ({
  children,
  weight = "m",
  color,
  style,
  onClick,
}: WeightTextProps) => {
  return (
    <Text
      $fontTheme="l3"
      style={{ color: color, fontWeight: formatWeight(weight), ...style }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

// Label4
export const L4 = ({ children, color, style, onClick }: TextProps) => {
  return (
    <Text $fontTheme="l4" style={{ color: color, ...style }} onClick={onClick}>
      {children}
    </Text>
  );
};

const Text = styled.p<FontProps>`
  ${({ theme, $fontTheme }) => theme.font[$fontTheme]}
  transition: all 0.3s ease-in-out;
`;
