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
import API from "../services/api/index";
import Modal from "./AddGroupPage";

const sortDummyLetterDataByTime = (
  data: { name: string; time: string; group: string }[]
): { name: string; time: string; group: string }[] => {
  return [...data].sort((a, b) => {
    return new Date(a.time).getTime() - new Date(b.time).getTime();
  });
};

const MainPage: React.FC = () => {
  const { userid, setUserId, username, setUserName } = useUserStore();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const nav = useNavigate();
  const DummyData = [
    { groupid: "1", groupname: "SMWU 20학번" },
    { groupid: "2", groupname: "2-14반" },
    { groupid: "3", groupname: "충남여고" },
    { groupid: "4", groupname: "몰캠4분반" },
    { groupid: "5", groupname: "dummy" },
    { groupid: "6", groupname: "dummy" },
    { groupid: "7", groupname: "dummy" },
    { groupid: "8", groupname: "dummy" },
    { groupid: "9", groupname: "dummy" },
    { groupid: "10", groupname: "dummy" },
    { groupid: "11", groupname: "dummy" },
    { groupid: "12", groupname: "dummy" },
    { groupid: "13", groupname: "dummy" },
    { groupid: "14", groupname: "dummy" },
    { groupid: "15", groupname: "dummy" },
    { groupid: "16", groupname: "dummy" },
    { groupid: "17", groupname: "dummy" },
    { groupid: "18", groupname: "dummy" },
    { groupid: "19", groupname: "dummy" },
    { groupid: "20", groupname: "dummy" },
  ];

  const DummyLetterData = [
    { name: "허가네장녀3", time: "2024-01-25T21:00:00", group: "4분반" },
    { name: "허가네장녀3", time: "2024-01-26T21:30:00", group: "4분반" },
  ];
  const sortedDummyLetterData = sortDummyLetterDataByTime(DummyLetterData);

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

  return (
    <>
      <LayoutContainer>
        <ButtonsContainer>
          <MyPageBtn onClick={navToMypage}>마이페이지</MyPageBtn>
          <AddGroupBtn onClick={openModal}>그룹 추가하기</AddGroupBtn>
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </ButtonsContainer>
        <PageContainer>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
          <LeftContainer>
            <ScrollContainer>
              <GridContainer>
                {DummyData.map((group, index) => (
                  <Folder
                    key={index}
                    groupName={group.groupname}
                    groupId={group.groupid}
                  />
                ))}
              </GridContainer>
            </ScrollContainer>
          </LeftContainer>
          <RightContainer>
            <ScrollContainer2>
              <h1>Lock</h1>
              {sortedDummyLetterData.map((letterData, index) => (
                <Lockedletter
                  key={index}
                  personName={letterData.name}
                  timedata={letterData.time}
                  groupname={letterData.group}
                />
              ))}
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
