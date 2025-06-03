import React, { useState } from 'react';
import {
  Bookmark,
  Ellipsis,
  Forward,
  Heart,
  MessageCircle,
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
  const [showComments, setShowComments] = useState(false);
  const [text, setText] = useState('');

  const { user } = useSelector((state) => state.auth);
  const allPosts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const changeCommentEventHandler = (e) => {
    setText(e.target.value);
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `https://socailenz-backend.onrender.com/api/post/posts/${post._id}/deletePost`,
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

  return (
    <>
      <div className="max-w-md mx-auto bg-black text-white font-sans border border-neutral-800 rounded-lg overflow-hidden">
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

        {/* Images */}
        <Carousel className="w-full">
          <CarouselContent>
            {post.images.map((url, i) => (
              <CarouselItem key={i}>
                <Card>
                  <CardContent className="flex items-center justify-center p-0">
                    <img
                      src={url}
                      alt={`post-${i}`}
                      className="w-full object-cover rounded"
                    />
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

        {/* Action Buttons */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center px-4 py-2 gap-4 text-xl text-white">
            <Heart className="cursor-pointer" />
            <MessageCircle
              className="cursor-pointer"
              onClick={() => setShowComments(true)}
            />
            <Forward className="cursor-pointer" />
          </div>
          <Bookmark className="cursor-pointer text-end" />
        </div>

        {/* Likes */}
        <div className="px-4 text-sm font-medium">
          {post.likes.length} likes
        </div>

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
        <CommentModel
          onClose={() => setShowComments(false)}
          comments={post.comments}
        />
      )}
    </>
  );
};

export default Post;
