import styled from "styled-components";

const Line = () => {
  return <Container />;
};

export default Line;

const Container = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.gray[30]};
`;
