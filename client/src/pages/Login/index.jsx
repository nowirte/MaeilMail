import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../redux/reducers/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import useForm from '../../hooks/useForm';
import logo from '../../assets/logo.png';
import googleLogo from '../../assets/googleLogo.png';
import validate from '../../validations/loginValidation';

import {
  LoginFormInput,
  LoginFormButton,
  LinkContainer,
  Logo,
  GoogleLogo,
  LoginGoogleButton,
  LoginImageCardLeft,
  FormCardRight,
  LoginCard,
} from './LoginFormElements';

const Login = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { values, handleInputChange, handleSubmit, errors } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: values => {
      const bodyData = JSON.stringify(values);

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
    },
    validate,
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const { access_token } = tokenResponse;
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
      );
      const { email } = data;
      const bodyData = JSON.stringify({ email: email });

      const res = await axios.post('/api/auth/login/google', bodyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, role } = res.data;
      dispatch(setAuth({ role: role, token: token, auth: true }));
      role === 'temp' ? navigate('/googleSignup') : navigate('/');
    },
    onError: () => alert('로그인에 실패했습니다. 다시 시도해주세요.'),
  });

  function handleGoogleLoginClick(e) {
    e.preventDefault();
    googleLogin();
  }

  return (
    <LoginCard>
      <LoginImageCardLeft />
      <FormCardRight>
        <Logo src={logo} alt="Logo" />
        <LoginFormInput
          placeholder="이메일"
          type="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
        <LoginFormInput
          placeholder="비밀번호"
          type="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
        <LoginFormButton onClick={handleSubmit}>로그인</LoginFormButton>
        <LinkContainer>
          <Link to="/">비밀번호 찾기</Link>
          <Link to="/signup">회원가입</Link>
        </LinkContainer>

        <LoginGoogleButton onClick={handleGoogleLoginClick}>
          <GoogleLogo src={googleLogo} alt="googleLogo" />
          Google
        </LoginGoogleButton>

        <span>SNS 로그인/회원가입</span>
      </FormCardRight>
    </LoginCard>
  );
};

export default Login;
