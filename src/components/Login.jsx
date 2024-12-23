import { useContext, useEffect } from 'react';
import React from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/images.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from '../Context/context'

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate=useNavigate()
  const {fetchUserDetails} = useContext(Context)
  console.log("fetch user details in login",fetchUserDetails);
  const onSubmit = async(e) => {
    console.log(e);
    const dataResponse=await fetch(SummaryApi.login.url,{
      method:SummaryApi.login.method,
      credentials:'include',
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify(e)
    })

    const data=await dataResponse.json()
    if(data.success){
      toast.success(data.message)
      fetchUserDetails()
      navigate("/")
    }
    if(data.error)
    {
      toast.error(data.message?.message)
    }
  };

  return (
    <div
      id="page"
      className="h-[calc(100vh-3.5rem)]  w-full bg-black flex justify-center items-center bg-opacity-80"
    >
      <div className="lg:h-[70vh]  lg:w-[30vw] w-[80%] bg-white rounded-md flex justify-center items-center flex-wrap">
        <div className="flex justify-center items-center h-[15vh] object-scale-down w-[50%]  ">
          <img src={logo} className="h-[20vh] mix-blend-multiply w-[60%] cursor-pointer" onClick={()=>{navigate('/')}}/>
        </div>
        <form
          className="pt-6 flex-col gap-8 flex justify-center items-center   w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" h-full flex justify-center items-center flex-wrap gap-4">
            <div className="w-full flex justify-center items-center">
            <div className="w-[57%]  ">
            <input
              id="email"
              type="email"
              {...register("email", {
                required: { value: true, message: "email is required" },
              })}
              className="bg-white p-2 border border-black rounded w-full"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
            </div>

          <div className="w-[66%] flex justify-end flex-wrap">
            <div className="w-[93%] flex justify-between ">
            <div className="flex w-full">
            <input
              id="password"
              type={showPassword?"text":"password"} 
              {...register("password", {
                required: { value: true, message: "password is required" },
              })}
              className="bg-white p-2 border border-black rounded w-full"
              placeholder="Password"
            />

            </div>
            <div className="cursor-pointer flex justify-end px-1  items-center">
              <span>
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(false)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(true)} />
                )}
              </span>
            </div>
            </div>
            
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div className="flex justify-end">
              <p className="text-sm font-medium text-blue-950 cursor-pointer">
                Forgot password?
              </p>
            </div>
          </div>
          </div>
          <button className="h-9 bg-green-500 w-48 m-2 rounded-lg  font-semibold text-white">
            Login
          </button>
        </form>
        <div className="w-full flex justify-center border-b-2 h-4 ">
          <h3 className="bg-white flex justify-center items-center p-3 text-slate-500">
            OR
          </h3>
        </div>
        <div className="w-full flex justify-center items-center mt-5">
          <button className="h-9 bg-blue-500  w-48 m-2 rounded-lg  font-semibold ">
            Continue with Google
          </button>
        </div>
        <div className="flex justify-center text-sm  w-full py-4">
          <p>
            Don't have an account? 
            <Link to={"/signup"}className="font-semibold text-blue-950 cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
