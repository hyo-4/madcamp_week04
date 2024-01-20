import React from "react";
import foldericon from "../assets/y_folder.png";
import "../fonts/font.css";
import styled from "styled-components";

interface GroupProps {
  groupName: string;
}

const Folder: React.FC<GroupProps> = ({ groupName }) => {
  return (
    <div>
      <img
        src={foldericon}
        alt={groupName}
        style={{ width: "100px", height: "100px" }}
      />
      <GroupNameText>{groupName}</GroupNameText>
    </div>
  );
};

export default Folder;

const GroupNameText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 23px;
  color: #494949;
  font-family: "neodgm";
`;
