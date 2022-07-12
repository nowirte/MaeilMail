import React from 'react';
import UserArea from './User';
import UserSignOutArea from './UserSignOut';
import UserInfoEditArea from './UserInfoEdit';
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
        <div className="setting">
          <UserInfoEditArea />
          <UserSignOutArea />
        </div>
      </MyProfile>
    </Wrapper>
  );
};

export default MyPage;
