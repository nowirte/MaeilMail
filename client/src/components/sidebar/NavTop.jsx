import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import logo from './img/logo.png';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NavTop = styled.div`
  height: 140px;
  border-radius: 0.25rem;
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
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.25rem;
  padding: 5px 0;

  > span {
    font-weight: bold;
    color: white;
  }

  & .profileImgArea {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 10px;

    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: white;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const NavTopArea = () => {
  const userData = useSelector(state => {
    return state;
  });
  return (
    <NavTop>
      <StyledLink to="/">
        <Logo src={logo} alt="logoImg" />
      </StyledLink>
      <Line />
      <StyledLink to="/mypage">
        <MyProfile>
          <div className="profileImgArea">
            <img src={userData.profileImage} alt="profileImg" />
          </div>
          <span>{userData.nickname}</span>
        </MyProfile>
      </StyledLink>
      <Line />
    </NavTop>
  );
};

export default NavTopArea;
