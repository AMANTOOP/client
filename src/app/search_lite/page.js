"use client";
import React, { useState, useEffect } from "react";
import SongCard from "../_components/songCard";

export default function SongsListBackup({ playlistId }) {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // track if user searched

  const handleBackupSearch = async () => {
    if (!query) return;
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/backup/search?name=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backup API Error:", errorText);
        setSongs([]);
        return;
      }

      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Backup fetch error:", error);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        handleBackupSearch();
      } else {
        setSongs([]);
        setSearched(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-20">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search from backup..."
        className="w-full p-3 rounded-xl border border-gray-300 mb-6 focus:outline-none focus:ring focus:border-blue-400"
      />

      {loading && <p className="text-center">Loading from backup...</p>}

      {!loading && searched && songs.length === 0 && (
        <p className="text-center text-gray-500">No songs found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} playlistId={playlistId} />
        ))}
      </div>
    </div>
  );
}
