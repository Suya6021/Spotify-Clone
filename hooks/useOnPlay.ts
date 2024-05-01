import { Song } from "@/types/types";
import usePlayer from "./usePlayerStore";
import useAuthModel from "./useAuthModel";
import { useUser } from "./useUser";

const useOnPlay=(songs:Song[])=>{
    const Player=usePlayer();
    const authModal=useAuthModel();
    const{user}=useUser();

    const onPlay=(id:string)=>{
        if(!user){
            return authModal.onOpen();

        }
        Player.setId(id);
        Player.setIds(songs.map((song)=>song.id))
    }
    return onPlay
}
export default useOnPlay;