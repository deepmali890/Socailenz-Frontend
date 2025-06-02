import axios from "axios";
import { useEffect } from "react";
import { setPosts } from "@/redux/slice/PostSlice";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const res = await axios.get(
          "https://socailenz-backend.onrender.com/api/post/AllPost",
          { withCredentials: true }
        );

        console.log("API Response:", res.data.posts); // ✅ Debugging ke liye
        if (res.data.success) {
          dispatch(setPosts(res.data.posts || [])); // ✅ Empty array fallback
          console.log("Redux me posts set ho gaya!", res.data.posts);
        }
      } catch (error) {
        console.error("❌ Fetching error:", error.message);
      }
    };

    getAllPost();
  }, []);
};


export default useGetAllPost;
