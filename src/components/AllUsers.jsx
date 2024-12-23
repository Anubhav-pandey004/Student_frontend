import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/index'
import {styled} from 'styled-components'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEditOutline } from "react-icons/md";
import Changeuserrole from '../components/Changeuserrole'


const AllUsers = () => {
    const [allusers,setallusers]=useState([])
    const [openUpdateRole,setopenUpdateRole]=useState(false)
    const [id,setId]=useState("")

    const fetchAllUsers =async()=>{
        const response = await fetch(SummaryApi.AllUsers.url,{
            method:SummaryApi. AllUsers.method,
            credentials:"include"
        })
        const data = await response.json()
        console.log("user details in datbase",data);
        if(data?.success){
            setallusers(data.data)
        }
        if(data?.error){
            toast.error(data.message)
        }
    }
    useEffect(()=>{
        fetchAllUsers()
    },[])
  return (
    <div>
        <Table className='w-full '>
            <thead>
                <tr>
                    <th>Sr.no</th>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {allusers.map((el,index) => {
                    return(
// A “key” is a special string attribute you need to include when creating lists of elements
                        <tr key={el._id}>
                            <td>{index + 1}</td>
                            <td>{el._id}</td>
                            <td>{el.username}</td>
                            <td>{el.email}</td>
                            <td>{el.role}</td>
                            <td>{moment(el.createdAt).format('ll')}</td>
                            <td><button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' onClick={()=>{
                                setopenUpdateRole(!openUpdateRole) 
                                setId(el) }}><MdModeEditOutline /></button></td>
                        </tr>
                    )})}
            </tbody>

        </Table>
        {
            openUpdateRole&&<Changeuserrole openUpdateRole={openUpdateRole} setopenUpdateRole={setopenUpdateRole} id={id} callfun={fetchAllUsers} />
        }
        
    </div>
  )
}

export default AllUsers

const Table=styled.table`
    th{
        background-color: black;
        color: white;
        border: 1px solid ;
        font-size: 0.8; 
    }
    td{
        background-color: #eeeaea;
        border: 2px solid transparent;
        font-size: 0.7rem;
        text-align: center;
        border: 1px solid ;
        padding: 2px;
    }
`
