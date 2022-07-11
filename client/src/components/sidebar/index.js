import React from 'react';
import { Outlet } from 'react-router';
import NavTopArea from './NavTop';
import NavFriendsArea from './NavFriends';
import { Container, SideWrapper, Navbar, Footer } from './style';

const SideBar = () => {
  return (
    <Container>
      <SideWrapper>
        <Navbar>
          <NavTopArea />
          <NavFriendsArea />
        </Navbar>
        <Footer>푸터(모달)</Footer>
      </SideWrapper>
      <Outlet />
    </Container>
  );
};

export default SideBar;
