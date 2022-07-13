/* eslint-disable default-param-last */
/* eslint-disable no-unused-vars */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import UserArea from './User';
import UserSignOutArea from './UserSignOut';
import UserInfoEditArea from './UserInfoEdit';
import { Wrapper, ProfileImg, Title, MyProfile } from './style';

const EDIT_USERINFO = 'EDITUSERINFO';
const EDIT_PASSWORD = 'EDITPASSWORD';

const initailState = {
  nickname: 'string',
  profileText: "hi! i'm korean",
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
  language: '영어',
  password: '12345',
  email: 'user@example.com',
  birthday: '8월 15일',
  gender: 'female',
  location: 'Korea',
  profile_image: 'string',
};

const reducer = (state = initailState, action) => {
  if (initailState === undefined) {
    return { initailState };
  }
  const newState = { ...initailState };
  if (action.type === EDIT_USERINFO) {
    return {
      ...newState,
      nickname: action.data.nickname,
      profileText: action.data.profileText,
      language: action.data.language,
    };
  }

  if (action.type === EDIT_PASSWORD) {
    return {
      ...newState,
      password: action.data.password,
    };
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
