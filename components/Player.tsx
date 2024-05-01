'use client'

import useGetSongById from "@/hooks/useGetSongsByid";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayerStore"
import PlayerContent from "./PlayerContent";


const Player = () => {
  const Player=usePlayer();
  const {song}=useGetSongById(Player.activeId);
  const songUrl=useLoadSongUrl(song!);
  if(!song || !songUrl || !Player.activeId){
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full h-[80px] py-2 px-4 ">
      <PlayerContent 
      key={songUrl}
      song={song}
      songUrl={songUrl}/>
    </div>
  )
}

export default Player
