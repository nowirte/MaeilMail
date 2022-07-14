import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import {
  Logo,
  LoginInput,
  LoginButton,
  LinkContainer,
} from './SignupFormElements';
import PersonalInfo from './PersonalInfo';

const SignupCard = styled.form`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 900px;
  height: 1100px;

  border-radius: 48px;

  background-color: white;
`;

const SignUp = () => {
  return (
    <SignupCard>
      <Logo src={logo} alt="Logo" />
      <PersonalInfo />
      <LoginInput placeholder="닉네임" />
      <LoginInput placeholder="이메일" type="email" />
      <LoginInput placeholder="비밀번호" type="password" />
      <LoginInput placeholder="비밀번호 확인" type="password" />
      <LoginButton>로그인</LoginButton>
      <LinkContainer>
        <Link to="/Login">로그인 페이지로 돌아가기</Link>
      </LinkContainer>
    </SignupCard>
  );
};

export default SignUp;
