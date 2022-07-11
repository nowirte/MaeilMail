import React from 'react';
import { Outlet } from 'react-router';
import NavTopArea from './NavTop';

import { Container, SideWrapper, Navbar, Friends, Footer } from './style';

const SideBar = () => {
  return (
    <Container>
      <SideWrapper>
        <Navbar>
          <NavTopArea />
          <Friends>친구 리스트</Friends>
        </Navbar>
        <Footer>푸터(모달)</Footer>
      </SideWrapper>
      <Outlet />
    </Container>
  );
};

export default SideBar;
