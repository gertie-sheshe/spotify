import {
  SwitchHorizontalIcon,
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  PlayIcon,
  PauseIcon,
  ReplyIcon,
  VolumeUpIcon,
  FastForwardIcon,
} from "@heroicons/react/solid";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSongInfo from "../../hooks/useSongInfo";
import useSpotify from "../../hooks/useSpotify";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data?.body?.item?.id);
      });

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data?.body?.is_playing);
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [songInfo, currentTrackId, session]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <div className="">
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <button className="button">
          <SwitchHorizontalIcon />
        </button>
        <button className="button">
          <RewindIcon />
        </button>
        {isPlaying ? (
          <button className="button w-10 h-10">
            <PauseIcon onClick={handlePlayPause} />
          </button>
        ) : (
          <button className="button w-10 h-10">
            <PlayIcon onClick={handlePlayPause} />
          </button>
        )}
        <button className="button">
          <FastForwardIcon />
        </button>
        <button className="button">
          <ReplyIcon />
        </button>
      </div>
    </div>
  );
}

export default Player;
