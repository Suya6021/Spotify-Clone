'use server'

import { Song } from "@/types/types"
import { createClient } from "@/util/supabase/server"

const getSongs = async():Promise<Song[]> => {
  const supabase=createClient();
  
};

export default getSongs
