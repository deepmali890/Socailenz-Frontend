import React, { useState } from 'react';
import { X, Heart, MessageCircle, Forward } from 'lucide-react';

const CommentModel = ({ onClose }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setText(val.trim() ? val : '');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
      {/* DESKTOP layout */}
      <div className="hidden md:flex relative w-full max-w-6xl h-[80vh] bg-black text-white">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Left Image */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <img
            src="/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg"
            alt="Post"
            className="max-h-full w-auto object-contain"
          />
        </div>

        {/* Right Comment Panel */}
        <div className="w-[400px] border-l border-neutral-800 flex flex-col">
          <div className="p-4 border-b border-neutral-800 font-semibold text-sm flex gap-2 items-center">
            <img
              src="/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            dilip.saini
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
            <p className="text-lg font-bold">No comments yet.</p>
            <p className="text-sm text-neutral-400">Start the conversation.</p>
          </div>

          <div className="px-4 py-2 text-sm text-neutral-500 border-t border-neutral-800">
            <div className="flex gap-3 items-center">
              <Heart className="text-white cursor-pointer" />
              <MessageCircle className="text-white cursor-pointer" />
              <Forward className="text-white cursor-pointer" />
            </div>
            <p>28 likes</p>
            <p className="text-xs mt-1">1 day ago</p>
          </div>

          <div className="px-4 pb-4 flex justify-between">
            <input
              type="text"
              value={text}
              placeholder="Add a comment..."
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-sm text-white placeholder-neutral-500"
            />
            {text && <span className="text-blue-500 cursor-pointer">Post</span>}
          </div>
        </div>
      </div>

      {/* MOBILE layout */}
      <div className="md:hidden w-full h-full flex flex-col bg-black text-white rounded-t-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800 relative">
          <p className="text-center w-full font-semibold">Comments</p>
          <button className="absolute right-4 top-4 text-white" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Comments Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 space-y-4 py-2">
          {[
            {
              user: "shuklaji_brahmin",
              comment: "🥰",
              time: "19h"
            },
            {
              user: "moddy_girl_96",
              comment: "Congratulations",
              time: "19h"
            },
            {
              user: "mangala5851",
              comment: "❤️ Congratulations ❤️",
              time: "18h",
              likes: 2
            },
            {
              user: "_anjali__gupta01",
              comment: "🙌 😍 🙌",
              time: "19h"
            },
            {
              user: "tarunsharma_tangochari1",
              comment: "Many many congratulations 🎉",
              time: "18h",
              likes: 1
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <img
                src="/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg"
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 text-sm">
                <p>
                  <span className="font-semibold">{item.user}</span>{' '}
                  <span>{item.comment}</span>
                </p>
                <div className="flex gap-4 text-xs text-neutral-500 mt-1">
                  <span>{item.time}</span>
                  {item.likes && <span>{item.likes} likes</span>}
                  <span className="cursor-pointer">Reply</span>
                </div>
              </div>
              <Heart className="w-4 h-4 text-neutral-400 mt-1 cursor-pointer" />
            </div>
          ))}
        </div>

        {/* Add Comment Input */}
        <div className="border-t border-neutral-800 p-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={handleChange}
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-neutral-500"
          />
          {text && <button className="text-blue-500 text-sm font-semibold">Post</button>}
        </div>
      </div>
    </div>
  );
};

export default CommentModel;
