import React, { useEffect, useState } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/grouppage.png";
import letterImage from "../assets/letter-form.png";
import lockimage from "../assets/letter.png";
import openimage from "../assets/openletter.png";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

interface LetterData {
  letterName: string;
  letterTime: string;
  isRead: boolean;
}
const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <ModalBackground isOpen={isOpen}>
      <ModalContent>
        <h2>편지 작성</h2>
        <form>
          <div>
            <label htmlFor="senderName">보내는 사람</label>
            <input type="text" id="senderName" />
          </div>
          <div>
            <label htmlFor="letterContent">편지 내용</label>
            <textarea
              id="letterContent"
              placeholder="편지 내용을 입력하세요"
            ></textarea>
          </div>
          <div>
            <label htmlFor="letterTime">편지가 도착할 시간</label>
            <input type="datetime-local" id="letterTime" />
          </div>
          <button type="submit">편지 보내기</button>
        </form>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalBackground>
  );
};

const MemberPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dummyData = [
    { letterName: "익명", letterTime: "2024-01-25T21:00:00", isRead: false },
    { letterName: "익명", letterTime: "2024-01-25T21:00:00", isRead: false },
    { letterName: "익명", letterTime: "2024-01-20T21:00:00", isRead: true },
    { letterName: "익명", letterTime: "2024-01-25T21:00:00", isRead: false },
    { letterName: "익명", letterTime: "2024-01-25T21:00:00", isRead: false },
    { letterName: "익명", letterTime: "2024-01-20T21:00:00", isRead: true },
    { letterName: "익명", letterTime: "2024-01-25T21:00:00", isRead: false },
    { letterName: "익명", letterTime: "2024-01-25T21:00:00", isRead: false },
    { letterName: "익명", letterTime: "2024-01-20T21:00:00", isRead: true },
    { letterName: "익명", letterTime: "2024-01-25T21:00:00", isRead: false },
  ];

  const renderLetters = () => {
    return dummyData.map((letter, index) => {
      const letterDeadline = new Date(letter.letterTime);
      const timeLeft = letterDeadline.getTime() - currentTime.getTime();
      const isExpired = timeLeft < 0;

      const formattedTimeLeft = isExpired
        ? ""
        : `${Math.floor(timeLeft / (1000 * 60 * 60))}시간 ${Math.floor(
            (timeLeft / (1000 * 60)) % 60
          )}분 ${Math.floor((timeLeft / 1000) % 60)}초`;

      return (
        <LetterContainer key={index}>
          <img src={letter.isRead ? openimage : lockimage} alt="Letter" />
          <span>{letter.letterName}</span>
          <span>{formattedTimeLeft}</span>
        </LetterContainer>
      );
    });
  };

  return (
    <GroupPageContainer>
      <BackLink onClick={() => nav(-1)}>
        <FiArrowLeft /> 뒤로가기
      </BackLink>
      <CenterContainer>
        {renderLetters()}
        <Button onClick={openModal}>편지 작성</Button>
      </CenterContainer>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </GroupPageContainer>
  );
};

export default MemberPage;

const GroupPageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  color: white;
  background-repeat: no-repeat;
  background-position: center;
  font-family: "neodgm";
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CenterContainer = styled.div`
  text-align: center;
  color: white;
  max-width: 50rem;
  width: 100%;
  height: 25rem;
  border-radius: 1rem;
  padding: 1rem;
  background-color: transparent;
  overflow-y: scroll;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 20px;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 0.5rem;
    height: 20rem;
  }
`;

const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 100px;
    height: 70px;
  }

  span {
    margin-top: 10px;
  }
`;

const BackLink = styled.a`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #000000;
  text-decoration: none;
  font-size: 22px;
  display: flex;
  align-items: center;
`;

const ModalBackground = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0; /* 가로 방향 가운데 정렬을 위해 추가 */
  bottom: 0; /* 세로 방향 가운데 정렬을 위해 추가 */
  background-image: url(${letterImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-color: rgba(0, 0, 0, 0.7);
  background-size: 50%;
  z-index: 1;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 8px;
  color: black;
  z-index: 2;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      margin-bottom: 10px;
      label {
        font-size: 16px;
        margin-right: 10px;
      }
      input[type="text"],
      textarea,
      input[type="datetime-local"] {
        width: 100%;
        padding: 5px;
        font-size: 14px;
        border: none; /* 테두리 없음 */
        background: transparent; /* 투명한 배경 */
      }
      textarea {
        resize: none; /* 크기 조절 비활성화 */
      }
    }

    button[type="submit"] {
      margin-top: 10px;
      background-color: transparent;
      color: #000000;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.2s;
      &:hover {
        color: red;
      }
    }
  }

  button {
    margin-top: 10px;
    font-family: "neodgm";
    font-size: 20px;
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 20px;
  font-family: "neodgm";
  font-size: 30px;
  border: none;
  background: transparent;
  right: 20px;
`;
