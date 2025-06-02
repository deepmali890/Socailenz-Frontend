import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { Bookmark, Ellipsis, Forward, Heart, MessageCircle } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { DialogContent } from './ui/dialog'
import CommentModel from './CommentModel'

const Post = ({ post }) => {

    const [showComments, setShowComments] = useState(false);
    const [text, setText] = useState('');

    const changeCommentEventHandler = (e) => {

        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText)
        } else {
            setText('')
        }

    }
    return (

        <>
            <div className="max-w-md mx-auto bg-black text-white font-sans border border-neutral-800 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3">
                    <img
                        src={post.author.profilePicture} // Replace with profile pic
                        alt="user"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        <p className="text-sm font-semibold">{post.author.username}<span className="text-blue-500"></span></p>
                        <p className="text-xs text-neutral-400">{post.location}</p>
                    </div>
                    <div className="text-neutral-400 text-lg">
                        <Dialog>

                            <DialogTrigger asChild>
                                <Ellipsis className=' cursor-pointer' />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] flex flex-col items-center text-sm text-center">

                                <Button variant="ghost" className=" w-full cursor-pointer text-red-400 font-bold border-2 "> UnFollow</Button>
                                <Button variant="ghost" className=" w-full cursor-pointer font-bold border-[1px] "> Add To Favorites</Button>
                                <Button variant="ghost" className=" w-full cursor-pointer font-bold border-[1px]"> Go To Post</Button>
                                <Button variant="ghost" className=" w-full cursor-pointer font-bold border-[1px]"> Share To...</Button>
                                <Button variant="ghost" className=" w-full cursor-pointer font-bold border-[1px]"> About This Account</Button>
                                <Button variant="ghost" className=" w-full cursor-pointer font-bold  border-2"> Cancel</Button>

                            </DialogContent>

                        </Dialog>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {post.images.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`post-${index}`}
                            className="w-full object-cover rounded"
                        />
                    ))}
                </div>

                {/* Action Buttons */}
                <div className=" flex items-center justify-between px-2">
                    <div className="flex items-center px-4 py-2 gap-4 text-xl text-white">
                        <Heart className="hover:gray-blue-400 text-white cursor-pointer" />
                        <MessageCircle className="hover:gray-blue-400 text-white cursor-pointer" />
                        <Forward className="hover:gray-blue-400 text-white cursor-pointer" />
                    </div>
                    <Bookmark className="hover:text-blue-400 cursor-pointer text-end" />
                </div>

                {/* Likes */}
                <div className="px-4 text-sm font-medium">{post.likes.length} likes</div>

                {/* Caption */}
                <div className="px-4 py-2 text-sm">
                    <span className="font-semibold">{post.caption}</span>{" "}
                    <span>🔥👊❤️</span>
                </div>

                {/* Comments Link */}
                <div className="px-4 text-sm text-neutral-400 mb-2 cursor-pointer"
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
                    {
                        text && <span className='text-blue-500 cursor-pointer'>Post</span>
                    }

                </div>
            </div>
            {showComments && <CommentModel onClose={() => setShowComments(false)} />}
        </>


    )
}

export default Post
