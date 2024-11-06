import React from 'react'

function DeletePopup({deletion,msg}) {
  return (
    <div className="main absolute h-screen w-screen z-20 flex justify-center items-center">
        <div className="container bg-zinc-50 h-[200px] w-[500px] flex flex-col justify-between items-center py-10 rounded-3xl shadow-2xl">
            <div className="msg text-red-500 font-black text-2xl">Do you want to Delete this ?</div>
            <div className="data">{msg}</div>
            <div className="buttonns flex gap-5">
                <div onClick={()=>deletion(true)} className="yes px-14 py-2 bg-red-800 rounded-md text-white font-semibold shadow-lg">Yes</div>
                <div onClick={()=>deletion(false)} className="no px-10 py-2 bg-blue-700 rounded-md text-white font-semibold shadow-lg">Cancel</div>
            </div>
        </div>

    </div>
  )
}

export default DeletePopup