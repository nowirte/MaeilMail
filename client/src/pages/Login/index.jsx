import React from 'react';
import LoginFormCard from './LoginFormCardRight';
import LoginImageCard from './LoginImageCardLeft';
import LoginCard from './LoginCard';

const Login = () => {
  return (
    <LoginCard>
      <LoginImageCard />
      <LoginFormCard />
    </LoginCard>
  );
};

export default Login;
