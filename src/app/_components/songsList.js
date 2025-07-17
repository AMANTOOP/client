"use client";
import React, { useState, useEffect } from "react";
import SongCard from "./songCard";

export default function SongsList({ playlistId }) {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/global-search/search?name=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        return;
      }

      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        handleSearch();
      }
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-20">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
        className="w-full p-3 rounded-xl border border-gray-300 mb-6 focus:outline-none focus:ring focus:border-blue-400"
      />

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} playlistId={playlistId} />
        ))}
      </div>
    </div>
  );
}
