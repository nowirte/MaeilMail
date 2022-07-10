import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router';

const SideWrapper = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;
const Logo = styled.h1`
  height: 50px;
`;
const MyProfile = styled.div`
  height: 100px;
  background: #999;
  border-radius: 0.25rem;
`;
const Friends = styled.div`
  width: 100%;
  height: 100%;
  background: #666;
  border-radius: 0.25rem;
  overflow: scroll;
`;
const Footer = styled.footer`
  background: #999;
`;

const SideBar = () => {
  return (
    <>
      <SideWrapper>
        <Navbar>
          <Logo>로고이미지, 로고</Logo>
          <MyProfile>내 프로필</MyProfile>
          <Friends>친구 리스트</Friends>
        </Navbar>
        <Footer>푸터(모달)</Footer>
      </SideWrapper>
      <Outlet />
    </>
  );
};

export default SideBar;
