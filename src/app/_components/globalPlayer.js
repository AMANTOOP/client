"use client";

import { usePlayer } from "@/hooks/usePlayer";
import { useState, useEffect } from "react";
import {
  PlayCircle,
  PauseCircle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ListOrdered,
  CircleMinus,
} from "lucide-react";
import Image from "next/image";
import MobilePlayerDrawer from "./mobilePlayerDrawer";

const GlobalPlayer = () => {
  const {
    currentSong,
    togglePlayPause,
    seek,
    isPlaying,
    duration,
    currentTime,
    isMuted,
    toggleMute,
    queue,
    playNext,
    removeFromQueue,
    playSong,
    removeFromQueueWithId,
    updateMediaSession,
  } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }

    // Check if the song has ended
    if (currentTime >= duration && duration > 0) {
      playNext(); // Call function to play the next song
    }
  }, [currentTime, duration]);

  useEffect(() =>{
    updateMediaSession();
  },[currentSong]);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-neutral-900 text-white p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Mobile View */}

        <div className="flex items-center w-full">
          {/* <div
            className="flex items-center w-[70%] cursor-pointer"
            onClick={() => setIsDrawerOpen(true)} // Opens Drawer on Click
          > */}
            <Image
              src={currentSong?.image || "/placeholder.svg"}
              alt={currentSong?.name || "Album cover"}
              width={48}
              height={48}
              className="rounded-md"
              onClick={() => setIsDrawerOpen(true)}
            />
            <h3 className="text-sm font-semibold flex-1 ml-3 truncate" onClick={() => setIsDrawerOpen(true)}>
              {currentSong?.name || "Say it to play it!"}
            </h3>
          {/* </div> */}
          <MobilePlayerDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
          <div className="flex items-center space-x-3">
            <button
              onClick={() => seek(-10)}
              className="transition-transform duration-150 ease-in-out active:scale-90 active:shadow-inner hover:scale-105 hover:shadow-lg"
            >
              
              <Image
                  src="https://img.icons8.com/?size=100&id=52193&format=png&color=FFFFFF"
                  width={20}
                  height={20}
                  alt="-10s back"
                  className=""
              />
              
            </button>
            <button
              onClick={togglePlayPause}
              className="text-white hover:scale-110 transition"
            >
              {isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
            </button>
            <button
              onClick={() => seek(10)}
              className="transition-transform duration-150 ease-in-out active:scale-90 active:shadow-inner hover:scale-105 hover:shadow-lg"
            >
              
              <Image
                  src="https://img.icons8.com/?size=100&id=52187&format=png&color=FFFFFF"
                  width={20}
                  height={20}
                  alt="+10s forward"
                  className=""
              />
              
            </button>
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            {/* <button
              onClick={() => setShowQueue(!showQueue)}
              variant="outline"
              size="sm"
            >
              <ListOrdered size={20} />
            </button> */}
          </div>
        </div>

        {/* Desktop View */}
        {/* <div className="hidden md:flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Image
              src={currentSong?.image || "/placeholder.svg"}
              alt={currentSong?.name || "Album cover"}
              width={56}
              height={56}
              className="rounded-md"
            />
            <div>
              <h3 className="font-semibold">
                {currentSong?.name || "No song playing"}
              </h3>
              <p className="text-sm text-gray-400">
                {currentSong?.primaryArtists || "Unknown artist"}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 flex-grow max-w-md mx-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => seek(-10)}
                className="text-gray-400 hover:text-white"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={togglePlayPause}
                className="text-white hover:scale-110 transition"
              >
                {isPlaying ? (
                  <PauseCircle size={40} />
                ) : (
                  <PlayCircle size={40} />
                )}
              </button>
              <button
                onClick={() => seek(10)}
                className="text-gray-400 hover:text-white"
              >
                <SkipForward size={20} />
              </button>
            </div>
            <div className="w-full flex items-center space-x-2">
              <span className="text-xs">{formatTime(currentTime)}</span>
              <Slider
                value={[(currentTime / duration) * 100]}
                max={100}
                step={1}
                className="flex-grow"
                onValueChange={(value) => {
                  if (duration) {
                    seek((value[0] / 100) * duration - currentTime);
                  }
                }}
              />
              <span className="text-xs">{formatTime(duration)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <Slider defaultValue={[100]} max={100} step={1} className="w-24" />
            <button
              onClick={() => setShowQueue(!showQueue)}
              variant="outline"
              size="sm"
            >
              {showQueue ? "Hide Queue" : "Show Queue"}
            </button>
            <button onClick={() => playNext()} variant="outline" size="sm">
              next
            </button>
          </div>
        </div> */}
      </div>

      {/* Queue Display
      {showQueue && (
        <div
          className={`fixed bottom-[70px] left-0 w-full bg-neutral-800 overflow-y-auto transition-all duration-300 ease-in-out ${showQueue ? "max-h-[60vh]" : "max-h-0"}`}
        >
          <div className="max-w-screen-xl mx-auto p-4">
            <h4 className="font-semibold mb-2">Queue</h4>
            {queue.length === 0 ? (
              <p className="text-gray-400">Queue is empty</p>
            ) : (
              <ul className="space-y-2">
                {queue.slice().reverse().map((song, index) => (
                  <div className="flex justify-between">
                  <li key={`${song.id}-${index}`} className="flex items-center justify-between"
                  onClick={() => {
                    playSong(song); // Play song when clicking anywhere in the list item
                    removeFromQueueWithId(song.id); // Remove from queue when clicked
                  }}
                  >
                    <div className="flex items-center space-x-2">
                      <Image
                        src={song.image || "/placeholder.svg"}
                        alt={song.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div>
                        <p className="font-semibold text-sm">{song.name}</p>
                        <p className="text-xs text-gray-400">{song.primaryArtists}</p>
                      </div>
                    </div>
                  </li>
                  <button onClick={() => removeFromQueueWithId(song.id)} variant="outline" size="sm">
                      <CircleMinus size={20} />
                    </button>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};
export default GlobalPlayer;
