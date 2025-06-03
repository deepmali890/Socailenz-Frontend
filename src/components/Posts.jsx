import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/slice/PostSlice';
import Post from './Post';

const Posts = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts?.posts || []);

  // ✅ Fetch posts when component mounts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {allPosts.length > 0 ? (
        allPosts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p className="text-center">No posts found.</p>
      )}
    </>
  );
};

export default Posts;
