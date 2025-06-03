import React, { useState, useRef, useEffect } from 'react';
import {
  Bookmark,
  Ellipsis,
  Forward,
  Heart,
  MessageCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import CommentModel from './CommentModel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Card, CardContent } from './ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../redux/slice/PostSlice';

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const allPosts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();


  const [showComments, setShowComments] = useState(false);
  const [text, setText] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);
  const [liked,setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);

  const changeCommentEventHandler = (e) => {
    setText(e.target.value);
  };

  const likeDisLikeHandler = async()=>{
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.get(`https://socailenz-backend.onrender.com/api/v1/post/${post._id}/${action}`, {
        withCredentials: true,
      })
      if(res.data.success){
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes)
        setLiked(!liked)

        const updatedPostData = allPosts.map((p) => {
          if (p._id === post._id) {
            return {
              ...p,
              likes: liked ? p.likes.filter((id) => id !== user?._id) : [...p.likes, user?._id],
            };
          }
          return p;
        });
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message || "Like SuccessFull!");
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Like Failed!");
      
    }
  }

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `https://socailenz-backend.onrender.com/api/v1/post/posts/${post._id}/deletePost`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedPosts = allPosts.filter((p) => p._id !== post._id);
        dispatch(setPosts(updatedPosts));
        toast.success('Post deleted successfully');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Error deleting post');
    }
  };

  // Listen to global event when any post starts playing
  useEffect(() => {
    function handleOtherPostPlay(e) {
      const playingPostId = e.detail;
      if (playingPostId !== post._id && audioRef.current) {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }

    window.addEventListener('post-music-play', handleOtherPostPlay);

    return () => {
      window.removeEventListener('post-music-play', handleOtherPostPlay);
    };
  }, [post._id]);

  // Play or mute audio based on isMuted state
  useEffect(() => {
    if (audioRef.current && post.music) {
      audioRef.current.muted = isMuted;
      audioRef.current
        .play()
        .catch((err) => {
          console.warn('Autoplay blocked:', err.message);
        });
    }
  }, [isMuted, post.music]);

  // Show loading spinner if post data is missing
  if (!post || !post.images) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="relative max-w-md mx-auto bg-black text-white font-sans border border-neutral-800 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src={post.author.profilePicture}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold">{post.author.username}</p>
            <p className="text-xs text-neutral-400">{post.location}</p>
          </div>
          <div className="text-neutral-400 text-lg">
            <Dialog>
              <DialogTrigger asChild>
                <Ellipsis className="cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] flex flex-col gap-1 items-center text-sm text-center">
                {user?.username === post.author.username && (
                  <Button
                    variant="ghost"
                    onClick={deletePostHandler}
                    className="w-full text-red-400 font-bold border cursor-pointer"
                  >
                    Delete
                  </Button>
                )}
                <Button variant="ghost" className="w-full font-bold border">
                  Unfollow
                </Button>
                <Button variant="ghost" className="w-full font-bold border">
                  Add to Favorites
                </Button>
                <Button variant="ghost" className="w-full font-bold border">
                  Go to Post
                </Button>
                <Button variant="ghost" className="w-full font-bold border">
                  Share to...
                </Button>
                <Button variant="ghost" className="w-full font-bold border">
                  About this account
                </Button>
                <Button variant="ghost" className="w-full font-bold border">
                  Cancel
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Images + Music */}
        <Carousel className="w-full">
          <CarouselContent>
            {post.images.map((url, i) => (
              <CarouselItem key={i}>
                <Card className="relative">
                  <CardContent className="flex items-center justify-center p-0 relative">
                    <img
                      src={url}
                      alt={`post-${i}`}
                      className="w-full object-cover rounded"
                    />

                    {post.music && i === 0 && (
                      <>
                        <audio
                          ref={audioRef}
                          src={post.music}
                          loop
                          autoPlay
                          muted={isMuted}
                        />
                        <button
                          onClick={() => {
                            if (audioRef.current) {
                              if (audioRef.current.muted) {
                                audioRef.current.muted = false;
                                setIsMuted(false);
                                window.dispatchEvent(
                                  new CustomEvent('post-music-play', {
                                    detail: post._id,
                                  })
                                );
                              } else {
                                audioRef.current.muted = true;
                                setIsMuted(true);
                              }
                            }
                          }}
                          className="absolute top-4 right-4 bg-black/60 p-2 rounded-full text-white hover:bg-black/80 z-10"
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {post.images.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 shadow cursor-pointer" />
              <CarouselNext className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 shadow cursor-pointer" />
            </>
          )}
        </Carousel>

        {/* Actions */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center px-4 py-2 gap-4 text-xl text-white">
            <Heart className="cursor-pointer"  onClick={likeDisLikeHandler}/>
            <MessageCircle
              className="cursor-pointer"
              onClick={() => setShowComments(true)}
            />
            <Forward className="cursor-pointer" />
          </div>
          <Bookmark className="cursor-pointer text-end" />
        </div>

        {/* Likes */}
        <div className="px-4 text-sm font-medium">{postLike} likes</div>

        {/* Caption */}
        <div className="px-4 py-2 text-sm">
          <span className="font-semibold">{post.caption}</span> 🔥👊❤️
        </div>

        {/* View Comments */}
        <div
          className="px-4 text-sm text-neutral-400 mb-2 cursor-pointer"
          onClick={() => setShowComments(true)}
        >
          View all {post.comments.length} comments
        </div>

        {/* Add Comment */}
        <div className="px-4 pb-4 flex justify-between">
          <input
            type="text"
            value={text}
            placeholder="Add a comment..."
            onChange={changeCommentEventHandler}
            className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-neutral-500"
          />
          {text.trim() && (
            <span
              className="text-blue-500 cursor-pointer ml-2"
              onClick={() => {
                toast.info('Comment feature coming soon!');
                setText('');
              }}
            >
              Post
            </span>
          )}
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <CommentModel onClose={() => setShowComments(false)} comments={post.comments} />
      )}
    </>
  );
};


export default Post;
