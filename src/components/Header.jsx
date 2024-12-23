import { Route, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import logo from "../assets/images.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { useContext } from "react";
import Context from "../Context/context";
import { setUserDetails } from "../store/userSlice";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    console.log("State is >>>>>>>>>", state);

    const user = state.user.user1;
    return user;
  });
  const { fetchUserDetails } = useContext(Context);
  const [userOptions, setUserOptions] = useState(false);
  const handellogout = async () => {
    console.log("logout");
    let res = await fetch(SummaryApi.logout.url, {
      method: SummaryApi.logout.method,
      credentials: "include",
    });
    let data = await res.json();
    if (data.success) {
      toast.success(data.message);
      // fetchUserDetails()
      navigate("/");
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  const router = useNavigate();
  const handletrasition = async (e) => {
    e.preventDefault();
    const body = document.querySelector("body");
    body?.classList?.add?.("transitioning");
    setTimeout(() => {
      router("/login");
    }, 100);
    setTimeout(() => {
      body?.classList?.remove?.("transitioning");
    }, 200);
  };
  return (
    <div className="flex lg:h-14 h-10 max-w-[100vw] bg-slate-200 lg:px-36 px-6 py-1 shadow-lg">
      <div>
        <div className="h-full  flex items-center justify-center">
          <img
            src={logo}
            height={300}
            width={300}
            className=" mix-blend-multiply cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          ></img>
        </div>
      </div>
      <div className="w-full flex justify-around items-center text-xl md:text-2xl font-semibold text-slate-600 cursor-pointer"></div>
      <div className="w-60 flex justify-center items-center ml-4">
        <Link
          to="/new-post"
          className="text-yellow-500  sm:py-1 px-2 rounded-md hover:rounded-full transition-all lg:text-base text-xs text-wrap h-full w-full border border-yellow-500 hover:bg-yellow-500 hover:text-black flex items-center justify-center"
        >
          Ask question
        </Link>
      </div>
      {!user && (
        <div className="w-60 flex justify-center items-center ml-4">
          {/* <Link to="/login" className=' sm:py-1 px-2 rounded-md lg:text-base text-xs text-wrap h-full w-full border bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:text-black flex items-center justify-center' >Login</Link> */}
          <Link
            href={"/login"}
            onClick={handletrasition}
            className=" sm:py-1 px-2 rounded-md lg:text-base text-xs text-wrap h-full w-full border bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:text-black flex items-center justify-center"
          >
            Login
          </Link>
        </div>
      )}
      {user && (
        <div className="flex items-center ml-3">
          <div
            className="lg:h-10 lg:w-10 h-6 w-6 rounded-full overflow-hidden cursor-pointer border border-black object-contain"
            onClick={() => {
              setUserOptions(!userOptions);
            }}
          >
            <img src={user?.profilepic}></img>
          </div>
        </div>
      )}

      {userOptions && (
        <div className="shadow-xl  fixed right-5 top-10 w-52 rounded-md border bg-white ">
          <div
            onClick={() => {
              setUserOptions(false);
            }}
            className="flex items-center py-3 px-2 cursor-pointer hover:bg-slate-100"
          >
            <IoExitOutline className="text-xl mr-3 " />
            <p onClick={handellogout} className="z-20">
              Log Out
            </p>
          </div>
          {user?.role == "ADMIN" && (
            <Link
              to="/admin"
              onClick={() => {
                setUserOptions(false);
              }}
              className="flex items-center py-3 px-2 cursor-pointer hover:bg-slate-100"
            >
              <MdOutlineAdminPanelSettings className="text-xl mr-3 " />
              <p className="w-full">Admin Panel</p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
