import React from 'react';
import styled from 'styled-components';
import defaultUserIcon from '../../assets/defaultUserIcon.png';

const MyPage = () => {
  const Profile = styled.div`
    background-color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: 0 center;

    .UserInfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    img {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100px;
      height: 100px;
      background-color: #ffe5b8;
      border-radius: 50%;

      margin-bottom: 15px;
    }

    .nickName {
      font-weight: bold;
      font-size: 25px;
    }

    .introduction {
      font-size: 16px;
    }
  `;

  const CurrentStudy = styled.div`
    background-color: blue;
  `;

  return (
    <div style={{ display: 'flex' }}>
      <Profile>
        <img src={defaultUserIcon} alt="profileImg" />
        <div className="UserInfo">
          <div className="nickName">갓생살자</div>
          <div className="introduction">스터디 100%참여가 목표입니다.</div>
        </div>
      </Profile>
      <CurrentStudy>study</CurrentStudy>
    </div>
  );
};

export default MyPage;
