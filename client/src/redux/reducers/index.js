import loginSlice from './login';
import signupSlice from './signup';
import mainLettersSlice from './mainLetters';
import searchUserSlice from './searchUser';

const reducer = {
  login: loginSlice.reducer,
  signup: signupSlice.reducer,
  mainLetters: mainLettersSlice.reducer,
  searchUser: searchUserSlice.reducer
}

export default reducer;

