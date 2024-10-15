import React from 'react'
import HomeBox from '../../components/HomeBox'

function AdminDashBoard() {

  const data = [
    {
      title:"Total Students"
    },
    {
      title:"Total Teachers"
    },
    {
      title:"Total Classes"
    },
    {
      title:"Fees Collections"
    }
  ]

  return (
    <div className='w-full'>
      <div className='w-[100%] lg:w-3/5 mx-auto'>
        <div className='Boxes mt-2 lg:mt-10 flex flex-col lg:flex-row gap-3 lg:justify-evenly items-center py-4'>
          <HomeBox data={data} />
          <HomeBox data={data} />
          <HomeBox data={data} />
          <HomeBox data={data} />
        </div>
        <div className="notices mt-5 bg-purple-200 w-[90%] lg:w-full text-2xl mx-auto rounded-xl overflow-hidden">
          <div className="heading bg-purple-400 shadow-2xl text-xl lg:text-4xl text-white h-10 px-3 lg:py-3 lg:h-auto lg:px-5 flex items-center">Notices</div>
          <div className='px-3'>
            notice 1
          </div>
          <hr className='bg-white' />
          <div className='px-3'>
            notice 2
          </div>
          <hr className='bg-white' />
          <div className='px-3'>
            notice 3
          </div>
          <hr className='bg-white' />
          <div className='px-3'>
            notice 4
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard