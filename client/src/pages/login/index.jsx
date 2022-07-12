import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import googleLogo from './googleLogo.png';
import backgroundImage from './mailboxBG.jpg';

const LoginCard = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgCard = styled.div`
  width: 700px;
  height: 800px;

  border-top-left-radius: 48px;
  border-bottom-left-radius: 48px;

  background-image: url(${backgroundImage});

  background-size: 1350px 900px;
  background-position: 55% 20%;

  display: flex;
  justify-content: center;
  direction: col;
`;

const Title = styled.span`
  margin-top: 50px;
  font-size: 2.5rem;
  font-weight: bold;
`;

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

const LoginInput = styled.input`
  width: 550px;
  height: 70px;
  margin: 10px;
  padding: 0 0 0 20px;

  border: 4px solid #a9a9a9;
  border-radius: 20px;

  font-size: 2rem;
`;

const LoginButton = styled.button`
  width: 570px;
  height: 80px;
  margin: 40px 0 20px 0;
  padding: 20px;

  background-color: #59b1fc;

  border: none;
  border-radius: 15px;

  font-size: 2rem;
  font-weight: bold;
  color: white;

  cursor: pointer;
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
`;

const GoogleLogo = styled.img`
  position: absolute;
  left: 30px;
  top: 12px;

  width: 50px;
  height: 50px;

  border: none;
  border-radius: 15px;
`;

const LoginGoogleButton = styled.button`
  position: relative;

  width: 570px;
  height: 80px;

  background-color: white;

  border: 4px solid #a9a9a9;
  border-radius: 15px;

  font-size: 2rem;
  font-weight: bold;
  color: #838383;

  cursor: pointer;
`;

const LinkToOtherPage = styled(Link)`
  margin: 0 20px 0 20px;

  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #a9a9a9;
`;

const TextInfo = styled.span`
  margin: 10px 20px 0 20px;

  font-size: 1.5rem;
  font-weight: bold;
  color: #a9a9a9;
`;

const Login = () => {
  return (
    <LoginCard>
      <ImgCard>
        <Title>Lorem ipsum, dolor sit amet</Title>
      </ImgCard>
      <FormCard>
        <Logo src={logo} alt="Logo" />
        <LoginInput placeholder="이메일" type="email" />
        <LoginInput placeholder="비밀번호" type="password" />
        <LoginButton>로그인</LoginButton>
        <LinkContainer>
          <LinkToOtherPage to="/home">비밀번호 찾기</LinkToOtherPage>
          <LinkToOtherPage to="/signup">회원가입</LinkToOtherPage>
        </LinkContainer>
        <LoginGoogleButton>
          <GoogleLogo src={googleLogo} alt="googleLogo" />
          구글 로그인
        </LoginGoogleButton>
        <TextInfo>SNS 로그인</TextInfo>
      </FormCard>
    </LoginCard>
  );
};

export default Login;
