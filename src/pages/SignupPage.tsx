import React, { useState } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import backgroundimage from "../assets/signup2.png";
import btnimage from "../assets/signinbtn.png";
import "../fonts/font.css";
import text from "../assets/textField.png";

interface SignupProps {}

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "neodgm";
  height: 100vh;
  background-image: url(${backgroundimage});
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
`;

const InputLabel = styled.label`
  display: block;
  font-weight: bold;
  color: #a1a1a1;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  margin: 10px 0;
  padding: 10px;
  outline: none;
  background-size: 100% 100%;
  width: 20rem;
  background-image: url(${text});
`;

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const SignupButton = styled.button`
  cursor: pointer;
  margin-bottom: 5rem;
  width: 7rem;
  border: none;
  padding: 0.5rem 2rem;
  background-size: 100% 100%;
  background-image: url(${btnimage});
  font-family: "neodgm";
  font-size: 1rem;
  color: #828282;
`;

export default function SignupPage(props: SignupProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignup = () => {
    // 모든 입력란이 채워져 있는지 확인
    if (id && name && password) {
      alert("회원가입이 성공적으로 완료되었습니다.");
    } else {
      // 하나 이상의 입력란이 비어있을 때, 알림 창 표시
      alert("모든 입력란을 작성해주세요.");
    }
  };

  return (
    <SignupContainer>
      <BackButton onClick={() => window.history.back()}>
        <IoMdArrowRoundBack size="20px" />
      </BackButton>
      <div>
        <InputLabel>ID </InputLabel>
        <Input
          type="text"
          placeholder="아이디를 입력하세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        <InputLabel>NAME</InputLabel>
        <Input
          type="text"
          placeholder="사용자 이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <InputLabel>PASSWORD</InputLabel>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <SignupButton onClick={handleSignup}>Signup</SignupButton>
    </SignupContainer>
  );
}
