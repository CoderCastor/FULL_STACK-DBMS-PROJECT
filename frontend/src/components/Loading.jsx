import React from "react";
import { TiTick } from "react-icons/ti";
import img from "../assets/loading-gif.gif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Loading(data) {

  useGSAP(()=>{
    gsap.from('.msg',{
        y:100,
        duration:1,
        delay:.8
        
    })
  })



  return (
    <div className="bg-[#3f3f3f94] h-full w-full absolute z-10 flex flex-col justify-center items-center">
      <div className="msg flex justify-center items-center gap-3 bg-zinc-300 px-5 pb-3 pt-3 rounded-ss-3xl rounded-se-3xl text-[#00e531] font-black text-md">
        <span className="bg-white rounded-full text-2xl">
          <TiTick />
        </span>
        {data.data.msg}
      </div>
      <div className="relative flex bg-[#FCFCF8] w-[80%] lg:w-[25%] rounded-2xl overflow-hidden shadow-2xl">
        <img src={img} className="w-[40vw] lg:w-[10vw] scale-125" alt="" />
        <h1 className="absolute right-10 top-8 lg:top-10 lg:right-32 text-3xl lg:text-4xl font-semibold text-zinc-700">
          Loading...
        </h1>
      </div>
    </div>
  );
}

export default Loading;
