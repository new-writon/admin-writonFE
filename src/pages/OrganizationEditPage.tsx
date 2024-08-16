import { useState } from "react";
import { FlexBox } from "../components/atoms";
import {
  Categories,
  ColorPalette,
  ContentSection,
  EditBtn,
  ImageUpload,
  Input,
} from "../components/molecules";
import { Form, Frame, Preview, ManageOrg } from "../components/organisms";
import { B2, H3 } from "../components/atoms/Text";
import { theme } from "../styles/theme";

const InfoManage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState("라이톤");
  const [selectedColor, setSelectedColor] = useState("brand");
  const [logo, setLogo] = useState<File | null>(null);

  const handleEdit = () => {
    alert("수정 완료");
    setIsEdit(false);
  };

  return (
    <>
      {/* ========== Title ========== */}
      <FlexBox fullWidth justify="space-between">
        <H3>기본 정보</H3>
        <EditBtn
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleEdit={handleEdit}
        />
      </FlexBox>

      {/* ========== Contents ========== */}
      <FlexBox col fullWidth gap={52} style={{ width: "600px" }}>
        <ContentSection title="조직 이름" titleWidth={180}>
          <Input value={name} setValue={setName} disabled={!isEdit} />
        </ContentSection>

        <ContentSection title="조직 로고" titleWidth={180}>
          <ImageUpload image={logo} setImage={setLogo} disabled={!isEdit} />
        </ContentSection>

        <ContentSection title="테마 컬러 설정" titleWidth={180}>
          <ColorPalette
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            disabled={!isEdit}
          />
        </ContentSection>
      </FlexBox>
    </>
  );
};

const OnBoardingManage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [positions, setPositions] = useState<string[]>();

  const handleEdit = () => {
    alert("수정 완료");
    setIsEdit(false);
  };

  return (
    <>
      <FlexBox fullWidth justify="flex-end">
        <EditBtn
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleEdit={handleEdit}
        >온보딩 항목 수정</EditBtn>
      </FlexBox>

      <FlexBox col gap={48} align="center" fullWidth>
        {!isEdit && (
          <B2 color={theme.color.gray[60]}>
            온보딩 항목은 유저에게 다음과 같이 보여집니다.
          </B2>
        )}
        <Form contentsWidth={430} noBackground>
          {!isEdit ? <Preview /> : <ManageOrg disabled />}
        </Form>
      </FlexBox>
    </>
  );
};

const OrganizationEditPage = () => {
  const categoryList = ["조직 정보 관리", "조직 온보딩 관리"];
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <Frame title="조직 설정" hasDropdown={false} noLine>
      <FlexBox col gap={40} fullWidth>
        <Categories
          list={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {selectedCategory == 0 && <InfoManage />}
        {selectedCategory == 1 && <OnBoardingManage />}
      </FlexBox>
    </Frame>
  );
};

export default OrganizationEditPage;
