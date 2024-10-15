import React from 'react'
import HomeBox from '../../components/HomeBox'

function AdminDashBoard() {
  return (
    <div className='w-full'>
      <div className='w-[100%] lg:w-3/5 mx-auto'>
        <div className='Boxes mt-2 lg:mt-10 flex flex-col lg:flex-row gap-3 lg:justify-evenly items-center py-4'>
          <HomeBox/>
          <HomeBox/>
          <HomeBox/>
          <HomeBox/>
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard