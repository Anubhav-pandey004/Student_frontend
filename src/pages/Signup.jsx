import React, { useState } from "react";
import logo from "../assets/images.png";
import { useForm } from "react-hook-form";
import { CiUser } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [profile,setProfile]=useState()
  const navigate=useNavigate()

  const onSubmit = async(e) => {

    e.profilepic=profile

    if(e.password !== e.conformpassword){
      toast.error("Password and Confirm Password must be same")
      return
    }
    const dataResponse=await fetch(SummaryApi.signup.url,{
      method:SummaryApi.signup.method,
      credentials:'include',
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify(e)
    })
    const data=await dataResponse.json()
    if(data.success){
      toast.success(data.message)
      navigate("/Login")
    }
    if(data.error)
    {
      toast.error(data.message.message)
    }
  };

  let handelUplodepic=async(event)=>{
    const file=event.target.files[0];
    const data=new FormData()
  
    data.append("file",file);
    data.append("upload_preset", "E-commercer");
    data.append("cloud_name", "di1e0egkt");
    data.append('folder', 'Anubhav'); 
  
    try{
        const Res=await fetch('https://api.cloudinary.com/v1_1/di1e0egkt/image/upload',{
  
          method:"POST",
          body:data
        })

        .then((res)=>res.json())
         .then((data)=>{
          console.log("Image Uploaded ",data.url);
           setProfile(data.url)})
      }catch(err){
        console.log(err);
      }
      
    }

  return (
    <div className="h-[calc(100vh-3.5rem)]  w-full bg-black flex justify-center items-center bg-opacity-80">
      <div className="h-[90%] bg-white min-w-[20%] rounded-lg flex justify-center items-start gap-2 flex-wrap">
        <div className="flex justify-center items-center h-[5vh] object-scale-down w-[50%]  ">
          <img src={logo} className="h-[20vh] mix-blend-multiply w-[60%]" />
        </div>
        <div className="bg-red-900 h-[90%] p-2 w-full overflow-auto scrollbar-none">
        <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                 <div className="flex justify-center items-center text-4xl">
                  {
                    profile ? ( <img className='sign-up-img' src={profile} alt="Image"/> ):(<CiUser />)
                  }
                 </div>
                <form>
                  <label htmlFor='profile'>
                  {
                    !profile? (<div className='text-xs text-center py-3 absolute bottom-0 w-full bg-opacity-80 pb-4 pt-2 cursor-pointer bg-transparent'>
                      Uplode photo
                     </div>):(<div></div>)
                  }
                  </label>
                  <input type='file' id="profile" className='hidden' onChange={handelUplodepic} > 
                  </input>
                </form>
                </div>
          <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="userName">User Name</label>
              <input
                id="userName"
                type="text"
                {...register("username", {
                  required: { value: true, message: "user Name is required" },
                })}
                className="bg-white p-2 border border-black rounded w-full text-black"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="Email">Email</label>
              <input
                id="Email"
                type="email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
                className="bg-white p-2 border border-black rounded w-full text-black"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="College">College</label>
              <input
                id="College"
                type="text"
                {...register("college")}
                className="bg-white p-2 border border-black rounded w-full text-black"
                placeholder="College"
              />

            </div>
            <div className="py-2 h-full w-full flex justify-between">
              <div className="h-full w-full flex justify-between">
                <div>
                  <label htmlFor="Assessment_Year">Assessment Year</label>
                  <select
                    {...register("assessmentyear")}
                    className="bg-slate-100 m-2 p-2 border rounded text-black"
                  >
                    <option value="">Select...</option>
                    <option value="FE">F.E</option>
                    <option value="SE">S.E</option>
                    <option value="TE">T.E</option>
                    <option value="BE">B.E</option>
                    <option value="G">graduate</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Branch">Branch</label>
                  <select
                    {...register("branch")}
                    className="bg-slate-100 m-2 p-2 border rounded text-black"
                  >
                    <option value="">Select...</option>
                    <option value="IT">Information technology</option>
                    <option value="C.S">Computer science</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Biomedical">Biomedical</option>
                    <option value="EXTC">Electrical</option>
                    <option value="Civil">Civil</option>
                    <option value="Data">Data</option>
                    <option value="AI">AI</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="password">Create password</label>
              <input
                id="password"
                type={showPassword?"text":"password"} 
                {...register("password")}
                className="bg-white p-2 border border-black rounded w-full text-black"
                placeholder="Create Password"
              />

            </div>
            <div className="flex items-center gap-1">
                <label className="text-xs font-" value={showPassword}>show password </label>
                <input type="checkbox" onChange={()=>{setShowPassword(!showPassword)}}/>
            </div>
            <div className="mt-3">
                <label htmlFor="conformpassword">Conform password</label>
                <input type="password"
                 {...register("conformpassword")}
                className="bg-white p-2 border border-black rounded w-full text-black"
                placeholder="Conform Password"/>
            </div>
            <button className="bg-green-500 w-full p-2 rounded mt-3">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
