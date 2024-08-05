import React, { SetStateAction, useState } from "react";
import { styled } from "styled-components";
import { fadeIn, fadeOut } from "../../styles/keyframes";
import ScrollLock from "../../utils/ScrollLock";

interface Modal {
  children: React.ReactNode;
  setIsOpenModal: React.Dispatch<SetStateAction<boolean>>;
  isClickDisabled?: boolean;
}

const Modal = ({ children, setIsOpenModal, isClickDisabled }: Modal) => {
  const [visible, setVisible] = useState(true);

  const handleCloseModal = () => {
    if (isClickDisabled) return;

    setVisible(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 150);
  };

  return (
    <ModalOverlay onClick={handleCloseModal} $visible={visible}>
      <Container onClick={(e) => e.stopPropagation()}>{children}</Container>
      <ScrollLock /> {/* 화면 스크롤 방지기능 */}
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div<{ $visible: boolean }>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: ${({ $visible }) => ($visible ? "hidden" : "auto")};

  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
`;

const Container = styled.div`
  padding: 60px 100px;
  height: fit-content;
  z-index: 101;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 14px 20px 0px rgba(33, 33, 33, 0.05);
`;
