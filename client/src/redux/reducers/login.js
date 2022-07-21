const initialState = {
  loginEmail: '',
  loginPassword: '',
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_EMAIL':
      return { ...state, loginEmail: action.email };
    case 'LOGIN_PASSWORD':
      return { ...state, loginPassword: action.password };
    default:
      return state;
  }
}

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loginEmail: '',
//   loginPassword: '',
// };

// const loginSlice = createSlice({
//   name:'login',
//   initialState,
//   reducers: {
//     LOGIN_EMAIL (state,action) {
//       state.loginEmail= action.email
//       // payload 값으로 바꿔줘야 할 듯??
//     },
//     LOGIN_PASSWORD (state,action) {
//       state.loginPassword= action.password
//     }
//   }
// })


// export default loginSlice;
