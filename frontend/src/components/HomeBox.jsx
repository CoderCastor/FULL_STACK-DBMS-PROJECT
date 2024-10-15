import React from 'react'
import { PiStudentBold } from "react-icons/pi";

function HomeBox() {
  return (
    <div className='bg-blue-200 w-4/5 lg:w-[25%] h-[100px] rounded-ee-3xl rounded-ss-3xl p-1 lg:h-[100px] flex overflow-hidden px-5'>
        <div className="logo  w-[35%] flex justify-center items-center">
        <div className='bg-blue-500 w-[80px] h-[50px] flex justify-center items-center text-3xl rounded-ee-3xl rounded-ss-3xl'><PiStudentBold  /></div>
        </div>
        <div className="text w-[65%] flex flex-col items-center justify-between py-2">
            <div className="data text-3xl font-semibold mt-2">77</div>
            <div className="title">Total Students</div>
        </div>
    </div>
  )
}

export default HomeBox