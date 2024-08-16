import { createSlice } from "@reduxjs/toolkit";
const initialState = false;
const loggedSlice = createSlice({
    name:'logged',
    initialState,
    reducers:{
        logIn(){
            return true;
        },
        logOut(){
            return false;
        }

    }
});
export const {logIn,logOut} = loggedSlice.actions;
export default loggedSlice.reducer;