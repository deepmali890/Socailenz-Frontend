import React from 'react'

const SearchPage = () => {
  return (
<>
<div className="min-h-screen bg-black text-white p-4 sm:p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Search</h1>

      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-zinc-800 aspect-square rounded-lg overflow-hidden shadow hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`https://via.placeholder.com/400x400?text=Post+${i + 1}`}
              alt={`Post ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
</>
  )
}

export default SearchPage
