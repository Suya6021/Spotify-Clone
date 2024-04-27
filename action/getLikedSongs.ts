'use server'

import { Song } from "@/types/types"
import { createClient } from "@/util/supabase/server"
import getSongs from "./getSongs";
import { useUser } from "@/hooks/useUser";

const getLikedSongs = async():Promise<Song[]> => {
  const supabase=createClient();
  const {data:user}=await supabase.auth.getSession();
  console.log(user.session?.user.id)
 const id=user.session?.user.id;
 
  const {data,error}=await supabase.from('liked_songs').select('*,songs(*)').eq('user_id',id).order('created_at',{ascending:false});
  if(error){
     console.log(error)
     return [];
  }
  console.log(data)
  if(!data){
    return []
  }

  return data.map((item)=>({
    ...item.songs
  }))
};

export default getLikedSongs;
