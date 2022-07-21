import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginInput } from './SignupFormElements';

const SignupInput = () => {
  const dispatch = useDispatch();
  const nickname = useSelector(state => {
    return state.signup.nickname;
  });
  function nicknameHandleChange(e) {
    dispatch({ type: 'SIGNUP_NICKNAME', nickname: e.target.value });
  }

  const email = useSelector(state => {
    return state.signup.email;
  });
  function emailHandleChange(e) {
    dispatch({ type: 'SIGNUP_EMAIL', email: e.target.value });
  }

  const password = useSelector(state => {
    return state.signup.password;
  });

  function passwordHandleChange(e) {
    dispatch({ type: 'SIGNUP_PASSWORD', password: e.target.value });
  }

  return (
    <>
      <LoginInput
        placeholder="닉네임"
        value={nickname}
        onChange={nicknameHandleChange}
      />
      <LoginInput
        placeholder="이메일"
        type="email"
        value={email}
        onChange={emailHandleChange}
      />
      <LoginInput
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={passwordHandleChange}
      />
      <LoginInput placeholder="비밀번호 확인" type="password" />
    </>
  );
};

export default SignupInput;
