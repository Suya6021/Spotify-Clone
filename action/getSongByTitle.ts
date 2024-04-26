'use server'

import { Song } from "@/types/types"
import { createClient } from "@/util/supabase/server"
import getSongs from "./getSongs";

const getSongsByTitle = async(title:string):Promise<Song[]> => {
  const supabase=createClient();

  if(!title){
    const allSongs=await getSongs();
    return allSongs;
  }
  const {data,error}=await supabase.from('songs').select('*').ilike('title',`%${title}%`).order('created_at',{ascending:false});
  if(error){
     console.log(error)
  }
  console.log(data)
  return data|| [];
};

export default getSongsByTitle;
