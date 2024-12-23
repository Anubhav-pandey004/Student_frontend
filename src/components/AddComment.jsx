import React from 'react'

const AddComment = ({addComment, handelInputChange, close ,setClose,comment}) => {
  return (
   <div>
              {close && (
                <form onSubmit={addComment}>
                  <textarea
                    name="comment"
                    className="w-full border rounded-lg focus:outline-slate-300 p-2"
                    value={comment}
                    onChange={handelInputChange}
                    rows={7}
                  ></textarea>

                  <div className="w-full h-10 flex justify-between ">
                    <button className="border bg-blue-400 rounded-md hover:bg-blue-500 px-4 py-1 mt-1 text-white" >
                      Add comment
                    </button>
                    <button
                      className="text-blue-400"
                      onClick={() => {
                        setClose(!close);
                      }}
                    >
                      cancel
                    </button>
                  </div>
                </form>
              )}
    </div>
  )
}

export default AddComment
