import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

const NavFriendsArea = () => {
  const [friends, setFriends] = useState([]);
  const token = useSelector(state => state.auth.token);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/letters', {
        headers: {
          Authorization: token,
        },
      });
      const data = res.data;
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
    <Friends>

      {friends &&
        friends?.map(friend => {
          return (
            <StyledLink to={`/friend/${friend.user_id}`} key={friend.user_id}>
              <FriendsList>
                <div className="profileImgArea">
                  <img src={friend.profileImage} alt="friendImg" />
                </div>
                <div className="friendInfo">
                  <div className="friendName">{friend.nickname}</div>
                  <div className="friendCount">{friend.count}</div>
                </div>
              </FriendsList>
            </StyledLink>
          );
        })}

    </Friends>
  );
};

export default NavFriendsArea;

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
  align-items: center;
  padding: 10px 0;

  font-size: 1.2rem;
  padding-bottom: 20px;

  font-weight: bold;
  color: white;

  & .friendInfo {
    position: relative;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .friendCount {
      position: absolute;
      right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: pink;
      display: flex;
      justify-content: center;
      align-items: center;
    }
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

    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: contain;
    }
  }
`;
