import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import googleLogo from './googleLogo.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 90%;
  margin-top: 150px;
`;

const LoginInput = styled.input`
  width: 30vw;
  height: 90px;
  margin: 10px;
  padding: 0 0 0 20px;

  border: 4px solid #a9a9a9;
  border-radius: 20px;

  font-size: 2rem;
`;

const LoginButton = styled.button`
  width: 31vw;
  height: 95px;
  margin: 40px 0 20px 0;
  padding: 0.5vw;

  background-color: #ff8303;

  border: none;
  border-radius: 15px;

  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 1vw;
  padding-bottom: 20px;
`;

const Logo = styled.img`
  width: 300px;
  height: 300px;
`;

const GoogleLogo = styled.img`
  position: absolute;
  left: 1vw;
  top: 15px;

  width: 50px;
  height: 50px;

  border: none;
  border-radius: 15px;
`;

const LoginGoogleButton = styled.button`
  position: relative;

  width: 31vw;
  height: 90px;

  background-color: white;

  border: 4px solid #a9a9a9;
  border-radius: 15px;

  font-size: 2rem;
  font-weight: bold;
  color: #838383;
`;

const LinkToOtherPage = styled(Link)`
  margin: 0 1vw 0 1vw;

  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #a9a9a9;
`;

const TextInfo = styled.span`
  margin: 10px 1vw 0 1vw;

  font-size: 1.5rem;
  font-weight: bold;
  color: #a9a9a9;
`;

const Home = () => {
  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <LoginInput placeholder="이메일" />
      <LoginInput placeholder="비밀번호" />
      <LoginButton>로그인</LoginButton>
      <LinkContainer>
        <LinkToOtherPage to="/home">비밀번호 찾기</LinkToOtherPage>
        <LinkToOtherPage to="/home">회원가입</LinkToOtherPage>
      </LinkContainer>
      <LoginGoogleButton>
        <GoogleLogo src={googleLogo} alt="googleLogo" />
        구글 로그인
      </LoginGoogleButton>
      <TextInfo>SNS 로그인</TextInfo>
    </Container>
  );
};

export default Home;
