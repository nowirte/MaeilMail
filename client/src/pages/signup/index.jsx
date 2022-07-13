import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import googleLogo from './googleLogo.png';
import logo from './logo.png';
import location from './location.png';
import refresh from './refresh.png';

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

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 670px;
  margin-top: 40px;
`;

const GenderContainer = styled.div`
  display: flex;

  border-radius: 20px;
`;

const Male = styled.input`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 4px solid #a9a9a9;

  display: none;

  width: 110px;
  font-size: 2rem;

  + label {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60px;
    width: 110px;

    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border: 4px solid #a9a9a9;
    background: #59b1fc;
    color: white;

    cursor: pointer;

    font-size: 2rem;
  }
`;

const Female = styled.input`
  display: none;

  + label {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60px;
    width: 110px;

    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 4px solid #a9a9a9;
    background: white;
    cursor: pointer;

    font-size: 2rem;
  }
`;

const UserLocation = styled.div`
  height: 50px;
  width: 330px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px;

  border-radius: 20px;
  border: 4px solid #a9a9a9;

  font-size: 1.5rem;
`;

const Location = styled.img`
  width: 40px;
  height: 40px;

  border: none;
`;

const Refresh = styled.img`
  width: 40px;
  height: 40px;

  border: none;
`;

const LoginInput = styled.input`
  width: 650px;
  height: 70px;
  margin: 10px;
  padding: 0 0 0 20px;

  border: 4px solid #a9a9a9;
  border-radius: 20px;

  font-size: 2rem;
`;

const LoginButton = styled.button`
  width: 670px;
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

  width: 670px;
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

const SignUp = () => {
  return (
    <SignupCard>
      <Logo src={logo} alt="Logo" />
      <UserInfoContainer>
        <GenderContainer>
          <Male type="radio" id="male" />
          {/* eslint-disable-next-line  */}
          <label htmlFor="male">남성</label>
          <Female type="radio" id="female" />
          {/* eslint-disable-next-line  */}
          <label htmlFor="female">여성</label>
        </GenderContainer>
        <UserLocation>
          <Location src={location} alt="location" />
          <span>South Korea</span>
          <Refresh src={refresh} alt="refresh" />
        </UserLocation>
      </UserInfoContainer>
      <LoginInput placeholder="닉네임" />
      <LoginInput placeholder="이메일" type="email" />
      <LoginInput placeholder="비밀번호" type="password" />
      <LoginInput placeholder="비밀번호 확인" type="password" />
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
    </SignupCard>
  );
};

export default SignUp;
