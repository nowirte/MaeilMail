import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import UserArea from './User';
import UserSignOutArea from './UserSignOut';
import UserInfoEditArea from './UserInfoEdit';
import { Wrapper, ProfileImg, Title, MyProfile } from './style';

import reducer from './reducer/mypage';

const store = createStore(reducer);

const MyPage = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Title>나의 프로필</Title>
        <MyProfile>
          <ProfileImg>
            <div className="profileImgArea">
              <img className="profileEmoji" src="/img/뚱이.png" alt="뚱이" />
            </div>
          </ProfileImg>
          <UserArea />
          <div className="setting">
            <UserInfoEditArea />
            <UserSignOutArea />
          </div>
        </MyProfile>
      </Wrapper>
    </Provider>
  );
};

export default MyPage;
