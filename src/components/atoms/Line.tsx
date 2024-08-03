import styled from "styled-components";

interface Line {
  vertical?: boolean;
}

const Line = ({ vertical }: Line) => {
  return <Container $vertical={vertical} />;
};

export default Line;

const Container = styled.div<{ $vertical?: boolean }>`
  width: ${({ $vertical }) => ($vertical ? "1px" : "100%")};
  height: ${({ $vertical }) => ($vertical ? "100%" : "1px")};
  background-color: ${({ theme }) => theme.color.gray[30]};
  flex: 0 0 auto; /* 이게 있어야 부모 컴포넌트의 크기에 자동조정 안됨 (이거 없어지면 자꾸 사라짐) */
`;
