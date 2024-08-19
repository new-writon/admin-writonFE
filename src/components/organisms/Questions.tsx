import { theme } from "../../styles/theme";
import { Chip, FlexBox, Select } from "../atoms";
import { B2 } from "../atoms/Text";
import { ContentSection, EditBtn, Input, InputDropdown } from "../molecules";
import { useEffect, useState } from "react";
import { Questions, SpecialQuestion } from "../../interfaces/challenge";

const StatusChip = ({ idx }: { idx: number }) => {
  const isRequired = idx == 0;

  return (
    <Chip size="sm" color={isRequired ? "red" : "green"}>
      {isRequired ? "필수" : "선택"}
    </Chip>
  );
};

const Questions = ({
  gap,
  hasEditBtn,
  isEdit = false,
  setIsEdit = () => {},
  data,
  setData,
}: Questions) => {
  // Data
  const [basicQuestions, setBasicQuestions] = useState<string[]>(
    data?.basicQuestions || []
  );
  const [specialQuestions, setSpecialQuestions] = useState<SpecialQuestion[]>(
    data?.specialQuestions || []
  );
  const [selectedKeyword, setSelectedKeyword] = useState({
    idx: 0,
    keyword: specialQuestions[0]?.keyword,
  });
  const selectedQuestions =
    specialQuestions.find(({ keyword }) => keyword === selectedKeyword.keyword)
      ?.questions || [];
  const [keywordList, setKeywordList] = useState<string[]>([]);

  useEffect(() => {
    // 키워드 리스트가 변경될 때마다 specialQuestionsData를 업데이트
    const updatedSpecialQuestions = keywordList.map((keyword) => {
      // 기존 데이터에서 해당 키워드를 찾음
      const existingData = specialQuestions.find(
        (sq) => sq.keyword === keyword
      );
      // 기존 데이터가 있으면 그대로 사용, 없으면 새로운 객체 생성
      return existingData || { keyword, questions: ["", "", "", ""] };
    });
    setSpecialQuestions(updatedSpecialQuestions);

    // 키워드 리스트가 변경될 때 selectedKeyword를 업데이트
    if (!keywordList.includes(selectedKeyword.keyword)) {
      // 1. keywordList 0개에서 생길 때 자동으로 1번 keyword 선택
      if (keywordList.length == 1) {
        setSelectedKeyword({ idx: 0, keyword: keywordList[0] });
        // 2. selectedKeyword가 마지막인 경우 그 앞의 keyword로 변경
      } else if (selectedKeyword.idx == keywordList.length) {
        setSelectedKeyword((prev) => ({
          idx: prev.idx - 1,
          keyword: keywordList[prev.idx - 1],
        }));
        // 3. selectedKeyword가 삭제되는 경우 그 뒤의 keyword로 변경
      } else {
        setSelectedKeyword((prev) => ({
          ...prev,
          keyword: keywordList[prev.idx],
        }));
      }
    }
  }, [keywordList]);

  useEffect(() => {
    if (data) {
      setBasicQuestions(
        Array(4)
          .fill(null)
          .map((_, idx) => data.basicQuestions[idx] || "")
      );
      setSpecialQuestions(
        data.specialQuestions.map((ques) => ({
          ...ques,
          questions: Array(4)
            .fill(null)
            .map((_, idx) => ques.questions[idx] || ""),
        }))
      );
      setSelectedKeyword({
        idx: 0,
        keyword: data.specialQuestions[0]?.keyword,
      });
      setKeywordList(data.specialQuestions.map(({ keyword }) => keyword));
    }
  }, [data]);

  useEffect(() => {
    setData?.({
      basicQuestions,
      specialQuestions,
    });
  }, [basicQuestions, specialQuestions]);

  // 베이직 질문 수정
  const setBasicInputValue = (value: string, curIdx: number) => {
    setBasicQuestions((prev) =>
      prev.map((item, idx) => (idx == curIdx ? value : item))
    );
  };

  // 스페셜 질문 수정
  const setSpecialInputValue = (value: string, curIdx: number) => {
    setSpecialQuestions((prev) =>
      prev.map((item, keywordIdx) => {
        if (keywordIdx !== selectedKeyword.idx) {
          return item;
        }
        return {
          ...item,
          questions: item.questions.map((question, idx) =>
            idx === curIdx ? value : question
          ),
        };
      })
    );
  };

  // 수정 완료 버튼
  const handleEdit = () => {
    alert("수정 완료");
  };

  return (
    <FlexBox fullWidth justify="space-between">
      <FlexBox col isFlex1 gap={gap}>
        {/*  ========== 베이직 질문 ==========  */}
        <ContentSection title="베이직 질문" titleWidth={163}>
          <FlexBox col gap={12}>
            {basicQuestions.map((ques, idx) =>
              isEdit || ques ? (
                <FlexBox key={idx} gap={20} align="center">
                  {isEdit && <StatusChip idx={idx} />}
                  <B2 weight="sb" color={theme.color.gray[80]}>
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
          <ContentSection title="스페셜 질문 키워드 관리" titleWidth={163}>
            <InputDropdown
              type="keyword"
              list={keywordList}
              setList={setKeywordList}
            />
          </ContentSection>
        )}

        {/*  ========== 스페셜 질문 ==========  */}
        <ContentSection title="스페셜 질문" titleWidth={163}>
          <FlexBox col gap={24} style={{ width: "500px" }}>
            {specialQuestions.length == 0 ? (
              <B2 color={theme.color.gray[60]}>
                스페셜 질문의 키워드를 먼저 설정해주세요.
              </B2>
            ) : (
              <FlexBox align="center" gap={8} isFlexWrap>
                {specialQuestions.map(({ keyword }, idx) => (
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
              {selectedQuestions.length == 0
                ? Array(4)
                    .fill(null)
                    .map((_, idx) => (
                      <FlexBox key={idx} gap={20} align="center">
                        {isEdit && <StatusChip idx={idx} />}
                        <B2 weight="sb" color={theme.color.gray[80]}>
                          질문 {idx + 1}
                        </B2>
                        <Input disabled placeHolder="질문을 입력해주세요." />
                      </FlexBox>
                    ))
                : selectedQuestions.map((ques, idx) =>
                    isEdit || ques ? (
                      <FlexBox key={idx} gap={20} align="center">
                        {isEdit && <StatusChip idx={idx} />}
                        <B2 weight="sb" color={theme.color.gray[80]}>
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
      {hasEditBtn && (
        <EditBtn
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleEdit={handleEdit}
        />
      )}
    </FlexBox>
  );
};

export default Questions;
