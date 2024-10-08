import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { FaArrowRight } from "react-icons/fa";

import { Link } from "react-router-dom";

import imgg from "../assets/welcome.svg";

function Welcome() {
  useGSAP(() => {
    gsap.from(".mainTitle", {
      duration: 0.7,
      opacity: 0,
      stagger: 0.3,
    });

    gsap.from(".exp", {
      duration: 1,
      opacity: 0,
      delay: 1.2,
    });

    gsap.from(".arow", {
      duration: 1,
      // opacity:0,
      x: 8,
      yoyo: true,
      repeat: Infinity,
    });

    gsap.from(".welcomeimg", {
      duration: 1,
      delay: 1,
      y: 2,
      yoyo: true,
      repeat: Infinity,
    });

    gsap.from(".welcomeimg", {
      duration: 1,
      delay: 1,
      y: 2,
      yoyo: true,
      repeat: Infinity,
    });
  });

  return (
    <div className="h-screen w-screen bg-violet-950 flex justify-center items-center">
      <div className="bg-white h-[74vh] w-[90vw] rounded-2xl flex items-center justify-center shadow-2xl">
        <div className="border-2 border-blue-800 h-[73vh] w-[88vw] rounded-2xl px-2 py-2 shadow-2xl flex flex-col items-center justify-between">
          <h3 className="welcome text-center font-semibold text-2x">
            <span className="text-violet-900 text-xl">Welcome </span>to our
            Project
          </h3>
          <h1 className="font-black text-4xl px-4 lg:self-end lg:text-[60px]">
            <span className="mainTitle">Student</span>
            <span className="mainTitle">Performance</span>
            <span className="mainTitle">Analysis System</span>
          </h1>
          <div className="lg:flex lg:w-[90%] lg:h-[70%] lg:gap-10 lg:items-center lg:px-4">
            <img
              className="welcomeimg h-[25vh] w-[90vw] scale-110 lg:w-[50%] lg:h-[90%] lg:scale-125"
              src={imgg}
            />
            <p className="px-3 text-sm text-center lg:w-[50%] lg:text-4xl lg:">
              Streamline college management, class organization, and add
              students and faculty. Seamlessly track attendance, assess
              performance, and provide feedback. Access records, view marks, and
              communicate effortlessly.
            </p>
          </div>

          <Link
            to="/chooseuser"
            className="exp px-6 py-2 bg-purple-800 text-white rounded-md font-black flex justify-center items-center gap-3 lg:w-[20vw] lg:py-4"
          >
            Let's Explore
            <span className="arow text-white">
              <FaArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
