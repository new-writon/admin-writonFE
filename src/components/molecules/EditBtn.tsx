import { Button, FlexBox } from "../atoms";

interface EditBtn {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: () => void;
  handleCancel?: () => void;
}

const EditBtn = ({ isEdit, setIsEdit, handleEdit, handleCancel }: EditBtn) => {
  const onClickEdit = () => {
    handleEdit();
    setIsEdit(false);
  };

  const onClickCancel = () => {
    handleCancel?.();
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <FlexBox gap={8}>
          <Button size="md" type="empty" onClick={onClickCancel}>
            취소
          </Button>
          <Button size="md" type="dark" onClick={onClickEdit}>
            수정 완료
          </Button>
        </FlexBox>
      ) : (
        <Button
          size="md"
          type="dark"
          editIcon
          onClick={() => setIsEdit(!isEdit)}
        >
          수정
        </Button>
      )}
    </>
  );
};

export default EditBtn;
