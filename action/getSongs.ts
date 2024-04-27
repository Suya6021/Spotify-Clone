'use server'

import { Song } from "@/types/types"
import { createClient } from "@/util/supabase/server"

const getSongs = async():Promise<Song[]> => {
  const supabase=createClient();
  const {data,error}=await supabase.from('songs').select('*').order('created_at',{ascending:false});
  if(error){
     console.log(error)
  }
  
  return data|| [];
};

export default getSongs
