/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */

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
  birthday: '1993-09-22',
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
      birthday: action.data.birthday,
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

export default reducer;
