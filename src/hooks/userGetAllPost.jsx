import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "@/redux/slice/PostSlice";
import axios from "axios";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fatchPost = async () => {
      try {
        const res = await axios.get('https://socailenz-backend.onrender.com/api/post/AllPost', {
          withCredentials: true,
        })
        if (res.data.success) {
          console.log("hello mister",res.data.posts);
          dispatch(setPosts(res.data.posts));
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fatchPost();
  }, [])
}

export default useGetAllPost;
























// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const usePosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fatchPost = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get('https://socailenz-backend.onrender.com/api/post/AllPost', {
//           withCredentials: true,
//         })
//         if (res.data.success) {
//           setPosts(res.data.posts);
//         }
//         else {
//           setError('Failed to load posts');
//         }

//       } catch (err) {
//         setError(err?.response?.data?.message || 'Something went wrong');

//       } finally {
//         setLoading(false);
//       }
//     }
//     fatchPost();
//   }, []);

//   return { posts, loading, error };





// }

// export default usePosts;