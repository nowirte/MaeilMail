import React from 'react';
import styled from 'styled-components';

const Friends = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  overflow: scroll;
`;

const FriendsList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.25rem;
  padding-bottom: 25px;

  & .profileImgArea {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 10px;

    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: white;

    & span {
      font-size: 2rem;
      padding-bottom: 3px;
    }
  }
`;

const NavFriendsArea = () => {
  return (
    <Friends>
      <FriendsList>
        <div className="profileImgArea">
          <span className="profileEmoji">🤓</span>
        </div>
        <span>지재영</span>
      </FriendsList>
      <FriendsList>
        <div className="profileImgArea">
          <span className="profileEmoji">🤓</span>
        </div>
        <span>지재영</span>
      </FriendsList>
    </Friends>
  );
};

export default NavFriendsArea;
