import React, { useState, ChangeEvent, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import logogif from "../assets/logogif-4.gif";
import text from "../assets/textField.png";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import axios from "axios";
import "../fonts/font.css";
import API from "../services/api/index";
import { useUserStore } from "../store/user";

export default function LoginPage() {
  const nav = useNavigate();
  const { userid, setUserId, setUserName } = useUserStore();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    console.log(userid);
  }, []);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const goToSignup = () => {
    nav("/signup");
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert("ID와 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      const postData = {
        userName: username,
        password: password,
      };

      const response = await axios.post(
        "http://ec2-3-36-116-35.ap-northeast-2.compute.amazonaws.com:8080/api/user/login",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        const userid = response.data.userId;
        const username = response.data.name;
        setUserId(userid);
        setUserName(username);
        console.log(userid);
        console.log(username);
        nav("/main");
      } else if (response.status === 400) {
        console.log("error");
      }
    } catch (error) {
      console.error("오류가 발생했습니다.", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
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
            onKeyPress={handleKeyPress}
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
            onKeyPress={handleKeyPress}
            style={{ backgroundImage: `url(${text})` }}
          />
        </FormGroup>
        <ButtonsContainer>
          <StyledButton type="button" onClick={handleLogin}>
            Login
          </StyledButton>
          <StyledButton type="button" onClick={goToSignup}>
            Sign Up
          </StyledButton>
        </ButtonsContainer>
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
