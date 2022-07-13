/* eslint-disable default-param-last */
/* eslint-disable no-unused-vars */
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

  return newState;
};

export default reducer;
