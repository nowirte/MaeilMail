import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import NavTopArea from './NavTop';
import NavFriendsArea from './NavFriends';
import LogoutArea from './Logout';
import { Container, SideWrapper, Navbar } from './style';
import axios from 'axios';

const SideBar = () => {
  // const [user, setUser] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/friend`);
      const data = res.data;

      // 추후 친구 컴포넌트에서 get할 예정
      // const res = await axios.get(`http://localhost:3001/api/auth/me`, {
      //   headers: {
      //     'Content-Type': 'application/json; charset=utf-8',
      //     authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      // });
      // console.log(res);

      setFriends(data);
    } catch (err) {
      console.log(err);
      console.log(err.message);
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
          <NavFriendsArea friends={friends} />
        </Navbar>
        <LogoutArea />
      </SideWrapper>
      <Outlet />
    </Container>
  );
};

export default SideBar;
