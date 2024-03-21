"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
interface ModelProps{
  isOpen:boolean
  onChange:(open:boolean)=>void;
  title:string;
  description:string;
  children:React.ReactNode;
}

const Modals:React.FC<ModelProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children
}) => {
  return (
    <div>
      <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
  
  <DialogContent className='drop-shadow-lg bg-neutral-800 h-full w-full md:h-auto md:w-max-[450px] md:w-[90vw]'>
    <DialogHeader>
      <DialogTitle className='text-xl text-center font-bold mb-4'>{title}</DialogTitle>
      <DialogDescription className='mb-5 text-sm leading-normal text-center'>
          {description}
      </DialogDescription>


    </DialogHeader>
    <div>
      {children}
    </div>
  </DialogContent>
</Dialog>

      
    </div>
  )
}

export default Modals
