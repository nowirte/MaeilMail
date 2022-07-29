import React, { useState } from 'react';
import styled from 'styled-components';
import logo from './logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../redux/reducers/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Logo,
  LoginInput,
  LoginButton,
  LinkContainer,
} from './GoogleSignupFormElements';
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
  height: 700px;

  border-radius: 48px;

  background-color: white;
`;

const googleSignup = () => {
  const oldToken = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({ nickname: '' });

  const [locationInfo, setLocationInfo] = useState({
    location: '',
    latitude: 0,
    longitude: 0,
  });
  const [gender, setGender] = useState({
    gender: '',
  });

  function handleUserInfo(e) {
    setUserInfo(state => {
      return { ...state, nickname: e.target.value };
    });
  }

  async function handleGoogleSignupClick(e) {
    e.preventDefault();

    const state = {
      ...userInfo,
      ...locationInfo,
      ...gender,
    };

    const bodyData = JSON.stringify(state);
    //아직 백엔드와 연결 X
    try {
      const res = await axios.patch(
        'http://localhost:3001/api/auth/me?isGoogle=true',
        bodyData,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: oldToken,
          },
        }
      );
      const { token, role } = res.data;
      dispatch(setAuth({ role: role, token: token, auth: true }));
      alert('가입에 성공하셨습니다!');
      navigate('/');
    } catch (err) {
      console.log(err);
      alert('오류가 생겼습니다. 다시 실행해주세요.');
      navigate('/login');
    }
  }

  return (
    <SignupCard>
      <Logo src={logo} alt="Logo" />
      <PersonalInfo
        locationInfo={locationInfo}
        setLocationInfo={setLocationInfo}
        gender={gender}
        setGender={setGender}
      />
      <LoginInput
        placeholder="닉네임"
        value={userInfo.nickname}
        onChange={handleUserInfo}
      />
      <LoginButton onClick={handleGoogleSignupClick}>
        구글로 회원가입하기
      </LoginButton>
    </SignupCard>
  );
};

export default googleSignup;
