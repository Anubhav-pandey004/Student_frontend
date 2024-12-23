import React, { useState } from 'react'

import { IoIosClose } from "react-icons/io";
import SummaryApi from '../common/index';
import { toast } from 'react-toastify'
const Changeuserrole = ({id,Role,openUpdateRole,setopenUpdateRole,callfun}) => {
    const handelonchange=(e)=>{
        setUserRole(e.target.value)
    }
  
    const Update=async()=>{
       
        const response = await fetch(SummaryApi.changeUserRole.url,{
            method:SummaryApi.changeUserRole.method,
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                role:userRole,
                id:id._id
            })
        })
        const data = await response.json()
        if(data?.success){
            callfun()
            toast.success(data.message)
        }
        if(data?.error){
            toast.error(data.message)
        }
    }

    const [userRole,setUserRole]=useState({Role})
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-black bg-opacity-50'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
            <button className='block ml-auto' onClick={()=>{setopenUpdateRole(!openUpdateRole)}}>
            <IoIosClose />
            </button>
            <h1 className='pb-4 text-lg font-medium justify-center flex'>Change the user role</h1>
            <p>Name : {id.username}</p>
            <p>Email : {id.email}</p>
            <div className='flex justify-between my-4'>
            <p>Role</p>
            <select className='border px-4 py-1' value={userRole} onChange={handelonchange}>
                <option value="">Select role</option>
            <option value="General">General</option>
            <option value="ADMIN">Admin</option>
                {/* {
                    Object.values(ROLE).map((el,index) => {
                        return(
                            <option key={index} value={el}>{el}</option>
                        )
                    })
                } */}
            </select>
            </div>
            <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={(p)=>{setopenUpdateRole(!openUpdateRole)
                Update()
            }} >Change Role</button>
        </div>
    </div>
  )
}

export default Changeuserrole
