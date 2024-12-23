
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/index'
import { toast } from 'react-toastify'
import nodata from '../assets/nodata.jpg'

const VerifyAnswer = () => {
  
  const [answer,setAnswer]=useState([])
  const verifyAnswer=async()=>{
    const dataResponse=await fetch(SummaryApi.verifyanswer.url,{
      method:SummaryApi.verifyanswer.method,
      credentials:'include',
      headers:{
        "content-type" : "application/json"
      },
      
    })
    const data=await dataResponse.json()
    console.log(data.data);
    setAnswer(data.data)
  }

    useEffect(()=>{
        verifyAnswer()
    },[])
    const markVerify=async(index)=>{
      console.log(index);
      
      const dataResponse=await fetch(SummaryApi.markverify.url,{
        method:SummaryApi.markverify.method,
        credentials:'include',
        headers:{
          "content-type" : "application/json"
        },
        body:JSON.stringify(index)
        //converting a JavaScript object, array, or other value into a JSON string
      })
      console.log("this is real json response",dataResponse);
      
      const data=await dataResponse.json()
      //The .json() function is used to parse this JSON string into a JavaScript object.
      if(data.success){
        toast.success(data.message)
        verifyAnswer()
      }
      if(data.error)
      {
        toast.error(data.message?.message)
      }
      
    }
  return (
    <div>
      {        
        answer.length>0 ? (
          <div>{answer?.map((index,el)=>{
            return <div className='bg-white py-3 shadow-xl mt-3 px-3 rounded-lg' key={el}>
             <span className='px-2 font-semibold'>Q)</span>{index.questionId.post}
             <div><img src={index.questionId.image} className='hover:scale-150 transition-all' width={60}/></div>
             <div>
               <p className='px-2 font-semibold'>Ans.</p>
               <p>
                 {
                   index?.image.length && (
                     
                       (index.image).map((index,el)=>{
                         return <img src={index} key={el} className='w-20 h-20' />
                       }
                     )
                     
                   )
                 }
               </p>
               <p id='Preview'>
                 {index.answer}
               </p>
               <div>
                 <button className='bg-slate-400 px-3 rounded-md text-white' onClick={()=>{markVerify(index)}}>Verify</button>
               </div>
             </div>
             </div>
          })}</div>
        ):(
          <div className='flex justify-center items-center'>
            <img src={nodata} className='mix-blend-multiply bg-white' />
          </div>
        )
      }
    </div>
  )
}

export default VerifyAnswer
