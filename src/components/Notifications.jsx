import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    user: "shrawan_saini__",
    action: "liked your comment: Jai ho ji",
    time: "1d",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    user: "bhavesh_mali_88",
    action: "started following you.",
    time: "2d",
    follow: true,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    user: "_pankaj_saini__66",
    action: "mentioned you in a comment: @dilip.saini_ deepesa 👑 🐙",
    time: "2d",
    avatar: "https://via.placeholder.com/40",
  },
];

const Notifications = () => {

    const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
  

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-screen">
        <div className="sticky top-0 z-10 bg-black border-b border-neutral-800 p-4 flex items-center justify-between">
          <button className="md:hidden">
            <ArrowLeft onClick={()=> navigate('/') }/>
          </button>
          <h2 className="text-lg font-semibold w-full text-center md:text-left md:w-auto">Notifications</h2>
        </div>

        <div className="p-4 space-y-6">
          <h3 className="text-sm text-neutral-400 font-semibold">This week</h3>
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <img
                  src={notif.avatar}
                  alt={notif.user}
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-sm">
                  <span className="font-semibold">{notif.user}</span> {notif.action}
                  <div className="text-xs text-neutral-400">{notif.time}</div>
                </div>
              </div>
              {notif.follow && (
                <button className="text-sm bg-blue-600 text-white px-4 py-1 rounded-md font-medium hover:bg-blue-700">
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom padding for mobile nav */}
        <div className="h-16 md:hidden" />
      </div>
    </div>
  );
};

export default Notifications;
