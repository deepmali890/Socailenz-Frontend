import React from 'react';
import { FloatingDock } from "./ui/floating-dock";
import {
  Home,
  Search,
  Video,
  MessageCircle,
  PlusCircle,
  User,
  Compass,
  LogOut,
  Heart,
} from "lucide-react";
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeftSideBar = () => {
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      const res = await axios.post('https://socailenz-backend.onrender.com/api/user/logout', {}, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message || "Logout SuccessFull!");
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout Failed!");
    }
  };

  const links = [
    { title: "Home", icon: <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/" },
    { title: "Search", icon: <Search className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/search" },
    { title: "Reels", icon: <Video className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/reels" },
    { title: "Message", icon: <MessageCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/messages" },
    { title: "Profile", icon: <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/profile" },
    { title: "Notification", icon: <Heart className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/notification" },
    { title: "Create", icon: <PlusCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/create" },
    { title: "Explore", icon: <Compass className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/explore" },
    { title: "Logout", icon: <LogOut className="h-full w-full text-neutral-500 dark:text-neutral-300 cursor-pointer" />, action: logoutHandle }, // 👈 use action instead of href
  ];

  return (
    <div className="hidden md:flex md:flex-col w-64 h-full p-4 border-r border-neutral-800 pr-2">
      <FloatingDock
        mobileClassName="hidden"
        desktopClassName="flex flex-col gap-4"
        items={links}
      />
    </div>

    
  );
};

export default LeftSideBar;
