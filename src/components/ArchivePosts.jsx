import React from 'react'

const ArchivePosts = () => {
    return (
        <>
            <div className="min-h-screen bg-black text-white p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center space-x-2 mb-4">
                    <button className="text-xl">←</button>
                    <h1 className="text-xl font-bold">Archive</h1>
                </div>

                {/* Tabs */}
                <div className="flex justify-center border-b border-gray-700 mb-4">
                    <button className="text-sm font-semibold px-4 pb-2 border-b-2 border-white">POSTS</button>
                </div>

                {/* Info */}
                <p className="text-gray-400 text-sm text-center mb-6">
                    Only you can see your archived posts unless you choose to share them.
                </p>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {/* Single post card */}
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md">
                            <img
                                src={`/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg?text=Post+${i + 1}`}
                                alt={`Post ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-white text-black px-2 py-1 rounded text-xs font-semibold">
                                <p className="leading-tight text-center">
                                    {28 - i} <br /> May
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ArchivePosts
