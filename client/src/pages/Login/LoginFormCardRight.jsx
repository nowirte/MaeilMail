import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  LoginFormInput,
  LoginFormButton,
  LinkContainer,
  Logo,
  GoogleLogo,
  LoginGoogleButton,
} from './LoginFormElements';
import logo from './logo.png';
import googleLogo from './googleLogo.png';

const FormCard = styled.form`
  width: 700px;
  height: 800px;
  background-color: white;
  border-top-right-radius: 48px;
  border-bottom-right-radius: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoginForm = () => {
  return (
    <FormCard>
      <Logo src={logo} alt="Logo" />
      <LoginFormInput placeholder="이메일" type="email" />
      <LoginFormInput placeholder="비밀번호" type="password" />
      <LoginFormButton>로그인</LoginFormButton>
      <LinkContainer>
        <Link to="/home">비밀번호 찾기</Link>
        <Link to="/signup">회원가입</Link>
      </LinkContainer>
      <LoginGoogleButton>
        <GoogleLogo src={googleLogo} alt="googleLogo" />
        Google
      </LoginGoogleButton>
      <span>SNS 로그인/회원가입</span>
    </FormCard>
  );
};

export default LoginForm;
