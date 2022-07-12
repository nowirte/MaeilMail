import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import FemaleIcon from '@mui/icons-material/Female';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AdditionalUserInfoArea from './AdditionalUserInfo';

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 80px;
`;

const Account = styled.div`
  margin-bottom: 20px;

  & .userName {
    font-size: 1.75rem;
    font-weight: bold;

    margin-right: 10px;
  }

  & .userEmail {
    font-size: 1rem;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 15px;

  & p {
    display: flex;
    align-items: center;

    width: fit-content;
    padding: 5px 8px;
    margin-right: 10px;

    background-color: #40577a;
    color: white;
    font-size: 1rem;
    border-radius: 5px;
  }
`;

const Introduction = styled.div`
  border: 1px #ff6f91 solid;
  border-radius: 15px;

  width: fit-content;
  padding: 11px 20px;
  > span {
    font-size: 1.25rem;
  }
`;

const UserArea = () => {
  const userData = useSelector(state => {
    return state;
  });
  return (
    <User>
      <Account>
        <span className="userName">{userData.nickname}</span>
        <span className="userEmail">{userData.email}</span>
      </Account>
      <Info>
        <div className="gender">
          <p>
            <FemaleIcon />
            {userData.gender === 'female' ? '여자' : '남자'}
          </p>
        </div>
        <div className="location">
          <p>
            <LocationOnIcon />
            {userData.location}
          </p>
        </div>
      </Info>
      <Introduction>
        <span>{userData.profileText}</span>
      </Introduction>
      <AdditionalUserInfoArea />
    </User>
  );
};

export default UserArea;
