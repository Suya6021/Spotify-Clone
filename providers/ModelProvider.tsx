'use client'

import AuthModal from "@/components/AuthModal";
import Models from "@/components/Modals";
import { useEffect, useState } from "react"

const ModelProvider=()=>{
    const [isMouted,setIsMounted]=useState(false);
    useEffect(()=>{
       setIsMounted(true);
    },[])
    if(!isMouted){
     return null;
    }

    return(
        <>
        <AuthModal/>
        </>
    )
}

export default ModelProvider;