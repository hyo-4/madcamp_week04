import React, { useState, ChangeEvent } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import logogif from "../assets/logogif-4.gif";
import text from "../assets/textField.png";
import logoImage from "../assets/logo.png";
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
