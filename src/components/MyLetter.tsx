import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import letterImage from "../assets/openletter.png";
import modalBackgroundImage from "../assets/letter-form.png"; // 모달 배경 이미지 경로
import "../fonts/font.css";
import { IoClose } from "react-icons/io5";

const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "neodgm";
  font-size: 20px;
  align-items: center;
  cursor: pointer;
`;

const LetterImage = styled.img`
  width: 100px;
  height: 100px;
`;

const Modal = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: "neodgm";
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); // 불투명 배경
`;

const ModalContent = styled.div`
  background-image: url(${modalBackgroundImage});
  position: relative; // Set position relative
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 20px;
  font-family: "neodgm";
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NickName = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  margin-top: 5rem;
  font-size: 22px;
  margin-right: 3rem;
`;

const MessageContent = styled.div`
  margin: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-family: "neodgm";
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  in-top: 5rem;
`;

interface MyLetterProps {
  letterName: string;
  letterGroup: string;
  letterContent: string;
  fromNickName: string;
}

const MyLetter: React.FC<MyLetterProps> = ({
  letterName,
  letterGroup,
  letterContent,
  fromNickName,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <LetterContainer onClick={toggleModal}>
        <LetterImage src={letterImage} alt={letterName} />
        <div>{letterName}</div>
        <div>{letterGroup}</div>
      </LetterContainer>
      <Modal show={showModal} ref={modalRef}>
        <ModalContent>
          <MessageContent>{letterContent}</MessageContent>
          <NickName>{fromNickName}</NickName>
          <CloseButton onClick={toggleModal}>
            <IoClose />
          </CloseButton>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyLetter;
