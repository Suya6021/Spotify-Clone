"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modals from "./Modals";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
const AuthModal = () => {
    const supabaseClient=useSupabaseClient();
    const router=useRouter();
    const {session}=useSessionContext();
  return (
    <Modals
      title="Test Model"
      description="test description"
      isOpen
      onChange={() => {}}
    >
     <Auth  supabaseClient={supabaseClient}
     theme="dark"
     providers={["github"]}
     magicLink
     appearance={{
        theme:ThemeSupa,
        variables:{
            default:{
                colors:{
                    brand:'#404040',
                    brandAccent:'#22c55e'
                }
            }
        }

     }}/>
     
    </Modals>
  );
};
export default AuthModal;
