"use client";
import { Subscription, UserDetails } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

// import {
//   useSessionContext,
//   useUser as useSupaUser,
//   User
// } from "@supabase/auth-helpers-react";
import { createClient } from "@/util/supabase/client";

import { User } from "@supabase/supabase-js";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propsName: string]: any;
}

export const MyUserContextProvider =(props: Props) => {
  // const {
  //   session,
  //   isLoading: isLoadingUser,
  //   supabaseClient: supabase,
  // } = useSessionContext();
  // const user = useSupaUser();
  // const accessToken = session?.access_token ?? null;
  const supabase = createClient();
  const [accessToken, setAccess_token] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDeatils] = useState<UserDetails | null>(null);
  const [subscription, setSubcription] = useState<Subscription | null>(null);
 
  // const { data } = supabase.auth.onAuthStateChange((event, Session) => {
  //   if (event === "INITIAL_SESSION") {

  //   }
  //    else if (event === "SIGNED_IN") {
  //     if(user==null){
  //      supabase.auth.getUser().then(userResponse => {
  //       setUser(userResponse.data.user)
      
  //     });}
  //     setAccess_token(Session?.access_token ?? null);
  //   } else if (event === "SIGNED_OUT") {
  //     setUser(null);
  //   }
  // });
//   useEffect(()=>{
//     async function  getUser(){
//     const {data,error}=await supabase.auth.getUser();
//     if(data){
//   setUser(data.user);
// }
//  else if (!data){
//   setUser(null);
//  }
// }
//   getUser();
// },[])
const [authState, setAuthState] = useState(false);

useEffect(() => {
  const {data:{subscription}} = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (session) {
         setUser(session.user);
      }
    })

  return () => {
    subscription.unsubscribe()
  }
}, [ ]);

// useEffect(() => {
//   async function getUser() {
//     const { data, error } = await supabase.auth.getUser();
//     if (data) {
//       // Your code here
//     }
//   }

//   if (authState) {
//     getUser();
//   }
// }, []);

  const getUserDetails = async () => {
    const { data, error } = await supabase.from("users").select("*").single();
    if (error) {
      return null;
    }

    return data;
  };

  const getSubsciprtion = async () => {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*,prices(*,products(*))")
      .in("status", ["trialing", "active"])
      .single();
      if(error){
        return null;
      }
      return data;
    };
  useEffect(() => {
    if (user && !isLoading && !userDetails && !subscription) {
      setIsLoading(true);
      Promise.allSettled([getUserDetails(), getSubsciprtion()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const userSubscriptionPromise = results[1];
          if (userDetailsPromise.status === "fulfilled") {
            
            setUserDeatils(userDetailsPromise.value as UserDetails);
          }
          if (userSubscriptionPromise.status === "fulfilled") {
            setSubcription(userSubscriptionPromise.value as Subscription);
          }
          setIsLoading(false);
        }
      );
    } else if (!user && !isLoading) {
      setUserDeatils(null);
      setSubcription(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoading,
    subscription,
  };
 

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }
  return context;
};
