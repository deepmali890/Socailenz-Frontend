import { Bookmark, Grid3X3, PlaySquare, Settings } from 'lucide-react';
import React from 'react'

const MyProfile = () => {


    const posts = [
        "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
        "public/WhatsApp Image 2025-05-06 at 16.03.13_3ad19a80.jpg",
        "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",

    ];
    return (
        <>
  <div className="bg-black text-white min-h-screen font-sans pb-16">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
        <h2 className="text-lg font-semibold">dilip.saini_</h2>
        <Settings className="w-6 h-6 text-white cursor-pointer" />
      </div>

      {/* Profile Section */}
      <div className="p-4 md:flex md:gap-6 md:items-start">
        {/* Profile Pic */}
        <div className="">
          <img
            src="/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg"
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gray-600 object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 mt-4 md:mt-0 md:text-left">
          <h3 className="font-semibold text-lg">dilip.saini_</h3>
          <button className="mt-2 text-sm text-zinc-400 border border-zinc-700 rounded px-3 py-1">
            Digital creator
          </button>

          <div className="mt-2 text-sm leading-tight space-y-1">
            <p className="font-bold text-white">Dilip......♡</p>
            <p className="text-blue-400">@dilip.saini</p>
            <p>🤝 | HustleWithDeep</p>
            <p>💪 | On a Journey from "aam" to "khas" munda</p>
            <p>🌸 | स्वस्ति स्वस्त्य समजाय सर्वेषाम्।</p>
            <p>🇮🇳 | Representing...</p>
          </div>

          {/* Stats */}
          <div className="flex justify-around md:justify-start md:gap-10 mt-4 text-sm">
            <div className="text-center ">
              <strong className="block text-white">44</strong>
              <span className="text-zinc-400">posts</span>
            </div>
            <div className="text-center cursor-pointer">
              <strong className="block text-white">616</strong>
              <span className="text-zinc-400">followers</span>
            </div>
            <div className="text-center cursor-pointer">
              <strong className="block text-white">440</strong>
              <span className="text-zinc-400">following</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4 w-full md:w-auto">
            <button className="flex-1 py-1.5 text-sm rounded cursor-pointer bg-zinc-800 hover:bg-zinc-700">
              Edit profile
            </button>
            <button className="flex-1 py-1.5 text-sm cursor-pointer rounded bg-zinc-800 hover:bg-zinc-700">
              View archive
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-neutral-800 flex justify-around py-2 text-neutral-400 text-xs">
        <div className="flex flex-col items-center cursor-pointer text-white">
          <Grid3X3 className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Posts</span>
        </div>
        <div className="flex flex-col cursor-pointer items-center">
          <PlaySquare className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Reels</span>
        </div>
        <div className="flex flex-col cursor-pointer items-center">
          <Bookmark className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Saved</span>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-px bg-black">
        {posts.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Post ${i}`}
            className="aspect-square object-cover w-full h-full"
          />
        ))}
      </div>
    </div>
        </>
    )
}

export default MyProfile
