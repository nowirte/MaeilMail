import React from 'react';
import styled from 'styled-components';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import defaultUserIcon from './icon/defaultUserIcon.png';
// import settingIcon from './icon/settingIcon.png';

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin: 0 50px;
  > img {
    width: 100px;
    height: 100px;
    background-color: #ffe5b8;
    border-radius: 50%;

    margin: 20px 0;
  }

  .nickName {
    font-weight: bold;
    font-size: 1.75rem;

    padding: 10px 0;
  }

  .introduction {
    font-size: 1rem;
    padding: 0 0 20px 0;
  }

  .profileEdit,
  .userEdit {
    display: flex;
    align-items: center;

    font-size: small;
    text-align: center;
    color: gray;

    padding-bottom: 5px;
    > p {
      ${'' /* 텍스트와 톱니바퀴 중앙 정렬 필요! */}
    }
  }
`;

const ProfileInfo = () => {
  return (
    <Profile>
      <img src={defaultUserIcon} alt="profileImg" />
      <div className="nickName">갓생살자</div>
      <div className="introduction">스터디 100%참여 목표!</div>
      <div className="profileEdit">
        {/* <img src={settingIcon} alt="settingImg" /> */}
        <SettingsOutlinedIcon />
        <div>프로필 수정</div>
      </div>
      <div className="userEdit">
        <SettingsOutlinedIcon />
        <div>회원정보 변경</div>
      </div>
    </Profile>
  );
};

export default ProfileInfo;
