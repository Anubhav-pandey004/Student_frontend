

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import styled from "styled-components";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate=useNavigate()
  const user=useSelector((state)=>{
    const user=state.user.user1
    return user 
  })
  useEffect(()=>{
    if(user?.role!=='ADMIN'){
      navigate("/")
    }
  },[user])
  return (
    <div className="h-[100vh] md:flex overflow-hidden">
      <Aside className="bg-white min-h-full w-full max-w-60 shadow-[] pt-3">
        <div className="h-35 justify-center items-center flex-col ">
          <div
            className="text-4xl cursor-pointer relative flex justify-center rounded-full"
            
          >
            {console.log(user)}
            {user ? (
              <Image
                src={user.profilepic}
                className="userLogo rounded-full"
              />
            ) : (
              <FaRegUser />
            )}
          </div>
          <p className="flex justify-center capitalize text-lg font-semibold">{user?.username}</p>
          <p className="flex justify-center">{user?.role}</p>
        </div>
        {/**Navigation */}
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">ALL Users</Link>
            <Link to={"verify-answer"} className="px-2 py-1 hover:bg-slate-100">Verify Answers</Link>
          </nav>
        </div>
      </Aside>
      <main  className="w-full h-full p-2 ">
        <Outlet/>
      </main>
    </div>
  );
};

const Image = styled.img`
  border: 1px solid;
  object-fit: contain;
  height: 8rem;
  width: 8rem;
  `
  const Aside = styled.aside`
  box-shadow:0px 0px 10px rgba(0,0,0,0.2);
  `
export default Admin;
