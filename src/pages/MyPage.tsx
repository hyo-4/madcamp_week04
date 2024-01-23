import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "../fonts/font.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user";
import letterImage from "../assets/letter-form.png";
import leftImage from "../assets/real-2.png";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import MyLetter from "../components/MyLetter";
import axios from "axios";

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

export default function MyPage() {
  const { username, userid } = useUserStore();
  const nav = useNavigate();
  const [organizationData, setOrganizationData] = useState<OrganizationData[]>(
    []
  );
  const [messageData, setMessageData] = useState<LetterData[]>([]);

  useEffect(() => {
    fetchGroupData();
    fetchMessageData();
  }, [userid]);

  const fetchGroupData = async () => {
    const userdata = userid;
    try {
      const response = await axios.post(
        "${process.env.API_URL}/api/user/organizations",
        { userId: userid },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data) setOrganizationData(response.data);
      console.log(response.data);
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
      if (Array.isArray(response.data)) {
        setMessageData(response.data);
      } else {
        console.error("Expected an array, but got:", response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const navToMain = () => {
    nav("/main");
  };
  return (
    <LayoutContainer>
      <PageHeader>
        <HomeIcon onClick={navToMain}>
          <FaArrowLeft />
        </HomeIcon>
        <Username>{username} 님 의 마이페이지</Username>
      </PageHeader>
      <PageContainer>
        <LeftContainer>
          <ScrollContainer>
            <GridContainer>
              {messageData
                ?.filter((data: LetterData) => data.isRead)
                .map((data: LetterData, index: number) => (
                  <MyLetter
                    key={index}
                    letterName={data.fromNickName}
                    letterGroup={data.organizationName}
                    letterContent={data.messageDescription}
                    fromNickName={data.fromNickName}
                  />
                ))}
            </GridContainer>
          </ScrollContainer>
        </LeftContainer>
        <RightContainer>
          <ScrollContainer2>
            <h2>내 그룹</h2>
            <GroupList>
              {organizationData.map((group, index) => (
                <GroupItem key={index}>
                  <GroupName>{group.organizationName}</GroupName>
                  <GroupCode>{group.organizationInviteNumber}</GroupCode>
                </GroupItem>
              ))}
            </GroupList>
          </ScrollContainer2>
        </RightContainer>
      </PageContainer>
    </LayoutContainer>
  );
}

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const HomeIcon = styled.div`
  font-size: 30px;
  color: #212121;
  margin: 0 15px;
  cursor: pointer;

  svg {
    margin-right: 10px;
  }
`;

const Username = styled.div`
  font-size: 2.5rem;
  font-family: "neodgm";
  margin-right: 1rem;
  margin-top: 1rem;
`;

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutContainer = styled.div`
  background-color: #ffeee2;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

const GroupList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GroupItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
`;

const GroupName = styled.span`
  font-weight: bold;
`;

const GroupCode = styled.span`
  font-family: monospace;
`;
