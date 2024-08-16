import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state, action) {
            return action.payload;
        },
        savedPost(state,action)
        {
            state.savedPosts.push(action.payload);
        },
        userPost(state,action){
            state.posts.push(action.payload);
        },
        
        removePost(state, action) {
            const postId = action.payload;
            state.posts = state.posts.filter(post=>post!== postId);
            return state;
        }
        ,
        deleteUser(){
          return {};
        }
    }
});

export const { addUser,savedPost,userPost,deleteUser,removePost } = userSlice.actions;
export default userSlice.reducer;
