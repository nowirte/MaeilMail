import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(state => {
    return state.login.loginEmail;
  });
  function emailHandleChange(e) {
    dispatch({ type: 'LOGIN_EMAIL', email: e.target.value });
  }

  const password = useSelector(state => {
    return state.login.loginPassword;
  });

  function passwordHandleChange(e) {
    dispatch({ type: 'LOGIN_PASSWORD', password: e.target.value });
  }

  const state = useSelector(state => {
    return state;
  });

  async function handleLoginSubmit(e) {
    e.preventDefault();
    const data = { email: email, password: password };
    const bodyData = JSON.stringify(data);

    //아직 백엔드와 연결 X
    await axios
      .post('http://localhost:3000/login', bodyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        navigate('/');
      })
      .catch(function (error) {
        alert(error);
      });
    console.log(state);
  }

  return (
    <FormCard onSubmit={handleLoginSubmit}>
      <Logo src={logo} alt="Logo" />
      <LoginFormInput
        placeholder="이메일"
        type="email"
        value={email}
        onChange={emailHandleChange}
      />
      <LoginFormInput
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={passwordHandleChange}
      />
      <LoginFormButton type="submit">로그인</LoginFormButton>
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
