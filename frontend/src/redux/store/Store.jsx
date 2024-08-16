import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slice/postSlice";
import userReducer from '../slice/userSlice';
import exploreReducer from '../slice/exploreSlice';
import loggedReducer from '../slice/loggedSlice';
export const store = configureStore({
    reducer: {
       currentUser:userReducer,
       logged:loggedReducer,
       posts:postReducer,
       explore:exploreReducer
    },
    devTools: true
});
