import React, { FC } from "react";
import styled from "styled-components";

interface ModalProps {
  membername: string;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 2rem;
  color: black;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 16px;
  margin: 1rem;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const Modal: FC<ModalProps> = ({ membername, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{membername}님에게 편지를 쓰시겠습니까?</h2>
        <StyledButton>편지 쓰기</StyledButton>
        <StyledButton onClick={onClose}>취소</StyledButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
