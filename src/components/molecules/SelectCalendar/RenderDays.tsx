import styled from "styled-components";

const RenderDays = () => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <Container>
      {days.map((item, idx) => (
        <div
          key={idx}
          className={item === "토" ? "saturday" : item === "일" ? "sunday" : ""}
        >
          {item}
        </div>
      ))}
    </Container>
  );
};

export default RenderDays;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  div {
    padding: 9px;
    max-width: 26px;
    color: #333;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 13px */
  }

  .saturday {
    color: #0f62fe;
  }

  .sunday {
    color: #da1e28;
  }
`;
