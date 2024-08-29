import styled from "styled-components";

interface Line {
  height?: number;
}

const Line = ({ height }: Line) => {
  return <Container $height={height} />;
};

export default Line;

const Container = styled.div<{ $height?: number }>`
  width: ${({ $height }) => ($height ? "1px" : "100%")};
  height: ${({ $height }) => ($height ? `${$height}px` : "1px")};
  background-color: ${({ theme }) => theme.color.gray[30]};
  /* 이게 있어야 부모 컴포넌트의 크기에 자동조정 안됨 (이거 없어지면 자꾸 사라짐) */
  flex: 0 0 auto;
`;
