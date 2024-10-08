import React, { useContext } from 'react'

import { RiAdminFill } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";
import { FaUser } from "react-icons/fa";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Link} from "react-router-dom";
import { UserContext } from '../context/UserContext';

import img from "../assets/chooselogin.svg";

function ChooseUser() {

    const UserState = useContext(UserContext)
  
    useGSAP(() => {
      gsap.from(".box", {
        x: 100,
        duration: 0.3,
        opacity: 0,
        stagger: 0.2,
        delay: 0.3,
      });
  
      gsap.from("span", {
        x: -600,
        duration: 0.6,
        opacity: 0,
        stagger: 0.2,
        delay: 0.1,
      });
  
      gsap.from("h1", {
        duration: 1.5,
        opacity: 0,
        scale: 1.1,
        delay: 0.8,
        rotateX: 50,
      });
  
      gsap.from(".label", {
        duration: 0.7,
        opacity: 0,
        delay: 1,
        rotateX: 50,
        stagger: 0.2,
      });
  
      gsap.from(".imglogin", {
        duration: 0.7,
        opacity: 0,
        delay: 1,
      });
  
      gsap.from(".imgFlex", {
        duration: 1,
        width:0,
        delay:.7
  
      });
    });
  
    return (
      <div className="bg-blue-950 h-screen w-screen flex justify-center items-center ">
        <div className="mainFlex lg:w-auto flex flex-col lg:flex-row justify-center items-center overflow-hidden rounded-3xl w-[90vw]">
          <div className="imgFlex lg:h-[500px] lg:w-[550px] w-[90%] h-[200px] z-10 bg-white flex justify-center items-center">
            <img src={img} className="imglogin h-[250px] translate-y-8 lg:h-[100%] lg:w-[100%] lg:translate-y-0" alt="" srcset="" />
          </div>
          <div className="main overflow-hidden w-[90%] h-[400px] lg:h-[500px] lg:w-[600px] bg-white py-10 px-10 flex flex-col gap-4 lg:gap-10 justify-center lg:items-center">
            <h1 className="text-center text-2xl lg:text-3xl font-extrabold">
              Choose your role
            </h1>
            <Link
              onClick={()=> UserState.setUser("Admin")}
              to="/login"
              className="box flex text-red-600 border-2 border-red-400 justify-center lg:hover:bg-red-100 lg:hover:transition-all py-4 rounded-full items-center gap-4 font-extrabold text-2xl lg:justify-center lg:w-[80%]"
            >
              <span className="text-white bg-red-600 h-10 w-10 rounded-full flex justify-center items-center">
                <RiAdminFill />
              </span>
              <p className="label">Admin</p>
            </Link>
  
            <Link
              onClick={()=> UserState.setUser("Teacher")}
              to="/login"
              className="box flex text-blue-600 border-2 border-blue-400 justify-center py-4 rounded-full items-center gap-4 font-extrabold text-2xl lg:justify-center lg:w-[80%]"
            >
              <span className="text-white bg-blue-600 h-10 w-10 rounded-full flex justify-center items-center">
                <GrUserManager />
              </span>
              <p className="label">Teacher</p>
            </Link>
  
            <Link
              onClick={()=> UserState.setUser("Student")}
              to="/login"
              className="box flex text-green-700 border-2 border-green-500 justify-center py-4 rounded-full items-center gap-4 font-extrabold text-2xl lg:justify-center lg:w-[80%]"
            >
              <span className="text-white bg-green-700 h-10 w-10 rounded-full flex justify-center items-center">
                <FaUser />
              </span>
              <p className="label">Student</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

export default ChooseUser