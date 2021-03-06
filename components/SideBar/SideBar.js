import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  RssIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";

function SideBar() {
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const { data: session } = useSession();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-block pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>

      <div className="space-y-4 mt-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2  hover:text-white">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2  hover:text-white">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>

      {playlists.map((playlist) => (
        <button
          key={playlist.id}
          onClick={() => setPlaylistId(playlist.id)}
          className=" hover:text-white space-y-4 mt-4 block text-left"
        >
          {playlist.name}
        </button>
      ))}
    </div>
  );
}

export default SideBar;
