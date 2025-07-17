"use client";

import { useState, useEffect } from "react";
import { usePlaylists } from "@/context/playlistProvider";
import SongsList from "../_components/songsListInPlaylist"; // Ensure this displays song names
import { usePlayer } from "@/hooks/usePlayer";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Playlists() {
  const {
    playlists,
    fetchPlaylists,
    createPlaylist,
    deletePlaylist,
    error,
  } = usePlaylists();
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    playSong,
    setQueue,
    setCurrentSong,
    currentSong,
    setIsPlaying,
  } = usePlayer();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);

  const handlePlayAll = async (songIds) => {
    if (songIds.length === 0) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKUP_API_URL}/songs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ songIds }),
        }
      );

      if (response.ok) {
        const fetchedSongs = await response.json();
        if (fetchedSongs.length === 0) {
          toast.error("No songs found in this playlist.");
          return;
        }

        setQueue([]);
        if (currentSong == null) setCurrentSong(true);
        await playSong(fetchedSongs[0]);
        setIsPlaying(true);
        setQueue(fetchedSongs.slice(1));
        toast.success("Playlist playing!");
      } else {
        const errorMessage = await response.text();
        console.error("Fetch failed:", errorMessage);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const togglePlaylist = (playlistId) => {
    setExpandedPlaylist(expandedPlaylist === playlistId ? null : playlistId);
  };

  useEffect(() => {
    const loadPlaylists = async () => {
      setLoading(true);
      await fetchPlaylists();
      setLoading(false);
    };
    loadPlaylists();
  }, []);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    const name = newPlaylistName.trim();
    if (!name) return;

    const isDuplicate = playlists.some(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      toast.error("Playlist name already exists.");
      return;
    }

    await createPlaylist(name);
    setNewPlaylistName("");
    await fetchPlaylists();
    toast.success("Playlist created!");
  };

  const handleDeletePlaylist = async (playlistId) => {
    await deletePlaylist(playlistId);
    await fetchPlaylists();
    toast.success("Playlist deleted!");
  };

  return (
  <div className="max-w-4xl mx-auto mt-24 px-4 py-6 max-h-[calc(100vh-120px)] overflow-y-auto">
    <h1 className="text-3xl font-bold mb-6 text-center">🎵 Your Playlists</h1>

    {/* Playlist creation form */}
    <form onSubmit={handleCreatePlaylist} className="flex mb-8 gap-2">
      <input
        type="text"
        value={newPlaylistName}
        onChange={(e) => setNewPlaylistName(e.target.value)}
        placeholder="Create new playlist..."
        className="flex-grow px-4 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition"
      >
        Create
      </button>
    </form>

    {/* Error display */}
    {error && <p className="text-red-500 mb-4">{error}</p>}

    {/* Content state handling */}
    {loading ? (
      <p className="text-gray-500 text-center">Loading playlists...</p>
    ) : playlists.length === 0 ? (
      <p className="text-gray-500 text-center">No playlists yet. Create one!</p>
    ) : (
      <div className="space-y-6">
        {playlists.map((playlist) => (
          <div
            key={playlist._id}
            onClick={() => togglePlaylist(playlist._id)}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 cursor-pointer group hover:border-blue-400 transition"
          >
            {/* Playlist header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                {playlist.name}
              </h2>

              {/* Buttons – prevent event propagation */}
              <div
                className="flex items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handlePlayAll(playlist.songs)}
                  className="px-4 py-2 text-sm bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  ▶ Play All
                </button>
                <button
                  onClick={() => handleDeletePlaylist(playlist._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {/* Expanded song list */}
            {expandedPlaylist === playlist._id && (
              <div className="mt-4 border-t pt-4 max-h-[250px] overflow-y-auto">
                {playlist.songs.length === 0 ? (
                  <p className="text-gray-500 text-sm">No songs in this playlist.</p>
                ) : (
                  <SongsList
                    songIds={playlist.songs}
                    playlistId={playlist._id}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

}
