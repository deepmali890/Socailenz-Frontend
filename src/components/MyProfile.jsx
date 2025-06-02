import { Bookmark, Grid3X3, PlaySquare, Settings } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { user } = useSelector((store) => store.auth);

    const posts = [
        "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
        "public/WhatsApp Image 2025-05-06 at 16.03.13_3ad19a80.jpg",
        "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",

    ];

    const navigate = useNavigate()

  return (
    <div className="bg-black text-white min-h-screen font-sans pb-16">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
        <h2 className="text-lg font-semibold">{user?.username}</h2>
        <Settings className="w-6 h-6 text-white cursor-pointer" />
      </div>

      {/* Profile Section */}
      <div className="p-4 md:flex md:gap-6 md:items-start">
        {/* Profile Pic */}
        <div>
          <img
            src={user?.profilePicture || "/default-avatar.jpg"}
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gray-600 object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 mt-4 md:mt-0 md:text-left">
          <h3 className="font-semibold text-lg">{user?.username}</h3>
          <button className="mt-2 text-sm text-zinc-400 border border-zinc-700 rounded px-3 py-1">
            {user?.bio || "Full Stack Dev"}
          </button>

          <div className="mt-2 text-sm leading-tight space-y-1">
            <p className="font-bold text-white">{user?.fullName || "No name"}</p>
            <p className="text-blue-400">@{user?.username}</p>
            <p>🌍 {user?.location || "No location"}</p>
            <p>📧 {user?.email}</p>
            <p>📱 {user?.phoneNumber}</p>
            <p>🔗 <a href={user?.website} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">{user?.website}</a></p>
          </div>

          {/* Stats */}
          <div className="flex justify-around md:justify-start md:gap-10 mt-4 text-sm">
            <div className="text-center">
              <strong className="block text-white">{user?.posts?.length || 0}</strong>
              <span className="text-zinc-400">posts</span>
            </div>
            <div className="text-center">
              <strong className="block text-white">{user?.followers?.length || 0}</strong>
              <span className="text-zinc-400">followers</span>
            </div>
            <div className="text-center">
              <strong className="block text-white">{user?.following?.length || 0}</strong>
              <span className="text-zinc-400">following</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4 w-full md:w-auto">
            <button className="flex-1 py-1.5 text-sm rounded cursor-pointer bg-zinc-800 hover:bg-zinc-700" onClick={()=> navigate('/editprofile')}>
              Edit profile
            </button>
            <button className="flex-1 py-1.5 text-sm cursor-pointer rounded bg-zinc-800 hover:bg-zinc-700" onClick={()=> navigate('/archive')}>
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
        {(user?.posts?.length ? user.posts : posts).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Post ${i}`}
            className="aspect-square object-cover w-full h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
