import React from 'react';
import { Outlet } from 'react-router';
import {
  Container,
  SideWrapper,
  Navbar,
  Logo,
  MyProfile,
  Friends,
  Footer,
} from './style';

const SideBar = () => {
  return (
    <Container>
      <SideWrapper>
        <Navbar>
          <Logo>로고이미지, 로고</Logo>
          <MyProfile>내 프로필</MyProfile>
          <Friends>친구 리스트</Friends>
        </Navbar>
        <Footer>푸터(모달)</Footer>
      </SideWrapper>
      <Outlet />
    </Container>
  );
};

export default SideBar;
