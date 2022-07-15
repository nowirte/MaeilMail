import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import NavTopArea from './NavTop';
import NavFriendsArea from './NavFriends';
import LogoutArea from './Logout';
import { Container, SideWrapper, Navbar } from './style';
import axios from 'axios';

const SideBar = () => {
  // const [user, setUser] = useState([]);
  const [friend, setFriend] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/user`);
      const data = res.data;
      setFriend(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <SideWrapper>
        <Navbar>
          <NavTopArea />
          <NavFriendsArea friend={friend} />
        </Navbar>
        <LogoutArea />
      </SideWrapper>
      <Outlet />
    </Container>
  );
};

export default SideBar;
