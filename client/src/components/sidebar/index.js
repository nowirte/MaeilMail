import React from 'react';
import { Navigate, Outlet } from 'react-router';
import NavTopArea from './NavTop';
import NavFriendsArea from './NavFriends';
import LogoutArea from './Logout';
import { Container, SideWrapper, Navbar } from './style';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const { auth, role } = useSelector(state => state.auth);
  return auth ? (
    <Container>
      <SideWrapper>
        <Navbar>
          <NavTopArea />
          <NavFriendsArea />
        </Navbar>
        <LogoutArea />
      </SideWrapper>
      <Outlet />
    </Container>
  ) : (
    <Navigate to="/login" />
  );
};

export default SideBar;
