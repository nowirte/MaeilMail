import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './img/logo.png';
import axios from 'axios';
import { useSelector } from 'react-redux';

const NavTopArea = () => {
  const [user, setUser] = useState([]);
  const token = useSelector(state => state.auth.token);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: {
          Authorization: token,
        },
      });
      const data = res.data.user;
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NavTop>
      <StyledLink to="/">
        <Logo src={logo} alt="logoImg" />
      </StyledLink>
      <Line />
      <StyledLink to="/mypage">
        <MyProfile>
          <div className="profileImgArea">
            <img
              className="profileImage"
              src={user.profileImage}
              alt="profileImg"
            />
          </div>
          <div className="profileName">
            <div>{user.nickname}</div>
          </div>
        </MyProfile>
      </StyledLink>
      <Line />
    </NavTop>
  );
};

export default NavTopArea;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NavTop = styled.div`
  height: 140px;
  border-radius: 0.25rem;
  width: 100%;
`;

const Logo = styled.img`
  width: 100px;
  display: block;
  margin: 0px auto;
  padding-top: 0.25rem;
`;

const Line = styled.hr`
  width: 90%;
  background-color: #e0e0e0;
`;

const MyProfile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  font-size: 1.25rem;
  padding: 5px 0;

  & .profileName {
    width: 70%;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
  }

  & .profileImgArea {
    margin-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 10px;

    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: white;

    .profileImage {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: contain;
    }
  }
`;
