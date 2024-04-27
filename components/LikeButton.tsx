'use client'

import useAuthModel from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/util/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "./ui/use-toast";

interface LikeButtonProps {
  songId: string;
}
const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { user } = useUser();
  const authModal = useAuthModel();
  const supabase = createClient();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId);
      console.log(data);
      if (!error && data.length>0) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, supabase, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    console.log("infun")
    console.log(user);
    if (isLiked) {
      const { error } = await supabase
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);
      if (error) {
        console.log(error)
        toast({
          variant: "destructive",
          title: "Something is wrong! ",
        });
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabase
        .from("liked_songs")
        .insert({ song_id: songId, user_id: user.id });

      if (error) {
        console.log(error)
        toast({
          variant: "destructive",
          title: "Someting is wrong",
        });
      }
      else{
        setIsLiked(true);
        toast({
          title:"Liked!"
        })
      }
    }
    router.refresh();
  };
  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
