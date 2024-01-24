import React, { useEffect, useState } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/grouppage.png";
import letterImage from "../assets/letter-form.png";
import lockimage from "../assets/letter.png";
import openimage from "../assets/openletter.png";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../store/user";
import { IoClose } from "react-icons/io5";
import axios from "axios";

interface LetterData {
  messageId: number;
  fromNickName: string;
  messageDescription: string;
  messageTime: string;
  isRead: boolean;
  toId: number;
  fromId: number;
  organizationId: number;
  organizationName: string;
}

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [fromNickName, setFromNickName] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [messageTime, setMessageTime] = useState("");
  const { userid } = useUserStore();
  const params = useParams();
  const { memberid, groupid } = params;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !fromNickName.trim() ||
      !messageDescription.trim() ||
      !messageTime.trim()
    ) {
      alert("모든 내용을 채워주세요.");
      return;
    }
    const userData = userid;
    const payload = {
      fromNickName,
      messageDescription,
      messageTime,
      isRead: false,
      toId: memberid,
      fromId: userData,
      organizationId: groupid,
    };

    try {
      const response = await axios.post(
        "http://43.200.25.159/api/messages/write",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      onClose();
    } catch (error) {
      console.error("Error sending letter:", error);
    }
  };

  return (
    <ModalBackground isOpen={isOpen}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="letterTime">편지가 도착할 시간</label>
            <input
              type="datetime-local"
              id="letterTime"
              value={messageTime}
              onChange={(e) => setMessageTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="letterContent">편지 내용</label>
            <LetterContent
              id="letterContent"
              placeholder="편지 내용을 입력하세요"
              value={messageDescription}
              onChange={(e) => setMessageDescription(e.target.value)}
            ></LetterContent>
          </div>

          <div>
            <label htmlFor="senderName">From </label>
            <input
              type="text"
              id="senderName"
              placeholder="보내는 사람의 이름을 입력해주세요"
              value={fromNickName}
              onChange={(e) => setFromNickName(e.target.value)}
            />
          </div>
        </form>
        <button type="submit" onClick={handleSubmit}>
          편지 보내기
        </button>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalBackground>
  );
};

const MemberPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLetterOpen, setisLetterOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { userid } = useUserStore();
  const params = useParams();
  const { groupid, memberid } = params;
  const [messageData, setMessageData] = useState<LetterData[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchMessageData();
  }, [userid]);

  const fetchMessageData = async () => {
    const userdata = memberid;
    try {
      const response = await axios.post(
        `http://43.200.25.159/api/messages/group`,
        { userId: userdata, organizationId: groupid },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMessageData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openModalWithDescription = (description: string) => {
    setModalContent(description);
    setisLetterOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    nav(0);
  };

  const closeLetter = () => {
    setisLetterOpen(false);
    nav(0);
  };

  const ReadMessage = async (messageid: number) => {
    try {
      const response = await axios.put(
        "http://43.200.25.159/api/messages/read",
        { messageId: messageid },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("compelte");
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const renderLetters = () => {
    return messageData.map((letter, index) => {
      const userdata = Number(userid);
      const letterDeadline = new Date(letter.messageTime);
      const timeLeft = letterDeadline.getTime() - currentTime.getTime();
      const isExpired = timeLeft < 0;

      const formattedTimeLeft = isExpired
        ? ""
        : `${Math.floor(timeLeft / (1000 * 60 * 60))}시간 ${Math.floor(
            (timeLeft / (1000 * 60)) % 60
          )}분 ${Math.floor((timeLeft / 1000) % 60)}초`;
      const handleClick = () => {
        if (userdata === letter.toId && isExpired) {
          openModalWithDescription(letter.messageDescription);
          ReadMessage(letter.messageId);
        } else if (userdata === letter.toId) {
          alert("좀 더 기다리세요");
        } else {
          alert("편지에 대한 접근 권한이 없습니다.");
        }
      };

      return (
        <LetterContainer key={index} onClick={handleClick}>
          <img src={letter.isRead ? openimage : lockimage} alt="Letter" />
          <span>{letter.fromNickName}</span>
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
        {Array.isArray(messageData) && renderLetters()}
        <Button onClick={openModal}>편지 작성</Button>
      </CenterContainer>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <OpenLetter
        isLetterOpen={isLetterOpen}
        closeLetter={closeLetter}
        messageDescription={modalContent}
      />
    </GroupPageContainer>
  );
};

export default MemberPage;

const OpenLetter: React.FC<{
  isLetterOpen: boolean;
  closeLetter: () => void;
  messageDescription?: string;
}> = ({ isLetterOpen, closeLetter, messageDescription }) => {
  return (
    <ModalBackground isOpen={isLetterOpen}>
      <CloseButton onClick={closeLetter}>X</CloseButton>
      <LetterText>
        {messageDescription && <p>{messageDescription}</p>}
      </LetterText>
    </ModalBackground>
  );
};

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
  right: 0;
  bottom: 0;
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
  }

  button[type="submit"] {
    margin-top: 10px;
    background-color: transparent;
    color: #000000;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    transition: background-color 0.2s;
    &:hover {
      color: #ff9191;
    }
  }

  button {
    margin-top: 10px;
    font-family: "neodgm";
    font-size: 20px;
    border: none;
    margin: 1rem;
    background: transparent;
    cursor: pointer;
    &:hover {
      color: #ff9191;
    }
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
  &:hover {
    color: #ff0e0e;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10%;
  right: 30%;
  font-weight: 800;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;

  @media (max-width: 1300px) {
    top: 70%;
    right: 50%;
    transform: translate(50%, -50%);
  }
`;

const LetterContent = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 5px;
  font-size: 14px;
  border: none; /* 테두리 없음 */
  background: transparent; /* 투명한 배경 */
`;

const LetterText = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 80%;
  overflow: auto;
  padding: 20px;
  color: black;
`;
