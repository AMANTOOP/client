"use client";

import { useState, useEffect } from "react";
import SongCard from "./songCard";

export default function SongsList({ songIds, playlistId, fetchPlaylists }) {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");
  const [expandedSong, setExpandedSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!songIds) {
      setError("No song IDs provided");
      setLoading(false);
      return;
    }
    if (songIds.length === 0) {
      setError("No songs in this playlist");
      setLoading(false);
      return;
    }

    const fetchSongs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKUP_API_URL}/songs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ songIds }),
        });

        if (response.ok) {
          const data = await response.json();
          setSongs(data);
        } else {
          const errorMessage = await response.text();
          setError(`Failed to fetch songs: ${errorMessage}`);
        }
      } catch (err) {
        setError("An error occurred while fetching songs");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [songIds]);

  return (
    <div className="mt-6">
      {loading && (
        <div className="text-center text-gray-500 animate-pulse">
          Loading songs...
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500 font-medium">
          {error}
        </div>
      )}

      {!loading && !error && songs.length === 0 && (
        <div className="text-center text-gray-500">No songs in this playlist</div>
      )}

      {!loading && songs.length > 0 && (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {songs.map((song) => (
            <li key={song.id}>
              <SongCard
                song={song}
                isExpanded={expandedSong === song.id}
                onExpand={() =>
                  setExpandedSong(expandedSong === song.id ? null : song.id)
                }
                playlistId={playlistId}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
