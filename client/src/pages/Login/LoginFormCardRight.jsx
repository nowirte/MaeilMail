import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../redux/reducers/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
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

const FormCard = styled.div`
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

const LoginForm = props => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { loginForm, setLoginForm } = props;
  const { email, password } = loginForm;
  let navigate = useNavigate();

  function inputHandleChange(e) {
    const { name, value } = e.target;
    setLoginForm(state => {
      return { ...state, [name]: value };
    });
  }

  async function handleLoginClick(e) {
    e.preventDefault();
    const data = { email: email, password: password };
    const bodyData = JSON.stringify(data);

    axios
      .post('api/auth/login', bodyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        const { token, role } = res.data;
        dispatch(setAuth({ role: role, token: token, auth: true }));
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        alert('이메일, 비밀번호를 확인해주세요.');
      });
  }

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const { access_token } = tokenResponse;
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
      );
      const { email } = data;
      const bodyData = JSON.stringify({ email: email });

      const res = await axios.post('api/auth/login/google', bodyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, role } = res.data;
      dispatch(setAuth({ role: role, token: token, auth: true }));
      role === 'temp' ? navigate('/googleSignup') : navigate('/');
    },
    onError: () => console.log('Login Failed'),
  });

  return (
    <FormCard>
      <Logo src={logo} alt="Logo" />
      <LoginFormInput
        placeholder="이메일"
        type="email"
        name="email"
        value={email}
        onChange={inputHandleChange}
      />
      <LoginFormInput
        placeholder="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={inputHandleChange}
      />
      <LoginFormButton onClick={handleLoginClick}>로그인</LoginFormButton>
      <LinkContainer>
        <Link to="/home">비밀번호 찾기</Link>
        <Link to="/signup">회원가입</Link>
      </LinkContainer>

      <LoginGoogleButton
        onClick={() => {
          login();
        }}
      >
        <GoogleLogo src={googleLogo} alt="googleLogo" />
        Google
      </LoginGoogleButton>

      <span>SNS 로그인/회원가입</span>
    </FormCard>
  );
};

export default LoginForm;
