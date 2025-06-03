// src/components/Posts.jsx
import { useSelector } from 'react-redux';
import Post from './Post';

/**
 * Posts Component
 * Responsible for fetching all posts from Redux store and rendering individual Post components.
 */
const Posts = () => {
  // Select posts array from Redux state. Uses optional chaining for safety fallback.
  const allPosts = useSelector((state) => state.posts?.posts || []);

  return (
    <>
      {allPosts.length > 0 ? (
        // Map through allPosts and render each Post component
        allPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      ) : (
        // Show fallback text when no posts are available
        <p className="text-center">No posts found.</p>
      )}
    </>
  );
};

export default Posts;
