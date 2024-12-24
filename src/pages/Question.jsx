
import { toast } from "react-toastify";

import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Answer from "../pages/Answer";
import ShowAnswer from "../components/ShowAnswer";
import calculateYearsAgo from "../helper/calculateYearsAgo";
import AddComment from "../components/AddComment";


const Question = () => {
  const questionId = useParams();
  const [question, setQuestion] = useState("");
  const [comment, setComment] = useState("");
  const [close, setClose] = useState(false);
  const [showanswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState([]);
  const navigate=useNavigate()
  const getAnswer = async () => {
    const dataResponse = await fetch(SummaryApi.getanswer.url, {
      method: SummaryApi.getanswer.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        questionId: questionId.id,
      }),
    });
    const data = await dataResponse.json();
    setAnswer(data.data);
  };

  const getQuestion = async () => {
    const Response = await fetch(SummaryApi.question.url, {
      method: SummaryApi.question.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        questionId: questionId.id,
      }),
    });

    const data = await Response.json();
    setQuestion(data.data);
  };
  useEffect(() => {
    getQuestion();
    const previewElement = document.getElementById("Preview");
    if (previewElement) {
      previewElement.innerHTML = question?.description;
    }
    getAnswer();
  }, [question?.length]);

  const handelInputChange = (e) => {
    setComment(e.target.value);
  };
  const user = useSelector((state) => {
    const user = state.user.user1;
    return user;
  });
  const addComment = async (e) => {
    e.preventDefault();
    const Response = await fetch(SummaryApi.addcomment.url, {
      method: SummaryApi.addcomment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        questionId: questionId.id,
        userId: user,
      }),
    });
    const data = await Response.json();
    if (data.success) {
      toast.success(data.message);
      setClose(!close);
      getQuestion();
      setComment("");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const deletePost=async(e)=>{
    e.preventDefault();
    console.log(question);
    
    const Response1 = await fetch(SummaryApi.deletePost.url,{
      method:SummaryApi.deletePost.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        question:question
      })
    })
    let det = await Response1.json();
    if (det.success) {
      navigate("/")
      toast.success(det.message)
    }
    if (det.error) {
      toast.error(det.message);
    }
  }

  return (
    <div className="flex justify-center scrollbar-none">
      <div className="w-full h-[100vh] lg:w-[50%]">
        <div className="px-6 border-b border-b-slate-300">
          <div className="w-full py-4 text-xl font-semibold ">
            {question?.post}
          </div>
          <div>
            <div>
              <div>{calculateYearsAgo(question?.createdAt)}</div>
              <div className="h-9 md:w-[25%] w-[50%] bg-white flex items-center rounded-sm border border-slate-400 mt-3">
                <img
                  className="max-h-8 px-1"
                  src={question?.userId?.profilepic}
                  alt="question image"
                />
                <span className="text-blue-400 text-sm">
                  {question?.userId?.username}
                </span>
              </div>
            </div>
          </div>
          <div id="Preview"></div>
          <div className=" w-full flex justify-center items-center mt-3">
            <img className="w-72 " src={question?.image} />
          </div>
          <div className="w-fit px-1 flex items-center object-contain rounded-sm text-slate-500 text-lg bg-slate-200 mt-9">
            {question?.subject}
          </div>
          <div className="w-full h-20 flex justify-end items-center">
            <div className=" h-full flex items-center">
            
              <button
                className="bg-slate-400 text-sm min-w-32 py-1 px-3 rounded-md text-white"
                onClick={() => {
                  setClose(!close);
                }}
              >
                Add Comment
              </button>
            
              {
                user?._id == question?.userId?._id ?(
                  <span className="text-blue-500 px-4 cursor-pointer" onClick={(e)=>{
                    deletePost(e)
                  }}>Delete</span>
                ) :
                (
                  <span></span>
                )
              }
            </div>
          </div>
          <div>
            <AddComment addComment={addComment} handelInputChange={handelInputChange} close={close} setClose={setClose} comment={comment} />
          </div>
          <div className="font-semibold relative bottom-0">
            {question?.answers?.length}
            <span> Answer</span>
          </div>
        </div>
        <div>
          <div className="px-6 h-[50vh] overflow-auto scrollbar-none">
            {question?.Comments?.map((el, index) => {
              return (
                <div className=" flex flex-wrap mb-1 w-full bg-slate-50 p-2 rounded-md">
                  <div className="rounded-full  w-full flex items-center gap-2">
                    <img
                      className="w-10 h-10 rounded-full object-contain"
                      src={el.userId?.profilepic}
                    />
                    <span>{el.userId?.username}</span>
                  </div>
                  <div key={index} className="w-full  py-4">
                    <div className="px-2">{el.comment}</div>
                  </div>
                  
                </div>
              );
            })}
          </div>
          <div className="h-fit border-t border-t-slate-300">
            <ShowAnswer answer={answer} question={question} setQuestion={setQuestion}/>
          </div>
          {showanswer ? (
            <div className="">
              <Answer
                question={question}
                showanswer={showanswer}
                setShowAnswer={setShowAnswer}
              />
            </div>
          ) : (
            <div className="flex items-center">
              Have got a better answer ?
              <div
                className="text-xs font-semibold text-blue-400 px-2 cursor-pointer"
                onClick={() => {
                  setShowAnswer(!showanswer);
                }}
              >
                {" "}
                ADD NEW ANSWER
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
