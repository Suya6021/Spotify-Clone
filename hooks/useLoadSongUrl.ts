import { Song } from "@/types/types"
import { createClient } from "@/util/supabase/client"


const useLoadSongUrl = (song:Song) => {
    const supabase=createClient();
     if(!song){
        return ' ';
     }
     const {data:songData}=supabase.storage.from('songs').getPublicUrl(song.song_path);

     return songData.publicUrl;
}

export default useLoadSongUrl
