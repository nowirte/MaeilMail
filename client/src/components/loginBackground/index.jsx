import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import backgroundImage from './img/mailboxBG.jpg';

const Container = styled.div`
  display: relative;
  width: 100vw;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${backgroundImage});
  width: 100vw;
  filter: grayscale(20%) opacity(70%);
  z-index: -1;
  background-size: cover;
  background-position: 30% 50%;
`;

const loginBackground = () => {
  return (
    <Container>
      <Background />
      <Outlet />
    </Container>
  );
};

export default loginBackground;
