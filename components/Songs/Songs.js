import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
  const playlists = useRecoilValue(playlistState);

  console.log("PLAYING", playlists);

  if (!playlists) {
    return null;
  }

  return (
    <div className="h-screen overflow-y-scroll px-8 flex flex-col space-y-1 pb-40 text-white">
      {playlists.tracks.items.map((track, i) => {
        return <Song key={track.track.id} track={track} order={i} />;
      })}
    </div>
  );
}

export default Songs;
