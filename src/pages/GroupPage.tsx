import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "../assets/grouppage.png";

const GroupPageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GroupPage = () => {
  const { groupid } = useParams();

  useEffect(() => {
    console.log(groupid);
  }, []);

  return (
    <GroupPageContainer>
      <h1>group</h1>
    </GroupPageContainer>
  );
};

export default GroupPage;
