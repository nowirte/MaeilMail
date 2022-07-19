import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { Logo, LoginButton, LinkContainer } from './SignupFormElements';
import SignupInput from './SignupInput';
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
  const navigate = useNavigate();
  const state = useSelector(state => {
    return state.signup;
  });
  async function handleSignupSubmit(e) {
    e.preventDefault();
    const bodyData = JSON.stringify(state);
    alert('가입 성공');
    //아직 백엔드와 연결 X
    await axios
      .post('http://localhost:3001/api/users', bodyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        if (response.status === 201) {
          navigate('/login');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <SignupCard onSubmit={handleSignupSubmit}>
      <Logo src={logo} alt="Logo" />
      <PersonalInfo />
      <SignupInput />
      <LoginButton type="submit">회원가입하기</LoginButton>
      <LinkContainer>
        <Link to="/Login">로그인 페이지로 돌아가기</Link>
      </LinkContainer>
    </SignupCard>
  );
};

export default SignUp;
