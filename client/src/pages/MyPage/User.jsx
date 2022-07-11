import React from 'react';
import styled from 'styled-components';
import FemaleIcon from '@mui/icons-material/Female';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const User = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 80px;
`;

const Account = styled.div`
  margin-bottom: 15px;

  & .userName {
    font-size: 1.75rem;
    font-weight: bold;
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
  margin-bottom: 15px;
  > span {
    font-size: 1.45rem;
  }
`;

const UserArea = () => {
  return (
    <User>
      <Account>
        <span className="userName">지재영</span>
        <span className="userEmail">abc@naver.com</span>
      </Account>
      <Info>
        <div className="gender">
          <p>
            <FemaleIcon />
            여성
          </p>
        </div>
        <div className="location">
          <p>
            <LocationOnIcon />
            KR
          </p>
        </div>
      </Info>
      <Introduction>
        <span>Hi! I am Korean.</span>
      </Introduction>
    </User>
  );
};

export default UserArea;
