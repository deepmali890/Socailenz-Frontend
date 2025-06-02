import React, { useState } from 'react';
import {
  Home, Search, Video, MessageCircle, PlusCircle,
  Compass, LogOut, Heart, X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/slice/auth.slice';
import CreatePost from './CreatePost';
import { motion } from 'framer-motion';


const LeftSideBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();




  const logoutHandle = async () => {
    try {
      const res = await axios.post(
        'https://socailenz-backend.onrender.com/api/user/logout',
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setAuthUser(null));
        toast.success(res.data.message || "Logout successful!");
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  };

  const links = [
    { title: "Home", icon: <Home />, href: "/" },
    { title: "Search", icon: <Search />, href: "/search" },
    { title: "Reels", icon: <Video />, href: "/#" },
    { title: "Message", icon: <MessageCircle />, href: "/#" },
    {
      title: "Notification",
      icon: (
        <div className="relative">
          <Heart />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
        </div>
      ),
      href: "/notification",
    },
    {
      title: "Create",
      icon: <PlusCircle />,
      action: () => setOpen(true),
    },
    { title: "Explore", icon: <Compass />, href: "/expolre" },
    {
      title: "Profile",
      icon: (
        <Avatar className="h-6 w-6 rounded-full">
          <AvatarImage
            src={user?.profilePicture || "https://github.com/evilrabbit.png"}
            alt={user?.username || "User"}
          />
          <AvatarFallback>{user?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
      ),
      href: "/profile",
    },
    { title: "Logout", icon: <LogOut className="cursor-pointer" />, action: logoutHandle },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex md:flex-col w-64 h-full p-4 bg-black/50 backdrop-blur-lg border-r border-zinc-800 shadow-xl"
      >
        <motion.div
          className="my-4 font-berkshire text-center text-2xl text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Socialenz
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 mt-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {links.map((link, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 transition cursor-pointer text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => link.href ? navigate(link.href) : link.action?.()}
              variants={itemVariants}
            >
              <div className="h-6 w-6 text-neutral-300">{link.icon}</div>
              <span className="text-sm">{link.title}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>





      {/* Here's the key part: render the CreatePost dialog */}
      <CreatePost open={open} setOpen={setOpen} />



    </>
  );
};

export default LeftSideBar;
