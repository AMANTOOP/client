"use client";
import { Button } from "@/components/ui/button";
import { Play, Pause, CirclePlus, Trash, StarIcon } from "lucide-react";
import Image from "next/image";
import { usePlayer } from "@/hooks/usePlayer";
import { AddToPlaylistDialog } from "./addToPlaylistDialog";
import AuthContext from "@/context/authContext";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function SongCard({ song, isExpanded, onExpand, playlistId }) {
  const { currentSong, playSong, togglePlayPause, isPlaying, addToQueue } = usePlayer();
  const { isLoggedIn } = useContext(AuthContext);
  const pathname = usePathname();
  const [isDeleted, setIsDeleted] = useState(false);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (currentSong?.id === song.id) {
      togglePlayPause();
    } else {
      playSong(song);
    }
  };

  const handleDeleteSong = async (songId) => {
    if (!playlistId) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/playlists/${playlistId}/songs/${songId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to remove song");

      toast.success("Song removed successfully!");
      setIsDeleted(true);
    } catch (error) {
      toast.error("Failed to remove song.");
    }
  };

  if (isDeleted) return null;

  return (
    <div
      onClick={onExpand}
      className="flex flex-col justify-between p-4 bg-white shadow-md rounded-2xl hover:-translate-y-1 transition duration-300 w-full"
    >
      <Image
        src={song.image || "/placeholder.svg"}
        alt={song.name}
        width={300}
        height={180}
        className="rounded-lg h-52 w-full object-cover object-center cursor-pointer"
      />

      <p className="font-semibold mt-3 text-sm text-gray-900 truncate">{song.name}</p>

      <p className="text-xs text-gray-500 mt-1">
        {song.primaryArtists?.split(",").slice(0, 2).join(" | ")}
      </p>

      {/* Play & Rating */}
      <div className="flex items-center justify-between mt-4">
        <Button
          className="text-xs px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            handlePlay(e);
          }}
        >
          {currentSong?.id === song.id && isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-1" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-1" /> Play
            </>
          )}
        </Button>
      </div>

      {/* Queue + Playlist Controls */}
      <div className="flex items-center justify-between mt-3">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addToQueue(song);
          }}
          className="text-xs px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full"
        >
          <CirclePlus className="w-4 h-4 mr-1" /> Queue
        </Button>

        {isLoggedIn && (
          <div className="ml-2">
            <AddToPlaylistDialog className='text-xs px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full'songId={song.id} />
          </div>
        )}

        {pathname === "/playlists" && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteSong(song.id);
            }}
            className="text-xs px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-full"
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
