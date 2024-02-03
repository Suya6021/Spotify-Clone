import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
  import { Label } from './ui/label'
  import { Input } from './ui/input'
import { Button } from './ui/button'

interface ModelProps{
    children:React.ReactNode;
    title:string;
    description:string;
}

const Models:React.FC<ModelProps>= ({
    children,
    title,
    description
}) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button className='bg-white  text-foreground font-bold'>Edit Profile</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] bg-neutral-800 text-white ">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {children}
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  
  )
}

export default Models
