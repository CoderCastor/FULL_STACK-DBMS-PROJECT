import React, { useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { RiMenuFold3Fill } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";
import { Link,NavLink } from "react-router-dom";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  console.log(toggle);

  return (
    <div className="bg-[#282654] h-[8vh] w-full flex items-center justify-between px-5 lg:px-14 shadow-2xl">
      <div className="lg:hidden">
        <button
          onClick={() => setToggle(true)}
          className={`p-2 bg-[#E64833] rounded-full text-white ${
            toggle ? "hidden" : ""
          } `}
        >
          <RiMenu4Line className="text-xl" />
        </button>
        <button
          onClick={() => setToggle(false)}
          className={`${
            !toggle ? "hidden" : ""
          } p-2 bg-[#E64833] rounded-full text-white`}
        >
          <RiMenuFold3Fill className="text-xl" />
        </button>
      </div>
      <h1 className="font-black text-2xl text-white shadow-lg">
        Admin Dashboard
      </h1>
      <div className="flex gap-14">
        <ul className="lg:flex items-center justify-between w-[40vw] hidden text-white">
          <NavLink
            to="home"
            className={(e) => {
              return [
                e.isActive ? "bg-white" : "",
                e.isActive ? "text-black" : "",
                e.isActive ? "rounded-2xl" : "",
                "px-3",
                "py-1",
                "min-w-20",
                "text-center",
              ].join(" ");
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="classes"
            className={(e) => {
              return [
                e.isActive ? "bg-white" : "",
                e.isActive ? "text-black" : "",
                e.isActive ? "rounded-2xl" : "",
                "px-3",
                "py-1",
                "min-w-20",
                "text-center",
              ].join(" ");
            }}
          >
            Classes
          </NavLink>
          <NavLink
            to="subjects"
            className={(e) => {
              return [
                e.isActive ? "bg-white" : "",
                e.isActive ? "text-black" : "",
                e.isActive ? "rounded-2xl" : "",
                "px-3",
                "py-1",
              ].join(" ");
            }}
          >
            Subjects
          </NavLink>
          <NavLink
            to="teachers"
            className={(e) => {
              return [
                e.isActive ? "bg-white" : "",
                e.isActive ? "text-black" : "",
                e.isActive ? "rounded-2xl" : "",
                "px-3",
                "py-1",
              ].join(" ");
            }}
          >
            Teachers
          </NavLink>
          <NavLink
            to="students"
            className={(e) => {
              return [
                e.isActive ? "bg-white" : "",
                e.isActive ? "text-black" : "",
                e.isActive ? "rounded-2xl" : "",
                "px-3",
                "py-1",
              ].join(" ");
            }}
          >
            Students
          </NavLink>
        </ul>
        <Link className="p-2 bg-[#E64833] rounded-full text-white">
          <FaUserLarge className="text-xl" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
