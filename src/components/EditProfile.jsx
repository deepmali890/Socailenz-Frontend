import React from 'react'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const navigate = useNavigate()

    const handleEditProfile = (e) => {
        e.preventDefault()
        // Submit logic here
    }

    return (
        <div className="max-w-2xl mx-auto p-6 text-white bg-black min-h-screen mb-4">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-sm text-gray-300 hover:text-white flex items-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
            </button>

            <h2 className="text-2xl font-bold mb-6">Edit profile</h2>
            <form className="space-y-6" onSubmit={handleEditProfile}>
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                    <img
                        src="/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm"
                    >
                        Change photo
                    </button>
                </div>

                {/* Website */}
                <div>
                    <label className="block mb-1 font-medium">Website</label>
                    <input
                        type="text"
                        placeholder="Website"
                        className="w-full bg-gray-700/40 p-3 rounded-lg placeholder-gray-400"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Editing your links is only available on mobile.
                    </p>
                </div>

                {/* Bio */}
                <div>
                    <label className="block mb-1 font-medium">Bio</label>
                    <textarea
                        maxLength={150}
                        placeholder="Bio"
                        className="w-full bg-gray-700/40 p-3 rounded-lg h-24 resize-none placeholder-gray-400"
                    />
                    <p className="text-right text-sm text-gray-400">150 / 150</p>
                </div>

                {/* Show Threads Badge */}
                <div className="flex justify-between items-center">
                    <label className="font-medium">Show Threads badge</label>
                    <input type="checkbox" className="toggle toggle-md" />
                </div>

                {/* Gender */}
                <div>
                    <label className="block mb-1 font-medium">Gender</label>
                    <select className="w-full bg-gray-700/40 p-3 rounded-lg text-white">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                        This won’t be part of your public profile.
                    </p>
                </div>

                {/* Suggestions toggle */}
                <div className="flex justify-between items-center">
                    <label className="font-medium">Show account suggestions on profiles</label>
                    <input type="checkbox" className="toggle toggle-md" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-white/90 cursor-pointer p-3 rounded-lg font-semibold"
                >
                    Save Changes
                </button>
            </form>
        </div>
    )
}

export default EditProfile
