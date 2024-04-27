"use client";

import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twJoin, twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModel from "@/hooks/useAuthModel";

import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { useToast } from "./ui/use-toast";
import { createClient } from "@/util/supabase/client";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModel();
  const { user } = useUser();
  const {toast} = useToast();
  const supabaseClient = createClient();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast({
        variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request."
      })
    }
    else {
      toast({
        
        variant:"default",
        title:"Logged Out Successfully"
      })

    }
  };
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between ">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="rounded-full bg-black flex items-center justify-center  hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2  bg-white flex item-center justify-center hover:opacity-75 transition"
          onClick={()=>{router.push('/')}}>
            <HiHome className="text-black " size={20} />
          </button>
          <button className="rounded-full p-2  bg-white flex item-center justify-center hover:opacity-75 transition"
           onClick={()=>{router.push('/search')}}>
            <BiSearch className="text-black " size={20} />
          </button>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="bg-white px-6 py-2 whitespace-nowrap"
              >
                LogOut
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent text-neutral-300 font-medium"
                  onClick={authModal.onOpen}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  className="bg-white px-6 py-2"
                  onClick={authModal.onOpen}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
