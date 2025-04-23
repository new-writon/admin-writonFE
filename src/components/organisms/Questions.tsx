import { theme } from "../../styles/theme";
import { Chip, FlexBox, Select } from "../atoms";
import { B2 } from "../atoms/Text";
import { ContentSection, EditBtn, Input, InputDropdown } from "../molecules";
import { useEffect, useState } from "react";
import { QuestionsProps } from "../../interfaces/challenge";

const StatusChip = ({ idx }: { idx: number }) => {
  const isRequired = idx == 0;

  return (
    <Chip size="sm" color={isRequired ? "red" : "green"}>
      {isRequired ? "필수" : "선택"}
    </Chip>
  );
};

// 키워드 생성시 적용하는 임의의 음수 id
let newKeywordId = -1;

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
    id: 0,
    keyword: "",
  });
  const keywordList = data.specialQuestions.map(({ keywordId, keyword }) => ({
    id: keywordId,
    keyword,
  }));
  const selectedQuestions: string[] =
    data.specialQuestions.find(
      ({ keywordId }) => keywordId === selectedKeyword.id
    )?.questions || [];

  useEffect(() => {
    if (data) {
      setSelectedKeyword({
        id: data.specialQuestions[0]?.keywordId,
        keyword: data.specialQuestions[0]?.keyword,
      });
    }
  }, [backupData]);

  // 키워드 변경 이벤트
  const handleKeywordList = (value: string[]) => {
    // 변경된 키워드 리스트에 selectedKeyword가 없는 경우
    if (!value.includes(selectedKeyword.keyword || "")) {
      const selectedKeywordIdx = keywordList.findIndex(
        (item) => item.id === selectedKeyword.id
      );

      // 1. 키워드가 처음 생성되면 첫번째 키워드 선택
      if (keywordList.length === 0) {
        setSelectedKeyword({
          id: newKeywordId,
          keyword: value[0],
        });

        // 2. 키워드 한개도 없어지면 초기화
      } else if (value.length === 0) {
        setSelectedKeyword({
          id: 0,
          keyword: "",
        });

        // 3. selectedKeyword가 마지막인 경우 그 앞의 keyword로 변경
      } else if (selectedKeywordIdx === value.length) {
        setSelectedKeyword({
          id: keywordList[selectedKeywordIdx - 1].id,
          keyword: keywordList[selectedKeywordIdx - 1].keyword,
        });

        // 4. selectedKeyword가 삭제되는 경우 그 뒤의 keyword로 변경
      } else {
        setSelectedKeyword({
          id: keywordList[selectedKeywordIdx + 1].id,
          keyword: keywordList[selectedKeywordIdx + 1].keyword,
        });
      }
      // 5. 새로운 키워드를 생성할 경우 selectedKeyword 맨 뒤로 이동
    } else if (
      keywordList[keywordList.length - 1].keyword === value[value.length - 2]
    ) {
      setSelectedKeyword({
        id: newKeywordId,
        keyword: value[value.length - 1],
      });
    }

    const updatedSpecialQuestions = value.map((keyword) => {
      // 기존 데이터에서 해당 키워드를 찾음
      const existingData = data.specialQuestions.find(
        (sq) => sq.keyword === keyword
      );

      // 기존 데이터가 있으면 그대로 사용, 없으면 새로운 객체 생성
      return (
        existingData || {
          keywordId: newKeywordId--,
          keyword,
          questions: ["", "", "", ""],
        }
      );
    });

    setData?.((prev) => ({
      ...prev,
      specialQuestions: updatedSpecialQuestions,
    }));
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
      specialQuestions: prev.specialQuestions.map((item) => {
        if (item.keywordId !== selectedKeyword.id) {
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
        id: backupData.specialQuestions[0]?.keywordId,
        keyword: backupData.specialQuestions[0]?.keyword,
      });
    }
  };

  return (
    <FlexBox fullWidth justify="space-between" as="section">
      <FlexBox col isFlex1 gap={gap}>
        {/*  ========== 베이직 질문 ==========  */}
        <ContentSection title="베이직 질문" titleWidth={163}>
          <FlexBox col gap={12}>
            {data.basicQuestions.map((ques, idx) =>
              isEdit || ques ? (
                <FlexBox key={idx} gap={20} align="center">
                  {isEdit && <StatusChip idx={idx} />}
                  <B2
                    weight="sb"
                    color={theme.color.gray[80]}
                    as="label"
                    htmlFor={`basic_question_${idx + 1}`}
                  >
                    질문 {idx + 1}
                  </B2>
                  <Input
                    id={`basic_question_${idx + 1}`}
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
          <ContentSection title="스페셜 질문 키워드 관리" titleWidth={163}>
            <InputDropdown
              type="keyword"
              list={keywordList.map((item) => item.keyword)}
              setList={handleKeywordList}
            />
          </ContentSection>
        )}

        {/*  ========== 스페셜 질문 ==========  */}
        <ContentSection title="스페셜 질문" titleWidth={163}>
          <FlexBox col gap={24} style={{ width: "500px" }}>
            {data.specialQuestions.length == 0 ? (
              <B2 color={theme.color.gray[60]}>
                스페셜 질문의 키워드를 먼저 설정해주세요.
              </B2>
            ) : (
              <FlexBox align="center" gap={8} isFlexWrap>
                {keywordList.map((keyword) => (
                  <Select
                    type={
                      keyword.id == selectedKeyword.id ? "outline" : "default"
                    }
                    key={keyword.id}
                    onClick={() => setSelectedKeyword(keyword)}
                  >
                    {keyword.keyword}
                  </Select>
                ))}
              </FlexBox>
            )}
            <FlexBox col gap={12}>
              {selectedQuestions.length == 0
                ? Array(4)
                    .fill(null)
                    .map((_, idx) => (
                      <FlexBox key={idx} gap={20} align="center">
                        {isEdit && <StatusChip idx={idx} />}
                        <B2
                          weight="sb"
                          color={theme.color.gray[80]}
                          as="label"
                          htmlFor={`special_question_${idx + 1}`}
                        >
                          질문 {idx + 1}
                        </B2>
                        <Input
                          id={`special_question_${idx + 1}`}
                          value=""
                          disabled
                          placeHolder="질문을 입력해주세요."
                        />
                      </FlexBox>
                    ))
                : selectedQuestions.map((ques, idx) =>
                    isEdit || ques ? (
                      <FlexBox key={idx} gap={20} align="center">
                        {isEdit && <StatusChip idx={idx} />}
                        <B2
                          weight="sb"
                          color={theme.color.gray[80]}
                          as="label"
                          htmlFor={`special_question_${idx + 1}`}
                        >
                          질문 {idx + 1}
                        </B2>
                        <Input
                          id={`special_question_${idx + 1}`}
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
