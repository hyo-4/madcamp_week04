import React, { useState, ChangeEvent } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import logogif from "../assets/logogif-4.gif";
import text from "../assets/textField.png";
import logoImage from "../assets/logo.png";
import axios from "axios";
import "../fonts/font.css";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // 여기에 로그인 처리 로직을 추가합니다.
    // username과 password를 사용하여 서버로 요청을 보내고 인증을 확인하는 등의 작업을 수행합니다.
    // 이 예제에서는 간단히 콘솔에 입력된 값을 출력하는 것으로 대체합니다.
    axios
      .post("http://ec2-3-36-116-35.ap-northeast-2.compute.amazonaws.com:8080/api/user/login", {
        username: username,
        password: password,
      })
      .then((res)=> {
        console.log(res.data);
      })
    
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <LoginContainer>
      <LoginForm>
        <img
          src={logogif}
          alt="logo"
          style={{ width: "250px", height: "250px" }}
        ></img>

        <FormGroup>
          <label
            htmlFor="username"
            style={{ fontSize: "22px", color: "white" }}
          >
            ID
          </label>
          <StyledInput
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            style={{ backgroundImage: `url(${text})` }}
          />
        </FormGroup>
        <FormGroup>
          <label
            htmlFor="username"
            style={{ fontSize: "22px", color: "white" }}
          >
            PW
          </label>
          <StyledInput
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ backgroundImage: `url(${text})` }}
          />
        </FormGroup>
        <StyledButton type="button" onClick={handleLogin}>
          Login
        </StyledButton>
        <StyledButton type="button">Sign Up</StyledButton>
      </LoginForm>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  background-color: #ffd5c3;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "neodgm";
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 300px;
  background-size: 100% 100%;
  border-radius: 10px;
  padding: 10px;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: "neodgm";
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }
`;
