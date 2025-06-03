// redux/slice/PostSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
    },
});

export const { setPosts } = postSlice.actions;

export const fetchPosts = () => async (dispatch) => {
    try {
        const response = await axios.get('https://socailenz-backend.onrender.com/api/v1/post/AllPost', {
            withCredentials: true,
        });
        dispatch(setPosts(response.data.posts));
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }
};

export default postSlice.reducer;





































// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   posts: [],
// };

// const postSlice = createSlice({
//   name: 'post',
//   initialState,
//   reducers: {
//     addPost: (state, action) => {
//       state.posts = [...(state.posts || []), action.payload].reverse();
//     },
//     setPosts: (state, action) => {
//       state.posts = Array.isArray(action.payload) ? action.payload : [];
//     },
//   },
// });

// export const { addPost, setPosts } = postSlice.actions;
// export default postSlice.reducer;
