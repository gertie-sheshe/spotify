import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../../atoms/playlistAtom";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import useSpotify from "../../hooks/useSpotify";
import Songs from "../Songs/Songs";

const colors = [
  "from-indigo-500",
  "from-purple-500",
  "from-pink-500",
  "from-orange-500",
  "from-green-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
];

function Center() {
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const { data: session } = useSession();

  useEffect(() => {
    setColor(shuffle(colors)[3]);
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong", err));
    }
  }, [spotifyApi, playlistId]);

  console.log("playlist", playlist);

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8 ">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full text-white p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <button onClick={signOut}>
            <ChevronDownIcon className="h-5 w-5" />
          </button>
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h3 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h3>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
