import { createSlice } from "@reduxjs/toolkit";
const initialState={};
const exploreSlice = createSlice({
     name:'explore',
     initialState,
     reducers:{
        addExplore(state,action){
            return action.payload;
        }
     }
});
export const { addExplore } = exploreSlice.actions;
export default exploreSlice.reducer;