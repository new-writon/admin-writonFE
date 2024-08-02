import { FlexBox } from "../components/atoms";
import { B1 } from "../components/atoms/Text";
import { Frame } from "../components/organisms";

const CustomPage = () => {
  return (
    <Frame title="기능 커스텀">
      <FlexBox
        col
        fullWidth
        align="center"
        gap={20}
        style={{ paddingTop: "80px" }}
      >
        <img src="/images/page.svg" />
        <B1>서비스 준비중...</B1>
      </FlexBox>
    </Frame>
  );
};

export default CustomPage;
