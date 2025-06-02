import React from 'react'

const ExpolorePage = () => {

    const posts = [
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
      "/public/WhatsApp Image 2025-05-08 at 10.55.30_93410640.jpg",
    ];
    return (
        <>
            <div className="min-h-screen bg-black p-2 sm:p-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
                        {posts.map((post, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={post}
                                    alt={`Post ${index + 1}`}
                                    className="w-full aspect-square object-cover hover:brightness-75 transition"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExpolorePage
