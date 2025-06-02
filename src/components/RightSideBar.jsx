import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector(state => state.auth);

  const suggestions = [
    {
      username: "bhavesh_mali_88",
      followers: "Followed by thesunileghlot_ + 9...",
      image: "https://via.placeholder.com/40",
    },
    {
      username: "galaxy_lalit_27_",
      followers: "Followed by _pankaj_saini_66...",
      image: "https://via.placeholder.com/40",
    },
    {
      username: "devsa.mali.123",
      followers: "Followed by rahul_saini06__ + 1...",
      image: "https://via.placeholder.com/40",
    },
    {
      username: "khivarambhayal",
      followers: "Followed by rahul_saini06__ + 1...",
      image: "https://via.placeholder.com/40",
    },
    {
      username: "official_vijesh_18",
      followers: "Followed by village__life__66_...",
      image: "https://via.placeholder.com/40",
    },
  ];

  return (
    <div className="w-full max-w-sm p-4 text-white text-sm hidden xl:block">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.profilePicture || "https://github.com/evilrabbit.png"}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{user?.username}</p>
            <p className="text-gray-400 italic text-xs">{user?.fullName}</p>
          </div>
        </div>
        <button className="text-blue-400 font-semibold hover:underline">Switch</button>
      </div>

      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-400 font-semibold">Suggested for you</p>
        <button className="text-white hover:underline">See All</button>
      </div>

      <div className="space-y-3">
        {suggestions.map((user, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-gray-400 text-xs">{user.followers}</p>
              </div>
            </div>
            <button className="text-blue-400 font-semibold hover:underline">Follow</button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-[11px] text-gray-500 leading-5">
        <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
        <p>Locations · Language · Meta Verified</p>
        <p className="mt-2">© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default Sidebar;