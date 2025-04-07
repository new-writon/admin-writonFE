import { useRef, useState } from "react";
import styled from "styled-components";
import { Button, CheckBox, FlexBox } from "../atoms";
import { L3 } from "../atoms/Text";
import { theme } from "../../styles/theme";

interface ImageUpload {
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  disabled?: boolean;
}

const ImageUpload = ({
  preview,
  setPreview,
  setImage,
  disabled = false,
}: ImageUpload) => {
  const defaultLogoUrl =
    "https://writon-data2.s3.ap-northeast-2.amazonaws.com/logo/d4fdaf92-eb71-4f3a-979e-75211814d364.png";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(preview === defaultLogoUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      setImage(file);
      setIsChecked(false);
      file && setPreview(URL.createObjectURL(file));
    }
  };

  const handelDeleteLogo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImage(null);
    setPreview("");
  };

  const onClickDeleteLogo = () => {
    handelDeleteLogo();
    setIsChecked(false);
  };

  const onClickDefaultLogo = (checked: boolean) => {
    handelDeleteLogo();
    checked && setPreview(defaultLogoUrl);
  };

  return (
    <FlexBox align="center" gap={50}>
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
            <ImgAddBtn $disabled={disabled}>
              <label htmlFor="upload-input">
                {preview == "" ? "추가" : "변경"}
              </label>
              <input
                id="upload-input"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={disabled}
              />
            </ImgAddBtn>
            <Button
              size="sm"
              type="empty"
              disabled={!preview || disabled}
              onClick={onClickDeleteLogo}
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
          onClick={onClickDefaultLogo}
          disabled={disabled}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ImageUpload;

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

const ImgAddBtn = styled.button<{ $disabled: boolean }>`
  label {
    ${({ theme }) => theme.font.b2}
    border-radius: 6px;
    border: 1px solid
      ${({ theme, $disabled }) =>
        $disabled ? theme.color.gray[30] : theme.color.brand[50]};
    background: ${({ theme }) => theme.color.base.white};
    padding: 9px 14px;
    color: ${({ theme, $disabled }) =>
      $disabled ? theme.color.gray[50] : theme.color.brand[50]};
    font-weight: 600;
    text-align: center;
    cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
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
