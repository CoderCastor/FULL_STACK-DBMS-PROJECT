import React, { useState } from 'react'
import { SiGoogleclassroom } from "react-icons/si";
import { IoMdClose } from "react-icons/io";
import Table from '../../components/Table';



function Classes() {
  const divColumns = [
    { header: 'Class Name', field: 'name' },
    { header: 'Class Teacher', field: 'teacher_name' },
    { header: 'Total Students', field: 'total_students' },
  ];

  const divData = [
    { name: 'TE A', teacher_name: 'Satish Yedage', total_students: '71' },
    { name: 'TE B', teacher_name: 'Prashant Raut', total_students: '72' },
    { name: 'SE A', teacher_name: 'Geetanjali Bansod', total_students: '73' },
  ];


  const [popup,setPopup] = useState(false)
  return (
    <div className='w-full flex flex-col items-center justify-center gap-10'>
      <div className={`popupAddClass h-[300px] w-[600px] bg-zinc-200 absolute top-[200px] px-4 py-8 ${!popup && "hidden" } flex flex-col justify-between border-2 border-purple-250 rounded-2xl shadow-2xl z-10`}>
          <div className='w-full flex justify-between items-center px-8 rounded-md' >
            <h3 className='flex justify-center items-center text-white text-2xl font-semibold gap-5 py-2 bg-purple-800 px-10 rounded-2xl' > <span className='text-3xl' ><SiGoogleclassroom /></span> Add Class</h3>
            <div onClick={()=>setPopup(false)} className="close flex justify-center items-center bg-white rounded-full h-9 w-9"><IoMdClose className='text-2xl' /></div>
          </div>
          <input type="text" placeholder='Class Name' className='px-4 py-3 w-[80%] mx-auto outline-none rounded-xl font-semibold text-xl' />
          <button className='bg-purple-950 px-5 py-3 text-white font-semibold rounded-xl w-[40%] mx-auto text-2xl' >Add</button>
      </div>
      <div onClick={()=>setPopup(true)} className="addclass flex justify-end w-full px-20 py-4">
        <button className='bg-blue-900 px-20 py-3 text-2xl shadow-2xl text-white font-semibold rounded-xl mx-' >ADD CLASS</button>

      </div>
      <Table columns={divColumns} data={divData} />
    </div>
  )
}

export default Classes