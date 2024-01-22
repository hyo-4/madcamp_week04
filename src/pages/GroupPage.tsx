import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "../fonts/font.css";
import backgroundImage from "../assets/grouppage.png";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

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

const BackLink = styled.a`
  position: absolute;
  top: 10px; /* 조정할 수 있는 값 */
  left: 10px; /* 조정할 수 있는 값 */
  color: #000000;
  text-decoration: none;
  font-size: 22px;
  display: flex;
  align-items: center;
`;

const CenterContainer = styled.div`
  text-align: center;
  color: white;
  width: 30rem;
  height: 25rem;
  border-radius: 1rem;
  padding: 1rem;
  background-color: transparent;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE/Edge에서 스크롤바 숨기기 */

  &::-webkit-scrollbar {
    /* Webkit(Chrome, Safari)에서 스크롤바 숨기기 */
    display: none;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: 22px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 10px;
    margin: 5px 0;
  }
`;

const GroupPage = () => {
  const nav = useNavigate();
  const { groupid } = useParams();
  const dummyData = [
    { memberid: 1, membername: "허진서" },
    { memberid: 2, membername: "백승효" },
    { memberid: 3, membername: "황승찬" },
    { memberid: 4, membername: "송주호" },
    { memberid: 5, membername: "이서윤" },
    { memberid: 6, membername: "김자누" },
    { memberid: 1, membername: "허진서" },
    { memberid: 2, membername: "백승효" },
    { memberid: 3, membername: "황승찬" },
    { memberid: 4, membername: "송주호" },
    { memberid: 5, membername: "이서윤" },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");

  const handleLiClick = (memberid: any) => {
    nav(`/group/${groupid}/member/${memberid}`);
  };

  useEffect(() => {
    console.log(groupid);
  }, []);

  return (
    <GroupPageContainer>
      <BackLink onClick={() => nav(-1)}>
        <FiArrowLeft /> 뒤로가기
      </BackLink>
      <h1>몰캠 4분반</h1>
      <CenterContainer>
        <ul>
          {dummyData.map((member) => (
            <li
              key={member.memberid}
              onClick={() => handleLiClick(member.memberid)}
            >
              {member.membername}
            </li>
          ))}
        </ul>
      </CenterContainer>
      {/* {showModal && (
        <Modal
          membername={selectedMember}
          onClose={() => setShowModal(false)}
        />
      )} */}
    </GroupPageContainer>
  );
};

export default GroupPage;
