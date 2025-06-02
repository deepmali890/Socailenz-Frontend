import React, { useState } from 'react';
import {
  Home, Search, Video, MessageCircle, PlusCircle,
  Compass, LogOut, Heart, X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/slice/auth.slice';
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [musicFile, setMusicFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const filePreviews = selectedFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePreviews).then(results => setPreviews(results));
  };

  const handlePostSubmit = () => {
    toast.success("Post created (demo only)");
    setOpen(false);
    setPreviews([]);
    setFiles([]);
    setCaption('');
    setLocation('');
    setMusicFile(null);
  };

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-zinc-950 text-white rounded-2xl p-6 w-[95vw]">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg">Create New Post</DialogTitle>
            <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <DialogDescription className="text-sm text-zinc-400 mb-4">
            Add your photos, caption, music, and location to share your moment.
          </DialogDescription>

          <div className="flex flex-col gap-4">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="bg-zinc-800 border-none text-white"
            />
            {previews.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {previews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className="rounded-lg  w-full object-cover"
                  />
                ))}
              </div>
            )}
            <Textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="bg-zinc-800 border-none text-white"
            />
            <Input
              placeholder="Add location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="bg-zinc-800 border-none text-white"
            />
            <Input
              type="file"
              accept="audio/*"
              onChange={e => setMusicFile(e.target.files[0])}
              className="bg-zinc-800 border-none text-white"
            />
            {musicFile && (
              <p className="text-sm text-zinc-400">Selected music: {musicFile.name}</p>
            )}
            <Button onClick={handlePostSubmit} className="bg-white text-black hover:bg-zinc-300 cursor-pointer">Post</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeftSideBar;
