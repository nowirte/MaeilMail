import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendUsers: [],
  searchField: ''
};

const searchSlice = createSlice({
  name:'search',
  initialState,
  reducers: {
    recommendInit (state,action) {
      const {recommendUsers} = action.payload
      state.recommendUsers = recommendUsers
    },
    search (state,action) {
      const {searchField} = action.payload;
      state.searchField = searchField
    }
  }
})

export default searchSlice;
export const {recommendInit, search} = searchSlice.actions
export const recommendUsersSelector = (state)=> state.recommendUsers
export const searchFieldSelector = (state)=> state.searchField