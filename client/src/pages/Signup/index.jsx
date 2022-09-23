import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import useForm from '../../hooks/useForm';
import loc from '../../assets/location.png';
import refresh from '../../assets/refresh.png';
import useLoc from '../../utils/userLocationFunction';

import {
  Logo,
  LoginInput,
  LoginButton,
  LinkContainer,
  SignupCard,
  Location,
  LocationContainer,
  Refresh,
  UserInfoContainer,
  GenderContainer,
  Male,
  Female,
} from './SignupFormElements';

const SignUp = () => {
  const navigate = useNavigate();

  const [checkPassword, setCheckPassword] = useState('');

  const { values, handleInputChange, handleChange, handleSubmit } = useForm({
    initialValues: {
      gender: '',
      location: '',
      nickname: '',
      email: '',
      password: '',
      latitude: '',
      longitude: '',
    },
    onSubmit: async values => {
      const bodyData = JSON.stringify(values);

      try {
        await axios.post('api/users', bodyData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        alert('가입을 축하드립니다');
        navigate('/login');
      } catch (error) {
        alert(error.response.data.reason);
      }
    },
  });

  const handleLocation = async () => {
    const locationObject = await useLoc();
    handleChange(locationObject);
  };

  function handleCheckPasswordChange(e) {
    setCheckPassword(e.target.value);
  }

  useEffect(() => {
    handleLocation();
  }, []);

  return (
    <SignupCard>
      <Logo src={logo} alt="Logo" />
      <UserInfoContainer>
        <GenderContainer>
          <Male
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleInputChange}
          />
          <label htmlFor="male">남성</label>
          <Female
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleInputChange}
          />
          <label htmlFor="female">여성</label>
        </GenderContainer>
        <LocationContainer>
          <Location src={loc} alt="location" />
          <span>{values.location}</span>
          <Refresh src={refresh} alt="refresh" onClick={handleLocation} />
        </LocationContainer>
      </UserInfoContainer>
      <LoginInput
        placeholder="닉네임"
        name="nickname"
        value={values.nickname}
        onChange={handleInputChange}
      />
      <LoginInput
        placeholder="이메일"
        type="email"
        name="email"
        value={values.email}
        onChange={handleInputChange}
      />
      <LoginInput
        placeholder="비밀번호"
        type="password"
        name="password"
        value={values.password}
        onChange={handleInputChange}
      />
      <LoginInput
        placeholder="비밀번호 확인"
        type="password"
        value={checkPassword}
        onChange={handleCheckPasswordChange}
      />
      <LoginButton
        onClick={handleSubmit}
        disabled={values.password === checkPassword ? false : true}
      >
        회원가입하기
      </LoginButton>
      <LinkContainer>
        <Link to="/Login">로그인 페이지로 돌아가기</Link>
      </LinkContainer>
    </SignupCard>
  );
};

export default SignUp;
