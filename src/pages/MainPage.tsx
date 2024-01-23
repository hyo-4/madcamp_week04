import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/user";
import backgroundimage from "../assets/image8.png";
import { useNavigate } from "react-router-dom";
import leftImage from "../assets/real-2.png";
import lockimage from "../assets/letter.png";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import Folder from "../components/folder";
import "../fonts/font.css";
import Lockedletter from "../components/Lockedletter";
import Modal from "./AddGroupPage";
import axios from "axios";
import JoinGroupModal from "../components/InvitedGroup";

const sortDummyLetterDataByTime = (data: any): { data: LetterData[] }[] => {
  return [...data].sort((a, b) => {
    return (
      new Date(a.messageTime).getTime() - new Date(b.messageTime).getTime()
    );
  });
};

interface OrganizationData {
  organizationId: number;
  organizationName: string | null;
  organizationInviteNumber: string | null;
}
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

const MainPage: React.FC = () => {
  const { userid, setUserId, username, setUserName } = useUserStore();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isJoinGroupModalOpen, setJoinGroupModalOpen] = useState(false);
  const [organizationData, setOrganizationData] = useState<OrganizationData[]>(
    []
  );
  const [messageData, setMessageData] = useState<LetterData[]>([]);
  let filteredAndSortedMessageData: LetterData[] = [];

  useEffect(() => {
    fetchGroupData();
    fetchMessageData();
  }, [userid]);

  useEffect(() => {}, [isModalOpen, isJoinGroupModalOpen]);

  const fetchGroupData = async () => {
    try {
      const response = await axios.post(
        "http://ec2-3-36-116-35.ap-northeast-2.compute.amazonaws.com:8080/api/user/organizations",
        { userId: userid },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setOrganizationData(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchMessageData = async () => {
    try {
      const response = await axios.post(
        "http://ec2-3-36-116-35.ap-northeast-2.compute.amazonaws.com:8080/api/messages/show",
        { userId: userid },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMessageData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const nav = useNavigate();

  const handleLogout = () => {
    setUserId("");
    setUserName("");
    nav("/");
  };

  const navToMypage = () => {
    nav("/mypage");
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openJoinGroupModal = () => {
    setJoinGroupModalOpen(true);
  };

  const closeJoinGroupModal = () => {
    setJoinGroupModalOpen(false);
  };

  if (Array.isArray(messageData)) {
    filteredAndSortedMessageData = messageData
      .filter((letter) => !letter.isRead)
      .sort(
        (a, b) =>
          new Date(a.messageTime).getTime() - new Date(b.messageTime).getTime()
      );
  } else {
    console.error("messageData is not an array");
  }

  return (
    <>
      <LayoutContainer>
        <ButtonsContainer>
          <MyPageBtn onClick={navToMypage}>마이페이지</MyPageBtn>
          <AddGroupBtn onClick={openJoinGroupModal}>그룹 참여하기</AddGroupBtn>
          <AddGroupBtn onClick={openModal}>그룹 추가하기</AddGroupBtn>
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </ButtonsContainer>
        <PageContainer>
          <JoinGroupModal
            isOpen={isJoinGroupModalOpen}
            onClose={closeJoinGroupModal}
          />
          <Modal isOpen={isModalOpen} onClose={closeModal} />
          <LeftContainer>
            <ScrollContainer>
              <GridContainer>
                {organizationData.map((org, index) => (
                  <Folder
                    key={index}
                    groupName={org.organizationName ?? "Unnamed Group"}
                    groupId={org.organizationId.toString()}
                  />
                ))}
              </GridContainer>
            </ScrollContainer>
          </LeftContainer>
          <RightContainer>
            <ScrollContainer2>
              <h1>Lock</h1>
              {Array.isArray(filteredAndSortedMessageData) &&
              filteredAndSortedMessageData.length > 0 ? (
                filteredAndSortedMessageData.map((letterData, index) => (
                  <Lockedletter
                    key={index}
                    personName={letterData.fromNickName}
                    timedata={letterData.messageTime}
                    groupname={letterData.organizationName}
                  />
                ))
              ) : (
                <p>No messages to display</p>
              )}
            </ScrollContainer2>
          </RightContainer>
        </PageContainer>
      </LayoutContainer>
    </>
  );
};

export default MainPage;

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutContainer = styled.div`
  background: linear-gradient(to bottom, #d3f3ff, #ffd5c3);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const MyPageBtn = styled.button`
  background: none;
  border: none;
  display: flex;
  font-family: "neodgm";
  font-size: 22px;
  margin-top: 1rem;
  padding: 1rem;
  transition:
    color 0.1s,
    transform 0.1s;

  &:hover {
    color: #ffffff;
    transform: scale(1.1);
  }
`;

const AddGroupBtn = styled.button`
  display: flex;
  background: none;
  border: none;
  display: flex;
  font-family: "neodgm";
  font-size: 22px;
  margin-top: 1rem;
  padding: 1rem;
  transition:
    color 0.1s,
    transform 0.1s;

  &:hover {
    color: #ffffff;
    transform: scale(1.1);
  }
`;

const LogoutBtn = styled.button`
  display: flex;
  background: none;
  border: none;
  display: flex;
  font-family: "neodgm";
  font-size: 22px;
  margin-top: 1rem;
  margin-right: 2rem;
  padding: 1rem;
  transition:
    color 0.1s,
    transform 0.1s;

  &:hover {
    color: #ffffff;
    transform: scale(1.1);
  }
`;

const LeftContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  flex: 8;
  margin-right: 1rem;
  border-radius: 10px;
  padding-top: 2rem;
  height: 80vh;
  color: black;
  text-align: center;
  margin-left: 2rem;
  background-size: cover;
  background-image: url(${leftImage});
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.7);
`;

const ScrollContainer = styled.div`
  width: 99%;
  height: 80%;
  margin-top: 5rem;
  overflow: auto;
`;

const ScrollContainer2 = styled.div`
  width: 99%;
  height: 100%;
  overflow: auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1rem;
`;

const RightContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  flex: 2;
  margin-left: 1rem;
  margin-right: 2rem;
  font-family: "neodgm";
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 80vh;
  border-radius: 10px;

  color: black;
  text-align: center;
`;
