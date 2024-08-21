import { useEffect, useState } from "react";
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
import useOrganizationStore from "../states/OrganizationStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getOrganizationPositionAPI,
  patchOrganizationInfoAPI,
  patchOrganizationPositionAPI,
} from "../apis/organizationAPI";
import useChallengeStore from "../states/ChallengeStore";

const InfoManage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    organizationName,
    organizationLogo,
    themeColor: color,
    setOrganizationName,
    setOrganizationLogo,
    setThemeColor: setColor,
  } = useOrganizationStore();

  const [name, setName] = useState<string>(organizationName || "");
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(organizationLogo || "");
  const [themeColor, setThemeColor] = useState(color || "");

  const { mutateAsync: handleEdit } = useMutation({
    mutationFn: () =>
      patchOrganizationInfoAPI(logo, {
        name,
        themeColor,
        logo: preview,
      }),
    onSuccess: ({ organizationName, organizationLogo, themeColor }) => {
      alert("수정 완료");
      console.log(organizationName, organizationLogo, themeColor);
      setOrganizationName(organizationName);
      setOrganizationLogo(organizationLogo);
      setColor(themeColor);
    },
    onError: (err) => {
      console.error(err);
    },
  });

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
          <Input value={name || ""} setValue={setName} disabled={!isEdit} />
        </ContentSection>

        <ContentSection title="조직 로고" titleWidth={180}>
          <ImageUpload
            preview={preview}
            setPreview={setPreview}
            setImage={setLogo}
            disabled={!isEdit}
          />
        </ContentSection>

        <ContentSection title="테마 컬러 설정" titleWidth={180}>
          <ColorPalette
            selectedColor={themeColor || ""}
            setSelectedColor={setThemeColor}
            disabled={!isEdit}
          />
        </ContentSection>
      </FlexBox>
    </>
  );
};

const OnBoardingManage = () => {
  const { challengeId } = useChallengeStore();

  const [isEdit, setIsEdit] = useState(false);
  const [positionList, setPositionList] = useState<string[]>([]);
  const [backupData, setBackupData] = useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ["organization-position", challengeId],
    queryFn: () => getOrganizationPositionAPI(),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setPositionList(data);
      setBackupData(data);
    }
  }, [data]);

  };

  return (
    <>
      <FlexBox fullWidth justify="flex-end">
        <EditBtn isEdit={isEdit} setIsEdit={setIsEdit} handleEdit={handleEdit}>
          온보딩 항목 수정
        </EditBtn>
      </FlexBox>

      <FlexBox col gap={48} align="center" fullWidth>
        {!isEdit && (
          <B2 color={theme.color.gray[60]}>
            온보딩 항목은 유저에게 다음과 같이 보여집니다.
          </B2>
        )}
        <Form contentsWidth={430} noBackground>
          {!isEdit ? (
            <Preview positionList={positionList} />
          ) : (
            <ManageOrg data={positionList} setData={setPositionList} disabled />
          )}
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
