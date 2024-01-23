import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../fonts/font.css";
import axios from "axios";
import { useUserStore } from "../store/user";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState<string>("");
  const [inviteNumber, setinviteNumber] = useState("");
  const { userid } = useUserStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  useEffect(() => {
    setGroupName("");
    setinviteNumber("");
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    if (!groupName) {
      alert("그룹이름을 입력해주세요");
      return;
    }
    try {
      const postData = {
        organizationName: groupName,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/organization/create`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data.organizationInviteNumber);
        const newInviteNumber = response.data.organizationInviteNumber;
        const userdata = userid;
        setinviteNumber(newInviteNumber);
        if (userid != null && newInviteNumber != null) {
          handleJoin(newInviteNumber, userdata);
        }
        onClose();
      } else if (response.status === 400) {
        console.log("error");
      }
    } catch (error) {
      console.error("오류가 발생했습니다.", error);
    }
  };

  const handleJoin = async (newInviteNumber: any, userdata: any) => {
    try {
      const joinData = {
        userId: userdata,
        organizationInviteNumber: newInviteNumber,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/joinOrganization`,
        joinData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        onClose();
      } else if (response.status === 400) {
        console.log("error");
      }
    } catch (error) {
      console.error("오류가 발생했습니다.", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>그룹 추가</ModalTitle>
        <ModalInput
          type="text"
          placeholder="그룹 이름을 입력하세요"
          value={groupName}
          onChange={handleInputChange}
        />
        <ButtonContainer>
          <ModalButton onClick={handleSubmit}>추가</ModalButton>
          <ModalButton onClick={onClose}>닫기</ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: "neodgm";
`;

const ModalTitle = styled.h2`
  margin-bottom: 2rem;
`;

const ModalInput = styled.input`
  width: 15rem;
  padding: 10px;
  margin-bottom: 1rem;
  font-family: "neodgm";
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-family: "neodgm";
  margin: 5px;
  border: none;
  background: none;
  cursor: pointer;
`;
