import { FlexBox } from "../components/atoms";
import { Frame, Participate } from "../components/organisms";

const ParticipationParticipatePage = () => {
  return (
    <Frame title="참여자 초대">
      <FlexBox col fullWidth gap={50} style={{ marginTop: "40px" }}>
        <Participate gap={50} isEdit />
      </FlexBox>
    </Frame>
  );
};

export default ParticipationParticipatePage;
