import React from 'react';
import { Outlet } from 'react-router';
import { Container, SideWrapper, Navbar } from '../sidebar/style';
import { NavList, StyledLink, Logo, Line} from './style';
import logo from '../sidebar/img/logo.png';

const AdminSideBar = () => {
  return (
    <Container>
      <SideWrapper>
        <Navbar>
        <StyledLink to="/admin/main">
        <Logo src={logo} alt="logoImg" />
      </StyledLink>
          <Line />
            <NavList type="radio"
            id="userInfo"
            name="NavList"/>
            <label htmlFor='userInfo'>유저 정보 변경</label>
            <NavList
            type="radio"
            id="dashboard"
            name="NavList"/>
            <label htmlFor='dashboard'>대시보드</label>
            
        </Navbar>
      </SideWrapper>
      <Outlet/>
    </Container>
  );
};

export default AdminSideBar;
