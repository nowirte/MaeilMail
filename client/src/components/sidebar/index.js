import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router';
import NavTopArea from './NavTop';
import NavFriendsArea from './NavFriends';
import { Container, SideWrapper, Navbar, Footer } from './style';

import reducer from './reducer/sidebar';

const store = createStore(reducer);

const SideBar = () => {
  return (
    <Provider store={store}>
      <Container>
        <SideWrapper>
          <Navbar>
            <NavTopArea />
            <NavFriendsArea />
          </Navbar>
          <Footer>푸터(모달)</Footer>{' '}
        </SideWrapper>
        <Outlet />
      </Container>
    </Provider>
  );
};

export default SideBar;
