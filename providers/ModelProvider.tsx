'use client'

import Models from "@/components/Models";
import { useEffect, useState } from "react"

const ModelProvider=()=>{
    const [isMouted,setIsMounted]=useState(false);
    useEffect(()=>{
       setIsMounted(true);
    })
    if(!isMouted){
     return null;}

    return(
        <>
        <Models
          title="Models"
          description="model description"
           >
          test childern
        </Models>
        </>
    )
}

export default ModelProvider;