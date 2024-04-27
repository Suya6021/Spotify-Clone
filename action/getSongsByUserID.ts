'use server'

import { Song } from "@/types/types"
import { createClient } from "@/util/supabase/server"

const getSongsByUserID = async():Promise<Song[]> => {
  const supabase=createClient();
  const {data:SessionData,error:SessionError}=await supabase.auth.getUser();
  if(SessionError){
    console.log(SessionError.message);
    return [];
  }
  const {data,error}=await supabase.from('songs').select('*').eq('user_id',SessionData.user.id).order('created_at',{ascending:false});

  if(error){
    console.log(error.message);
  }
  return (data as any) || [];
};

export default getSongsByUserID;
