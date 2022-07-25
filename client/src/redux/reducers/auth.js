import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
  token: '',
  role: '',
  auth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      return { ...state, ...action.payload };
    },
    extraReducers: builder => {
      builder.addCase(PURGE, () => initialState);
    },
  },
});
const { actions, reducer } = authSlice;

export const { setAuth } = actions;

export default reducer;
