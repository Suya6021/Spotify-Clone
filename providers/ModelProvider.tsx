'use client'

import AuthModal from "@/components/AuthModal";
import Models from "@/components/Modals";
import UploadModal from "@/components/UploadModal";
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
        <UploadModal/>
        </>
    )
}

export default ModelProvider;