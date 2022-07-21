import React from 'react';
import { Outlet } from 'react-router';
import NavTopArea from './NavTop';
import NavFriendsArea from './NavFriends';
import LogoutArea from './Logout';
import { Container, SideWrapper, Navbar } from './style';

const SideBar = () => {
  return (
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
  );
};

export default SideBar;
