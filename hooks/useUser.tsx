import { Subscription, UserDetails } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

import {
  useSessionContext,
  useUser as useSupaUser,
  User
} from "@supabase/auth-helpers-react";

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

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDeatils] = useState<UserDetails | null>(null);
  const [subscription, setSubcription] = useState<Subscription | null>(null);
  const getUserDetails = () => supabase.from("user").select("*").single();
  const getSubsciprtion = () =>
    supabase
      .from("subscriptions")
      .select("*,prices(*,products(*))")
      .in("status", ["trialing", "active"])
      .single();
  useEffect(()=>{
    if(user && !isLoading && !userDetails && !subscription){
        setIsLoading(true);
        Promise.allSettled([getUserDetails(),getSubsciprtion()]).then(
            (results)=>{
                const userDetailsPromise=results[0];
                const userSubscriptionPromise=results[1];
                  if(userDetailsPromise.status==='fulfilled'){
                    setUserDeatils(userDetailsPromise.value.data as UserDetails);
                  }
                  if(userSubscriptionPromise.status==='fulfilled'){
                    setSubcription(userSubscriptionPromise.value.data as Subscription);
                  }
                  setIsLoading(false);
            }
        )
    }
    else if(!user && !isLoadingUser && !isLoading )
    {
        setUserDeatils(null);
        setSubcription(null);
    }
  },[user,isLoadingUser])

  const value={
    accessToken,
    user,
    userDetails,
    isLoading:isLoading || isLoadingUser,
    subscription
}
return <UserContext.Provider value={value} {...props}/>
};

export const useUser=()=>{
    const context=useContext(UserContext);
    if(context===undefined){
        throw new Error('useUser must be used within a MyUserContextProvider')
    }
 return context;
}
