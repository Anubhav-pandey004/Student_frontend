import React, { useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";

const ImageDilog2 = ({profile={profile} ,setProfile={setProfile},close={close} ,setClose={setClose} }) => {

    const handelUplodepic=async(e)=>{
    const file=e.target.files[0];
    const data=new FormData()
  
    data.append("file",file);
    data.append("upload_preset", "E-commercer");
    data.append("cloud_name", "di1e0egkt");
    data.append('folder', 'AnubhavQuestions'); 
  
    try{
        const Res=await fetch('https://api.cloudinary.com/v1_1/di1e0egkt/image/upload',{
  
          method:"POST",
          body:data
        })

        .then((res)=>res.json())
         .then((data)=>{
          console.log("Image Uploaded ",data.url);
           setProfile([...profile, data.url])})
      }catch(err){
        console.log(err);
      }
    }
    const upload=()=>{
        setClose(!close)
    }
  return (
        <div className='h-[100vh] w-[100vw] fixed top-0 bg-black opacity-95 flex justify-center items-center '>
        <div className='h-72 w-60 md:w-96 bg-white rounded-md p-6'>
        <MdOutlineCancel className='float-right text-sm font-light text-slate-400 hover:text-black' onClick={()=>{setClose(!close)}}/>
            <form action="">
               <div className='bg-blue-300 h-16 w-full flex justify-center items-center p-3'>
               <input type='file' onChange={handelUplodepic}></input>
               </div>
            </form>
            {
                profile && 
                <div className="h-[60%] w-ful mt-2 ">
                    <img className='h-full w-full object-scale-down' src={profile[profile.length-1]} alt="" />
                    <button className='border bg-slate-500 px-4 rounded-md text-white' onClick={upload}>Upload</button>
                </div>
            }
        </div>
      
    </div>
    )
}

export default ImageDilog2
