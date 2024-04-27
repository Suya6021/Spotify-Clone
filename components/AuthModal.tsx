"use client";

import Modals from "./Modals";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModel from "@/hooks/useAuthModel";
import { useEffect, useState } from "react";
import { createClient } from "@/util/supabase/client";
import { User } from "@supabase/supabase-js";
const AuthModal = () => {
  const supabase=createClient();
  const router = useRouter();
 
  const { onClose, isOpen } = useAuthModel();
  const [user, setUser] = useState<User | null>(null);

// useEffect(() => {
//   const fetchUser = async () => {
//     const {data} = await supabase.auth.onAuthStateChange();
//     console.log(data)
//     setUser(userResponse.data.user);
    
//   };

//   fetchUser();
// }, []);
//   useEffect(() => {
//     if (user) {
//       router.refresh();
//       onClose();
//     }
//   }, [user, router, onClose]);

// const { data } = supabase.auth.onAuthStateChange((event, session) => {
//   console.log(event, session)

//   if (event === 'INITIAL_SESSION') {
//     // handle initial session
//   } else if (event === 'SIGNED_IN') {
//       router.refresh();
//       onClose();
//       console.log(data)
//   } else if (event === 'SIGNED_OUT') {
//     // handle sign out event
//   } 
// })
useEffect(()=>{
  const getAuthState=async()=>{
    const data=await supabase.auth.getUser();
   if(data){
    setUser(data.data.user)
    router.refresh();
    onClose();
    console.log(data);

   }}
   
   getAuthState();
},[])

  
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modals
      title="Log in "
      description="Enter your credientails"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabase}
        theme="dark"
        providers={["github"]}
        magicLink
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modals>
  );
};
export default AuthModal;
