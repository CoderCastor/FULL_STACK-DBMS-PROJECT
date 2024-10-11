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
      delay:2.0
    });

    gsap.from(".exp", {
      duration: 1,
      opacity: 0,
      delay: 3.5,
    });

    gsap.from(".arow", {
      duration: 1,
      // opacity:0,
      x: 8,
      yoyo: true,
      repeat: Infinity,
    });

    gsap.from(".arow", {
      duration: 1,
      opacity:0,
      delay:4

    });

    gsap.from(".welcome", {
      delay:.4,
      duration: 1.2,
      opacity:0
    });

    gsap.to(".welcome", {
      delay:1.2,
      duration: 1.2,
      opacity:0
    });

    gsap.from(".welcomeimg", {
      duration: 1,
      y: 5,
      delay:2.0,
      yoyo: true,
      repeat: Infinity,
    });

    gsap.from(".welcomeimg", {
      duration: 2,
      opacity:0,
      delay:2.4,
      
    });

    gsap.from(".disfis", {
      duration: 2,
      delay:2,
      opacity:0
    });

    gsap.from(".mainParent", {
      duration: .3,
      width:0,
      delay:.1
      
    });
  });

  return (
    <div className="h-screen w-screen bg-violet-950 flex justify-center items-center">
      <div className="mainParent bg-white h-[74vh] w-[90vw] rounded-2xl flex items-center justify-center shadow-2xl relative">
          <h3 className="welcome text-center font-semibold text-5xl flex flex-wrap justify-center items-center absolute lg:gap-4 lg:text-7xl">
            <span className="text-violet-900 lg:text-8xl">Welcome </span>to our
            Project
          </h3>
        <div className="disfis relative border-2 border-blue-800 lg:border-blue-100 h-[73vh] w-[88vw] rounded-2xl px-2 py-2 pt-12 shadow-2xl flex flex-col items-center justify-between lg:justify-center">
          <h1 className="font-black text-4xl px-4 lg:self-end lg:text-[80px] flex flex-wrap gap-1 items-center lg:w-[40%] lg:absolute lg:top-16 lg:right-36 lg:items-center lg:justify-start lg:gap-10 lg:flex-col">
            <span className="mainTitle">Student</span>
            <span className="mainTitle"><span className="">Performance</span></span>
            <span className="mainTitle flex">Analysis System</span>
          </h1>
          <div className="lg:flex lg:w-[90%] lg:h-[70%] lg:gap-10 lg:items-center lg:px-4">
            <img
              className="welcomeimg h-[25vh] w-[90vw] scale-110 lg:w-[50%] lg:h-[90%] lg:scale-125"
              src={imgg}
            />
            <p className="px-3 text-sm text-center lg:w-[50%] lg:text-3xl lg:self-end">
              Streamline college management, class organization, and add
              students and faculty. Seamlessly track attendance, assess
              performance, and provide feedback. Access records, view marks, and
              communicate effortlessly.
            </p>
          </div>

          <Link
            to="/chooseuser"
            className="exp px-6 py-2 bg-purple-800 text-white rounded-md font-black flex justify-center items-center gap-3 lg:w-[20vw] lg:py-4 lg:mt-12 lg:text-xl hover:scale-105 hover:duration-400"
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
