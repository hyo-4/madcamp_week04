import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "../fonts/font.css";
import backgroundImage from "../assets/grouppage.png";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { useUserStore } from "../store/user";

interface UserData {
  userId: number;
  name: string;
}

const GroupPage = () => {
  const nav = useNavigate();
  const { userid } = useUserStore();
  const { groupid } = useParams();
  const [userData, setUserData] = useState<UserData[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");

  const handleLiClick = (memberid: any) => {
    nav(`/group/${groupid}/member/${memberid}`);
  };

  useEffect(() => {
    console.log(groupid);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const groupdata = groupid;
    try {
      const response = await axios.post(
        `http://43.200.25.159/api/organization/users`,
        { organizationId: groupid },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const DeleteUser = async () => {
    const groupdata = groupid;
    const userdata = userid;
    try {
      const response = await axios.delete(
        `http://43.200.25.159/api/user-organization/remove`,
        {
          params: {
            userId: userdata,
            organizationId: groupdata,
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    nav("/main");
  };

  return (
    <GroupPageContainer>
      <BackLink onClick={() => nav(-1)}>
        <FiArrowLeft /> 뒤로가기
      </BackLink>
      <DeleteMember onClick={DeleteUser}>그룹 나가기</DeleteMember>
      <CenterContainer>
        <ul>
          {userData.map((member) => (
            <li
              key={member.userId}
              onClick={() => handleLiClick(member.userId)}
            >
              {member.name}
            </li>
          ))}
        </ul>
      </CenterContainer>
    </GroupPageContainer>
  );
};

export default GroupPage;

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
  top: 10px;
  left: 1cap;
  color: #000000;
  text-decoration: none;
  font-size: 22px;
  display: flex;
  align-items: center;
`;

const DeleteMember = styled.a`
  position: absolute;
  top: 20px;
  right: 25px;
  color: #000000;
  text-decoration: none;
  font-size: 22px;
  display: flex;
  align-items: center;
  &:hover {
    transform: scale(1.1);
    color: red;
  }
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
