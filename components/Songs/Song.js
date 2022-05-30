import React from "react";
import { useSetRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSpotify from "../../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../../lib/time";

function Song({ order, track }) {
  const {
    track: { name, artists, album, id, uri, duration_ms },
  } = track;

  const spotifyApi = useSpotify();
  const setCurrentTrackId = useSetRecoilState(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(id);
    setIsPlaying(true);

    spotifyApi.play({
      uris: [uri],
    });
  };

  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg">
      <div className="flex items-center space-x-4">
        <button onClick={playSong}>{order + 1}</button>
        <img className="h-10 w-10" src={album.images[0].url} />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{name}</p>
          <p className="w-40">{artists[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-45 truncate hidden md:inline px-4">{album?.name}</p>
        <p>{millisToMinutesAndSeconds(duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
