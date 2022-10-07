import React from 'react';
import { Outlet, Navigate } from 'react-router';
import styled from 'styled-components';
import backgroundImage from './img/mailbox_blured_BG.jpg';
import { useSelector } from 'react-redux';
import useBreakpoints from '../../utils/breakpoints';

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${backgroundImage});
  width: 100vw;
  z-index: -1;
  display: flex;
  justify-content: center;
  background-position: 30% 50%;
  overflow: scroll;
`;

const loginBackground = () => {
  const { auth, role } = useSelector(state => state.auth.auth);
  const { isMobile } = useBreakpoints();
  return !auth || role === 'temp' ? (
    isMobile ? (
      <>
        <Outlet />
      </>
    ) : (
      <Background>
        <Outlet />
      </Background>
    )
  ) : (
    <Navigate to="/" />
  );
};

export default loginBackground;
