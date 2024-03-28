"use client"
import React from "react";
import Modals from "./Modals";
import useUploadModal from "@/hooks/useUploadModal";
const UploadModal = () => {
    const uploadModal=useUploadModal();
    const onChange=(open:boolean)=>{
        if(!open){
            uploadModal.onClose();
        }
    }
  return (
    <div>
      <Modals
        title="Add Song"
        description="Upload an mp3 file "
        isOpen={uploadModal.isOpen}
        onChange={onChange}
      >
        Form
      </Modals>
    </div>
  );
};

export default UploadModal;
