import styled from "styled-components";
import { Button, CheckBox, FlexBox } from "../../atoms";
import { Input, Title } from "../../molecules";
import { B1, H2, L3 } from "../../atoms/Text";
import { theme } from "../../../styles/theme";
import { FaCheck } from "../../atoms/Icons";
import { useState } from "react";

interface CreateOrg {
  moveStep: (path: -1 | 1) => void;
}

const CreateOrg = ({ moveStep }: CreateOrg) => {
  const [name, setName] = useState(""); // 조직 이름
  const [selectedColor, setSelectedColor] = useState("brand"); // 테마컬러
  const [isChecked, setIsChecked] = useState(false);
  const colorList = [
    {
      name: "brand",
      color: theme.color.brand[30],
    },
    {
      name: "red",
      color: "#FF4D56",
    },
    {
      name: "orange",
      color: "#FFA24D",
    },
    {
      name: "yellow",
      color: "#FFED4D",
    },
    {
      name: "green",
      color: "#4BDC5A",
    },
    {
      name: "emerald",
      color: "#4BDCD3",
    },
    {
      name: "skyblue",
      color: "#31BDFA",
    },
    {
      name: "navy",
      color: "#244A94",
    },
    {
      name: "purple",
      color: "#AC62E6",
    },
    {
      name: "pick",
      color: "#F87BE4",
    },
    {
      name: "gray",
      color: "#252525",
    },
  ];

  const onClickColorBtn = (color: string) => {
    if (color != selectedColor) {
      setSelectedColor(color);
    }
  };

  // 로고 이미지 업로드
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      setLogo(file);
      setIsChecked(false);
      file && setPreview(URL.createObjectURL(file));
    }

    if (!logo) return;
    const formData = new FormData();
    formData.append("file", logo);
  };

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
          value={name}
          setValue={setName}
          maxLength={20}
          error="Message"
          placeHolder="조직 이름을 입력해주세요."
        />
      </FlexBox>

      {/* ========== 조직 로고 ========== */}
      <FlexBox col fullWidth gap={20}>
        <Title
          title="조직 로고"
          subTitle="조직에서 사용할 로고 이미지를 설정해주세요."
        />
        <FlexBox fullWidth justify="space-between" align="center" gap={50}>
          <ImgConatainer>
            {preview ? (
              <img src={preview} alt="logo" />
            ) : (
              <L3 color={theme.color.gray[60]}>이미지 추가</L3>
            )}
          </ImgConatainer>
          <FlexBox
            col
            isFlex1
            justify="space-between"
            padding="0 0 2px 0"
            style={{ height: "125px" }}
          >
            <FlexBox isFlex1 col gap={10}>
              <FlexBox gap={10} align="center">
                <ImgAddBtn>
                  <label htmlFor="upload-input">추가</label>
                  <input
                    id="upload-input"
                    type="file"
                    onChange={handleFileChange}
                  />
                </ImgAddBtn>
                <Button
                  size="sm"
                  type="empty"
                  disabled={preview == ""}
                  onClick={() => {
                    setPreview("");
                  }}
                >
                  삭제
                </Button>
              </FlexBox>
              <RecImgSizeTxt>
                권장 이미지 크기: <span>125x125 px</span>
              </RecImgSizeTxt>
            </FlexBox>
            <CheckBox
              text="라이톤 기본 로고 사용하기"
              checked={isChecked}
              setChecked={setIsChecked}
              onClick={(checked) => {
                setPreview(checked ? "/icons/default-logo.png" : "");
              }}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>

      {/* ========== 테마 컬러 설정 ========== */}
      <FlexBox col fullWidth gap={20}>
        <Title
          title="테마 컬러 설정"
          subTitle="조직에서 사용할 라이톤의 테마 컬러를 설정할 수 있어요."
        />
        <FlexBox gap={14} style={{ flexWrap: "wrap" }}>
          {colorList.map(({ name, color }) => (
            <ColorBtn
              key={name}
              $color={color}
              onClick={() => onClickColorBtn(name)}
            >
              {name == selectedColor && (
                <FaCheck color={theme.color.base.white} size={14} />
              )}
            </ColorBtn>
          ))}
        </FlexBox>
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

const ImgConatainer = styled.div`
  display: flex;
  width: 125px;
  height: 125px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.color.gray[30]};
  background: ${({ theme }) => theme.color.gray[20]};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ImgAddBtn = styled.button`
  label {
    ${({ theme }) => theme.font.b2}
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.color.brand[50]};
    background: ${({ theme }) => theme.color.base.white};
    padding: 9px 14px;
    color: ${({ theme }) => theme.color.brand[50]};
    font-weight: 600;
    text-align: center;
    cursor: pointer;
  }

  input {
    display: none;
  }
`;

const RecImgSizeTxt = styled.p`
  ${({ theme }) => theme.font.l3}
  color: ${({ theme }) => theme.color.gray[60]};
  span {
    color: ${({ theme }) => theme.color.gray[80]};
  }
`;

const ColorBtn = styled.button<{ $color: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  border: 1.5px solid ${({ theme }) => theme.color.gray[30]};
  background-color: ${({ $color }) => $color};
  opacity: 0.5;
`;
