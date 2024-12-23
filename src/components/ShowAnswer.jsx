import React, { useState } from 'react';
import calculateYearsAgo from '../helper/calculateYearsAgo';
import AddComment from './AddComment';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaRegComment } from "react-icons/fa";


const ShowAnswer = ({ answer, question, setQuestion  }) => {
  const [openAnswerId, setOpenAnswerId] = useState(null); // Store the ID of the answer for which the comment box is open
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user.user1);

  const handelInputChange = (e) => {
    setComment(e.target.value);
  };

  const getQuestion = async () => {
    const Response = await fetch(SummaryApi.question.url, {
      method: SummaryApi.question.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        questionId: question.id,
      }),
    });
    const data = await Response.json();
    setQuestion(data.data);
  };

  const addComment = async (e) => {
    e.preventDefault();

    const Response = await fetch(SummaryApi.addcommenttoans.url, {
      method: SummaryApi.addcommenttoans.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        questionId: answer._id,
        userId: user,
        type: "answer",
        answerId: openAnswerId,
      }),
    });

    const data = await Response.json();
    if (data.success) {
      toast.success(data.message);
      setOpenAnswerId(null); // Close the comment box after submission
      getQuestion();
      setComment("");
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <div>
      {answer?.map((el, index) => (
        <div key={el._id} className="px-6 border-b border-b-slate-300">
          <div>{calculateYearsAgo(el?.createdAt)}</div>
          <div className="flex flex-wrap mb-1 w-full p-2 rounded-md">
            <div className="h-9 md:w-[25%] w-[50%] bg-white flex items-center rounded-sm border border-slate-400 mt-3">
              <img
                className="max-h-8 px-1"
                src={el.answeredByUserId?.profilepic}
                alt="question image"
              />
              <span className="text-blue-400 text-sm">
                {el?.answeredByUserId?.username}
              </span>
            </div>
            <div className="w-full py-4">
              <div className="w-full flex justify-center items-center mt-3 flex-wrap">
                {el.image.map((img) => (
                  <p key={img} className="w-full">
                    <img className="w-72" src={img} alt="answer image" />
                  </p>
                ))}
              </div>
              <div className="px-2">{el.answer}</div>
            </div>
          </div>

          <div className="pb-4 pt-3">
            {openAnswerId === el._id ? (
              <AddComment
                addComment={addComment}
                handelInputChange={handelInputChange}
                close={true}
                setClose={() => setOpenAnswerId(null)}
                comment={comment}
                answerId={el?._id}
              />
              // <AddComment 
              //addComment={addComment} 
              //handelInputChange={handelInputChange} 
              //close={close} setClose={setClose} 
              //comment={comment} />
            ):(
              <div className="w-full h-full flex items-center justify-end">
                <div className='px-5 text-slate-500 font-semibold w-7 rounded-full hover:bg-slate-100 h-6 flex justify-center items-center'>
                <div><FaRegComment title='comments'/></div>
                </div>
              <button
                className="bg-slate-400 text-sm min-w-32 py-1 px-3 rounded-md text-white"
                onClick={() => setOpenAnswerId(openAnswerId === el._id ? null : el._id)}
              >
                Add Comment
              </button>
            </div>
            )}
          </div>
          <div>
           {console.log(el)
           }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowAnswer;
