import React from "react";
import styled from "styled-components";
import letterImage from "../assets/openletter.png";
import "../fonts/font.css";

const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "neodgm";
  font-size: 20px;
  align-items: center;
`;

const LetterImage = styled.img`
  width: 100px;
  height: 100px;
`;

interface MyLetterProps {
  letterName: string;
  letterGroup: string;
}

const MyLetter: React.FC<MyLetterProps> = ({ letterName, letterGroup }) => {
  return (
    <LetterContainer>
      <LetterImage src={letterImage} alt={letterName} />
      <div>{letterName}</div>
      <div>{letterGroup}</div>
    </LetterContainer>
  );
};

export default MyLetter;
