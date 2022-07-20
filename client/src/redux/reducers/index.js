import loginSlice from './login';
import signupSlice from './signup';

const reducer = {
  login: loginSlice.reducer,
  signup: signupSlice.reducer
}

export default reducer;

// export default combineReducers({
//   login,
//   signup,
// });
