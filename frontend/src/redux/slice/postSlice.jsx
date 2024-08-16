import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

  const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
      addPost(state, action) {
        if (Array.isArray(action.payload)) {
          return [...action.payload];
        } else {
          state.push(action.payload);
        }
      }
    }
  });
  export const {addPost}=postSlice.actions;
  export default postSlice.reducer;