/* eslint-disable default-param-last */
/* eslint-disable no-unused-vars */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import UserArea from './User';
import UserSignOutArea from './UserSignOut';
import UserInfoEditArea from './UserInfoEdit';
import { Wrapper, ProfileImg, Title, MyProfile } from './style';

const initailState = {
  email: 'user@example.com',
  nickname: 'string',
  birthday: '8월 15일',
  favor: {
    movie: true,
    language: false,
    reading: false,
    game: false,
    coding: false,
    fantasy: false,
    sports: false,
    entertainment: false,
    music: false,
    fashion: false,
    art: false,
    travel: false,
  },
  gender: 'female',
  location: 'Korea',
  profileText: "hi! i'm korean",
  profile_image: 'string',
};

const reducer = (state = initailState, action) => {
  if (initailState === undefined) {
    return { initailState };
  }
  const newState = { ...initailState };
  if (action.type === 'EDITNICKNAME') {
    newState.nickname = '재영이';
  }
  return newState;
};

const store = createStore(reducer);

const MyPage = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default MyPage;
