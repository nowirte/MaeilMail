import React from 'react';
import styled from 'styled-components';

const SignupCard = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1400px;
  height: 1000px;
`;

const SignUp = () => {
  return <SignupCard />;
};

export default SignUp;
