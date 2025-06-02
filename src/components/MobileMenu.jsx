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

const MobileMenu = () => {
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
    { title: "Logout", icon: <LogOut className="h-full w-full text-neutral-500 dark:text-neutral-300 cursor-pointer" />, action: logoutHandle }, 
  ];
  return (
    <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50 bg-black border-t border-neutral-800">
      <FloatingDock
        mobileClassName="flex justify-around p-2"
        desktopClassName="hidden"
        items={links}
      />
    </div>
  )
}

export default MobileMenu
