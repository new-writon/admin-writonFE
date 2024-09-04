import { theme } from "../../styles/theme";
import { Chip, FlexBox, Select } from "../atoms";
import { B2 } from "../atoms/Text";
import { ContentSection, EditBtn, Input, InputDropdown } from "../molecules";
import { useEffect, useState } from "react";
import { QuestionsProps } from "../../interfaces/challenge";

const StatusChip = ({ idx }: { idx: number }) => {
  const isRequired = idx == 0;

  return (
    <Chip size='sm' color={isRequired ? "red" : "green"}>
      {isRequired ? "필수" : "선택"}
    </Chip>
  );
};

const Questions = ({
  gap,
  isEdit = false,
  setIsEdit,
  handleEdit = () => {},
  data,
  setData,
  backupData,
}: QuestionsProps) => {
  const [selectedKeyword, setSelectedKeyword] = useState({
    idx: 0,
    keyword: "",
  });
  const selectedQuestions = data.specialQuestions.find(
    ({ keyword }) => keyword === selectedKeyword.keyword
  )?.questions;
  const keywordList = data.specialQuestions.map(({ keyword }) => keyword);

  useEffect(() => {
    if (backupData) {
      setSelectedKeyword({
        idx: 0,
        keyword: backupData.specialQuestions[0]?.keyword,
      });
    }
  }, [backupData]);

  // 키워드 변경 이벤트
  const handleKeywordList = (value: string[]) => {
    const updatedSpecialQuestions = value.map((keyword) => {
      // 기존 데이터에서 해당 키워드를 찾음
      const existingData = data.specialQuestions.find(
        (sq) => sq.keyword === keyword
      );
      // 기존 데이터가 있으면 그대로 사용, 없으면 새로운 객체 생성
      return existingData || { keyword, questions: ["", "", "", ""] };
    });

    setData?.((prev) => ({
      ...prev,
      specialQuestions: updatedSpecialQuestions,
    }));

    // 키워드 리스트가 변경될 때 selectedKeyword를 업데이트
    if (!value.includes(selectedKeyword.keyword || "")) {
      // 1. keywordList 0개에서 생길 때 자동으로 1번 keyword 선택
      if (value.length == 1) {
        setSelectedKeyword({ idx: 0, keyword: value[0] });
        // 2. selectedKeyword가 마지막인 경우 그 앞의 keyword로 변경
      } else if (selectedKeyword.idx == value.length) {
        setSelectedKeyword((prev) => ({
          idx: prev.idx - 1,
          keyword: value[prev.idx - 1],
        }));
        // 3. selectedKeyword가 삭제되는 경우 그 뒤의 keyword로 변경
      } else {
        setSelectedKeyword((prev) => ({
          ...prev,
          keyword: value[prev.idx],
        }));
      }
    }
  };

  // 베이직 질문 수정
  const setBasicInputValue = (value: string, curIdx: number) => {
    setData?.((prev) => ({
      ...prev,
      basicQuestions: prev.basicQuestions.map((item, idx) =>
        idx == curIdx ? value : item
      ),
    }));
  };

  // 스페셜 질문 수정
  const setSpecialInputValue = (value: string, curIdx: number) => {
    setData?.((prev) => ({
      ...prev,
      specialQuestions: prev.specialQuestions.map((item, keywordIdx) => {
        if (keywordIdx !== selectedKeyword.idx) {
          return item;
        }
        return {
          ...item,
          questions: item.questions.map((question, idx) =>
            idx === curIdx ? value : question
          ),
        };
      }),
    }));
  };

  // 수정 취소하기 버튼
  const handleCancel = () => {
    if (backupData) {
      setData?.(backupData);
      setSelectedKeyword({
        idx: 0,
        keyword: backupData.specialQuestions[0]?.keyword,
      });
    }
  };

  return (
    <FlexBox fullWidth justify='space-between'>
      <FlexBox col isFlex1 gap={gap}>
        {/*  ========== 베이직 질문 ==========  */}
        <ContentSection title='베이직 질문' titleWidth={163}>
          <FlexBox col gap={12}>
            {data.basicQuestions.map((ques, idx) =>
              isEdit || ques ? (
                <FlexBox key={idx} gap={20} align='center'>
                  {isEdit && <StatusChip idx={idx} />}
                  <B2 weight='sb' color={theme.color.gray[80]}>
                    질문 {idx + 1}
                  </B2>
                  <Input
                    disabled={!isEdit}
                    value={ques}
                    setValue={(value: string) => setBasicInputValue(value, idx)}
                  />
                </FlexBox>
              ) : null
            )}
          </FlexBox>
        </ContentSection>

        {/*  ========== 키워드 관리 ==========  */}
        {isEdit && (
          <ContentSection title='스페셜 질문 키워드 관리' titleWidth={163}>
            <InputDropdown
              type='keyword'
              list={keywordList}
              setList={handleKeywordList}
            />
          </ContentSection>
        )}

        {/*  ========== 스페셜 질문 ==========  */}
        <ContentSection title='스페셜 질문' titleWidth={163}>
          <FlexBox col gap={24} style={{ width: "500px" }}>
            {data.specialQuestions.length == 0 ? (
              <B2 color={theme.color.gray[60]}>
                스페셜 질문의 키워드를 먼저 설정해주세요.
              </B2>
            ) : (
              <FlexBox align='center' gap={8} isFlexWrap>
                {keywordList.map((keyword, idx) => (
                  <Select
                    type={idx == selectedKeyword.idx ? "outline" : "default"}
                    key={idx}
                    onClick={() => setSelectedKeyword({ idx, keyword })}
                  >
                    {keyword}
                  </Select>
                ))}
              </FlexBox>
            )}
            <FlexBox col gap={12}>
              {selectedQuestions?.length == 0
                ? Array(4)
                    .fill(null)
                    .map((_, idx) => (
                      <FlexBox key={idx} gap={20} align='center'>
                        {isEdit && <StatusChip idx={idx} />}
                        <B2 weight='sb' color={theme.color.gray[80]}>
                          질문 {idx + 1}
                        </B2>
                        <Input
                          value=''
                          disabled
                          placeHolder='질문을 입력해주세요.'
                        />
                      </FlexBox>
                    ))
                : selectedQuestions?.map((ques, idx) =>
                    isEdit || ques ? (
                      <FlexBox key={idx} gap={20} align='center'>
                        {isEdit && <StatusChip idx={idx} />}
                        <B2 weight='sb' color={theme.color.gray[80]}>
                          질문 {idx + 1}
                        </B2>
                        <Input
                          disabled={!isEdit}
                          value={ques}
                          setValue={(value: string) =>
                            setSpecialInputValue(value, idx)
                          }
                        />
                      </FlexBox>
                    ) : null
                  )}
            </FlexBox>
          </FlexBox>
        </ContentSection>
      </FlexBox>

      {/*  ========== 수정 버튼 ==========  */}
      {setIsEdit && (
        <EditBtn
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
        />
      )}
    </FlexBox>
  );
};

export default Questions;
