"use client";
import useDebounce from "@/hooks/useDebounce";
import { time } from "console";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import qs from 'query-string';
import Input from "./Input";
const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue = useDebounce<string>(value, 500);

  useEffect(()=>{
    const query={
        title:debounceValue,
    }

    const url=qs.stringifyUrl({
     url:'/search',
     query:query
    })
    console.log(url);
    router.push(url);
  },[debounceValue,router]);
  return (
    <Input placeholder="what do you want to search?"
    value={value}
    onChange={(e)=>setValue(e.target.value)}/>
  );
};

export default SearchInput;
