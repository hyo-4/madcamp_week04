// JoinGroupModal.tsx
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useUserStore } from "../store/user";

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ isOpen, onClose }) => {
  const [groupCode, setGroupCode] = useState<string>("");
  const { userid } = useUserStore();

  if (!isOpen) return null;

  const handleJoin = async () => {
    const userdata = userid;
    try {
      const joinData = {
        userId: userdata,
        organizationInviteNumber: groupCode,
      };

      const response = await axios.post(
        `http://43.200.25.159/api/user/joinOrganization`,
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

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>그룹 참여하기</ModalTitle>
        <ModalInput
          type="text"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
          placeholder="그룹 참여 코드 입력"
        />
        <ButtonContainer>
          <ModalButton onClick={handleJoin}>참여하기</ModalButton>
          <ModalButton onClick={onClose}>닫기</ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default JoinGroupModal;

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
  border: none; /* 테두리 제거 */
  background: none; /* 배경 제거 */
  cursor: pointer;
`;
