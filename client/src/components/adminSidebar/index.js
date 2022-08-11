import React from 'react';
import { useNavigate, Outlet } from 'react-router';
import { Container, SideWrapper, Navbar } from '../sidebar/style';
import { NavList, StyledLink, Logo, Line} from './style';
import logo from '../sidebar/img/logo.png';
import LogoutArea from '../sidebar/Logout';
import { useSelector } from 'react-redux';

const AdminSideBar = () => {
  let navigate = useNavigate()
  const { auth, role } = useSelector(state => state.auth); 
  function Linkin(e){
    return navigate(`/admin/${e.target.value}`)
  }
  return (
    <Container>
      <SideWrapper>
        <Navbar>
        <NavList type="radio"
            id="main"
            name="NavList"
            value="main"
            onClick={Linkin}
            role='logo'
            />
            <label htmlFor='main'><Logo src={logo} alt="logoImg" /></label>
            

          <Line />
            <NavList type="radio"
            id="userInfo"
            name="NavList"
            value="userInfo"
            onClick={Linkin}
            />
            <label htmlFor='userInfo'>유저 정보 변경</label>
            <NavList
            type="radio"
            id="dashboard"
            name="NavList"
            value="dashboard"
            onClick={Linkin}/>
            <label htmlFor='dashboard'>대시보드</label>
        </Navbar>
        <LogoutArea/>
      </SideWrapper>
      {auth ? <Outlet /> : <Navigate to="/login" />}
    </Container>
  );
};

export default AdminSideBar;
