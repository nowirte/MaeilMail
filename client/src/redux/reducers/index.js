import loginSlice from './login';
import signupSlice from './signup';
import mainLettersSlice from './mainLetters';

const reducer = {
  login: loginSlice.reducer,
  signup: signupSlice.reducer,
  mainLetters: mainLettersSlice.reducer
}

export default reducer;

