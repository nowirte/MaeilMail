import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
  mainComingLetters: [],
  mainArrivedLetter: {},
  // loading: false,
  // error: ''
};

// const updateByLetterId = async (letterId) => {
//   try {
//     const res = axios.patch(`http://localhost:3001/api/letters/:${letterId}`,{
//       "isRead": "true"
//   })
//   } catch (e) {
//     console.error(e)
//   }
// }

// const updateLettersById = createAsyncThunk("mainLetters/updateLettersById", async (id)=>{})

const mainLettersSlice = createSlice({
  name:'mainLetters',
  initialState,
  reducers: {
    initComingLetters (state,action) {
      const {mainComingLetters} = action.payload
      state.mainComingLetters = mainComingLetters
    },
    initArrivedLetter (state, action) {
      const {mainArrivedLetter} = action.payload;
      state.mainArrivedLetter = mainArrivedLetter;
    },

  },
  // extraReducers: (builder)=>{}
})
export const {initComingLetters, initArrivedLetter} = mainLettersSlice.actions
export default mainLettersSlice;