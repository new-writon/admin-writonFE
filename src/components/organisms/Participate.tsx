import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Button, FlexBox, InputChip } from "../atoms";
import { BsPaperclip, FiPlus, FiX } from "../atoms/Icons";
import { B2, L3 } from "../atoms/Text";
import { ContentSection, InputDropdown } from "../molecules";
import { emailList } from "../../data/ChallengeInfoPageData";
import { useRef, useState } from "react";

interface Participate {
  gap: number;
  isEdit?: boolean;
}

const Participate = ({ gap, isEdit = false }: Participate) => {
  const [pendingEmailList, setPendingEmailList] = useState<string[]>([]);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 엑셀 파일 업로드
  const onClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    setExcelFile(file);
  };

  // 엑셀 파일 삭제
  const onClickDelete = () => {
    setExcelFile(null);
    // 파일 입력 요소의 값을 리셋하여 동일한 파일을 다시 선택할 수 있도록 함
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 초기화 버튼
  const onClickReset = () => {
    alert("초기화 되었습니다.");
  };

  // 초대 완료 버튼
  const onClickParticipate = () => {
    alert("초대가 완료되었습니다.");
  };

  return (
    <FlexBox fullWidth col gap={gap}>
      {isEdit && (
        <B2 weight="r" color={theme.color.gray[60]}>
          참여자 초대는 이러이러하게 할 수 있어요. 참여자 초대는 이러이러하게 할
          수 있어요. 참여자 초대는 이러이러하게 할 수 있어요.
        </B2>
      )}
      {/*  ========== 참여자 파일 ==========  */}
      <ContentSection
        title={isEdit ? "엑셀 파일 첨부" : "참여자 파일"}
        titleWidth={156}
      >
        <FlexBox col gap={12}>
          <FileInput $isEdit={isEdit}>
            <FlexBox align="center" gap={12}>
              <BsPaperclip size={18} color={theme.color.gray[60]} />
              <B2 color={theme.color.gray[60]}>
                {excelFile?.name || "파일이 첨부되지 않았습니다."}
              </B2>
            </FlexBox>
            {isEdit && (
              <FlexBox align="center" gap={10}>
                <button id="delete-btn" onClick={onClickDelete}>
                  <FiX color={theme.color.gray[60]} size={18} />
                </button>
                <button id="upload-btn">
                  <label htmlFor="upload-input">
                    {excelFile ? "업로드" : "파일 첨부하기"}
                    {!excelFile && (
                      <FiPlus size={16} color={theme.color.brand[50]} />
                    )}
                  </label>
                  <input
                    id="upload-input"
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={onClickUpload}
                    ref={fileInputRef}
                  />
                </button>
              </FlexBox>
            )}
          </FileInput>
          {isEdit && (
            <B2 weight="r" color={theme.color.gray[60]}>
              엑셀 파일에 기재된 이메일로 초대장이 전송됩니다.
            </B2>
          )}
        </FlexBox>
      </ContentSection>

      {/*  ========== 참여자 이메일 ==========  */}
      <ContentSection
        title={isEdit ? "참여자 이메일로 초대" : "참여자 이메일"}
        titleWidth={156}
      >
        <FlexBox col isFlex1 gap={20}>
          {isEdit && (
            <InputDropdown
              type="email"
              list={pendingEmailList}
              setList={setPendingEmailList}
            />
          )}
          <L3 color={theme.color.gray[60]}>
            {isEdit ? (
              <>
                기존에 전송된 메일 목록{" "}
                <span style={{ color: theme.color.brand[50] }}>
                  {emailList.length}건
                </span>
              </>
            ) : (
              <>
                <span style={{ color: theme.color.brand[50] }}>
                  {emailList.length}
                </span>
                개의 이메일로 초대장이 전송되었습니다.
              </>
            )}
          </L3>
          <FlexBox gap={8} style={{ flexWrap: "wrap", width: "550px" }}>
            {emailList.map((email, idx) => (
              <InputChip key={idx} color="gray">
                <L3 color={theme.color.gray[80]}>{email}</L3>
              </InputChip>
            ))}
          </FlexBox>
        </FlexBox>
      </ContentSection>

      {/*  ========== 버튼 ==========  */}
      {isEdit && (
        <FlexBox fullWidth justify="center" align="center" gap={12}>
          <Button type="empty" size="lg" onClick={onClickReset}>
            초기화
          </Button>
          <Button type="dark" size="lg" onClick={onClickParticipate}>
            참여자 초대 완료하기
          </Button>
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default Participate;

const FileInput = styled.div<{ $isEdit: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ $isEdit }) => ($isEdit ? "530px" : "433px")};
  padding: 8px;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.gray[30]};
  background: ${({ theme }) => theme.color.gray[10]};

  #delete-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #upload-btn {
    label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0;
      ${({ theme }) => theme.font.b2}
      border-radius: 6px;
      background: ${({ theme }) => theme.color.brand[10]};
      padding: 6px 14px;
      color: ${({ theme }) => theme.color.brand[50]};
      font-weight: 600;
      text-align: center;
      cursor: pointer;
    }

    input {
      display: none;
    }
  }
`;
