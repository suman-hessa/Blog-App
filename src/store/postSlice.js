import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addAllPosts: (state, action)=>{
            const allPosts = action.payload.allPosts;
            state.posts = allPosts;
        },
        deleteAllPosts: (state)=>{
            state.posts = []
        },
        addPost: (state, action)=>{
            const newPost = action.payload.newPost;
            state.posts.push(newPost);
        },
        deletePost: (state, action)=>{
            const postId = action.payload.documentId;
            console.log(postId);
            state.posts = state.posts.filter((post)=> post.$id !== postId )
        },
        updatePost: (state, action)=>{
            const postId = action.payload.documentId;
            console.log({postId});
            const postData = action.payload.updatedPost;
            state.posts = state.posts.map((post)=> post.$id === postId? {...post, ...postData}: post);
        },
    }
})

export const {addAllPosts, addPost, updatePost, deletePost, deleteAllPosts} = postSlice.actions; 

export default postSlice.reducer;