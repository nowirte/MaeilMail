import React from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router';
import NavTopArea from './NavTop';
import NavFriendsArea from './NavFriends';
import LogoutArea from './Logout';
import { Container, SideWrapper, Navbar } from './style';
import { store } from '../../stores/userStore';

const SideBar = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default SideBar;
