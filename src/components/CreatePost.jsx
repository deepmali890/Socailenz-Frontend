import React, { useState } from 'react';
import {
    Dialog, DialogContent, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, X } from 'lucide-react';
import axios from 'axios';

const CreatePost = ({ open, setOpen }) => {
    const [previews, setPreviews] = useState([]);
    const [files, setFiles] = useState([]);
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [musicFile, setMusicFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);

        // Generate base64 previews for images
        const filePreviews = selectedFiles.map(file => new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        }));

        Promise.all(filePreviews).then(setPreviews);
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (!caption.trim() || files.length === 0) {
            toast.error("Caption and at least one image are required!");
            return;
        }

        const formData = new FormData();
        formData.append("caption", caption.trim());
        formData.append("location", location.trim());

        files.forEach(file => {
            formData.append("post", file);
        });

        if (musicFile) {
            formData.append("music", musicFile);
        }

        try {
            setLoading(true);
            const res = await axios.post(
                'https://socailenz-backend.onrender.com/api/post/createPost',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true, // This tells browser: "send cookies with this request"
                }
            );
            if (res.data.success) {
                toast.success(res.data.message || "Post created successfully!");
                // Reset form
                setCaption('');
                setLocation('');
                setFiles([]);
                setPreviews([]);
                setMusicFile(null);
                setOpen(false);
            } else {
                toast.error("Failed to create post");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
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

                <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
                    <Input
                        name="post"
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
                                    className="rounded-lg w-full object-cover"
                                />
                            ))}
                        </div>
                    )}
                    <Textarea
                        placeholder="Write a caption..."
                        value={caption}
                        name="caption"
                        onChange={e => setCaption(e.target.value)}
                        className="bg-zinc-800 border-none text-white"
                    />
                    <Input
                        placeholder="Add location"
                        value={location}
                        name="location"
                        onChange={e => setLocation(e.target.value)}
                        className="bg-zinc-800 border-none text-white"
                    />
                    <Input
                        name="music"
                        type="file"
                        accept="audio/*"
                        onChange={e => setMusicFile(e.target.files[0])}
                        className="bg-zinc-800 border-none text-white"
                    />
                    {musicFile && (
                        <p className="text-sm text-zinc-400">Selected music: {musicFile.name}</p>
                    )}
                    <Button type="submit" className="bg-white text-black hover:bg-zinc-300 cursor-pointer">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Post'
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;
