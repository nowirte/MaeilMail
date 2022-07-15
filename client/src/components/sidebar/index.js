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

      // 헤더에 토큰 보내고 친구 데이터 받아오기 / 추후 친구 컴포넌트에서 get할 예정
      //   const res = await axios.get(`주소`,{
      //     headers: {
      //       'Content-Type': 'application/json; charset=utf-8',
      //       authorization: `Bearer ${localStorage.getItem('token')}`,
      //    },
      //  }
      // )

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
