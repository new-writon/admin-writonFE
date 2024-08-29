import { Button, FlexBox } from "../../atoms";
import { ColorPalette, ImageUpload, Input, Title } from "../../molecules";
import { B1, H2 } from "../../atoms/Text";
import { theme } from "../../../styles/theme";
import { CreateOrg } from "../../../interfaces/organization";

const CreateOrg = ({
  moveStep,
  data,
  preview,
  setData,
  setFile,
  setPreview,
}: CreateOrg) => {
  return (
    <>
      {/* ========== Form Title ========== */}
      <FlexBox col align="center" gap={10}>
        <H2>라이톤 조직 개설</H2>
        <B1 color={theme.color.gray[60]}>
          라이톤 챌린지를 운영할 조직을 개설합니다
        </B1>
      </FlexBox>

      {/* ========== 조직 이름 ========== */}
      <FlexBox col fullWidth gap={6}>
        <Title title="조직 이름" />
        <Input
          value={data.name}
          setValue={(value: string) =>
            setData((prev) => ({
              ...prev,
              name: value,
            }))
          }
          maxLength={20}
          placeHolder="조직 이름을 입력해주세요."
        />
      </FlexBox>

      {/* ========== 조직 로고 ========== */}
      <FlexBox col fullWidth gap={20}>
        <Title
          title="조직 로고"
          subTitle="조직에서 사용할 로고 이미지를 설정해주세요."
        />
        <ImageUpload
          setImage={setFile}
          preview={preview}
          setPreview={setPreview}
        />
      </FlexBox>

      {/* ========== 테마 컬러 설정 ========== */}
      <FlexBox col fullWidth gap={20}>
        <Title
          title="테마 컬러 설정"
          subTitle="조직에서 사용할 라이톤의 테마 컬러를 설정할 수 있어요."
        />
        <ColorPalette
          selectedColor={data.themeColor}
          setSelectedColor={(value: string) =>
            setData((prev) => ({
              ...prev,
              themeColor: value,
            }))
          }
        />
      </FlexBox>

      {/* ========== 다음 버튼 ========== */}
      <Button
        size="lg"
        type="dark"
        onClick={() => {
          moveStep(1);
        }}
        style={{ width: "360px" }}
      >
        다음
      </Button>
    </>
  );
};

export default CreateOrg;
