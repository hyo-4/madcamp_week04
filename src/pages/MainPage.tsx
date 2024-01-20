import React from "react";
import { useCountStore } from "../store/count";
import backgroundimage from "../assets/image8.png";
import leftImage from "../assets/real-2.png";
import rightImage from "../assets/realphone02.png";
import lockimage from "../assets/letter.png";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import Folder from "../components/folder";
import "../fonts/font.css";
import Lockedletter from "../components/Lockedletter";

const sortDummyLetterDataByTime = (
  data: { name: string; time: string; group: string }[]
): { name: string; time: string; group: string }[] => {
  return [...data].sort((a, b) => {
    return new Date(a.time).getTime() - new Date(b.time).getTime();
  });
};

const MainPage: React.FC = () => {
  const username = "user";
  const DummyData = [
    "CS 20학번",
    "2-14반",
    "00중",
    "몰캠4분반",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
  ];

  const DummyLetterData = [
    { name: "허가네장녀", time: "2024-01-20T21:30:00", group: "4분반" },
    { name: "허가네장녀3", time: "2024-01-20T23:30:00", group: "4분반" },
    { name: "허가네장녀3", time: "2024-01-20T22:30:00", group: "4분반" },
    { name: "허가네장녀3", time: "2024-01-21T21:30:00", group: "4분반" },
    { name: "허가네장녀3", time: "2024-01-21T21:30:00", group: "4분반" },
    { name: "허가네장녀3", time: "2024-01-21T21:30:00", group: "4분반" },
    { name: "허가네장녀3", time: "2024-01-21T21:30:00", group: "4분반" },
    { name: "허가네장녀3", time: "2024-01-21T21:30:00", group: "4분반" },
    { name: "허가네장녀3", time: "2024-01-21T21:30:00", group: "4분반" },
  ];
  const sortedDummyLetterData = sortDummyLetterDataByTime(DummyLetterData);

  return (
    <>
      <LayoutContainer>
        <ButtonsContainer>
          <MyPageBtn>마이페이지</MyPageBtn>
          <AddGroupBtn>그룹 추가하기</AddGroupBtn>
        </ButtonsContainer>
        <PageContainer>
          <LeftContainer>
            <ScrollContainer>
              <GridContainer>
                {DummyData.map((groupName, index) => (
                  <Folder key={index} groupName={groupName} />
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
  background: linear-gradient(
    to bottom,
    #c0e1ee,
    #f1e0e6
  ); /* 파스텔톤 파란색 그라데이션 */
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
`;

const AddGroupBtn = styled.button`
  display: flex;
  background: none;
  border: none;
  display: flex;
  font-family: "neodgm";
  font-size: 22px;
  margin-top: 1rem;
  margin-right: 2rem;
  padding: 1rem;
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
  //background-image: url(${rightImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 80vh;
  border-radius: 10px;

  color: black;
  text-align: center;
`;
