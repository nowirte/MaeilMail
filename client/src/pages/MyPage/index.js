import React from 'react';
import UserArea from './User';
import SettingArea from './Setting';
import { Wrapper, ProfileImg, Title, MyProfile } from './style';

const MyPage = () => {
  return (
    <Wrapper>
      <Title>나의 프로필</Title>
      <MyProfile>
        <ProfileImg>
          <div className="profileImgArea">
            <span className="profileEmoji">🤓</span>
          </div>
        </ProfileImg>
        <UserArea />
        <SettingArea />
      </MyProfile>
    </Wrapper>
  );
};

export default MyPage;
