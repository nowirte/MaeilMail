import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Friends = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
`;

const FriendsList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.2rem;
  padding-bottom: 20px;

  > span {
    font-weight: bold;
    color: white;
  }

  & .profileImgArea {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 10px;

    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: white;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const NavFriendsArea = () => {
  return (
    <Friends>
      <StyledLink to="/friend/:id">
        <FriendsList>
          <div className="profileImgArea">
            <img src="/img/뚱이.png" alt="friendImg" />
          </div>
          <span>닉네임</span>
        </FriendsList>
      </StyledLink>
    </Friends>
  );
};

export default NavFriendsArea;
