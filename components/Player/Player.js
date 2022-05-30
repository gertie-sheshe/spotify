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
import { debounce } from "lodash";

import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
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

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      // check for active device
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

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
        <button onClick={() => spotifyApi.skipToNext()} className="button">
          <FastForwardIcon />
        </button>
        <button className="button">
          <ReplyIcon />
        </button>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <button onClick={() => volume > 0 && setVolume(volume - 10)}>
          <VolumeDownIcon className="button" />
        </button>
        <input
          className="w-14 md:w-28"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          type="range"
          min={0}
          max={100}
        />
        <button onClick={() => volume < 100 && setVolume(volume + 10)}>
          <VolumeUpIcon className="button " />
        </button>
      </div>
    </div>
  );
}

export default Player;
