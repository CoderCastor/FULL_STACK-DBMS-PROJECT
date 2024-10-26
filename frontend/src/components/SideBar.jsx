import React from 'react'
import { NavLink } from 'react-router-dom'

function SideBar() {
  return (
    <div className='bg-red-500 w-[90vw] rounded-ee-2xl lg:hidden absolute z-10' >
      <div className="Navs flex flex-col overflow-hidden">
      <div className="title px-2 text-white">Menu</div>
      <NavLink className="bg-purple-950 text-center text-white font-black text-2xl py-2 " >
        Home
      </NavLink>
      </div>
    </div>
  )
}

export default SideBar