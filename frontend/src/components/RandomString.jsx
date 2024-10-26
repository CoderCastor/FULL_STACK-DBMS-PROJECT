import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function RandomString({ TokenFetcher,title,setTokenPopup }) {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const location = useLocation()
  const path = location.pathname

  // password referenceHook
  const passwordRef = useRef(null);

  // password generator method
  // new hook
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (numberAllowed) str += "`~!@#$%^&*()_+-=[]{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    // use with hook
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // hook for text selection in textinputfield
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    // optional for selection particular range
    // passwordRef.current?.setSelectionRange(0,9)

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numberAllowed, charAllowed, passwordgenerator]);
  return (
    <div className="h-auto w-screen">
      <div className="lg:w-full w-[90%] max-w-md mx-auto shadow-2xl rounded-lg px-4 py-10 my-8 flex flex-col gap-4 text-black bg-zinc-100">
        <h1 className="text-green font-black text-2xl text-center my-3 flex justify-between px-5">
          <span><span>| </span>
          {title}</span>
          <div onClick={()=>setTokenPopup(false)} className="close flex justify-center items-center bg-black rounded-full h-9 w-9"><IoMdClose className='text-2xl text-white' /></div>
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-8 py-2 shrink-0 hover:bg-blue-900 duration-200"
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-6 gap-y-3 flex-wrap flex-col items-center  lg:flex-row ">
          <div className="flex items-center gap-x-5 justify-center w-full">
            <input
              type="range"
              min={6}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="bg-zinc-200 border-2 border-zinc-300 rounded-xl w-24 flex justify-center px-2 py-1 items-center text-black ">
              Length: {length}
            </label>
          </div>
          <div className="flex justify-evenly items-center w-full mt-4">
            <div className="flex gap-3 text-lg font font-semibold text-zinc-700">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex gap-3 text-lg font font-semibold text-zinc-700">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label className="" htmlFor="characterInput">
                Characters
              </label>
            </div>
          </div>
        </div>
        <button
          className="px-2 py-1 shadow-xl font-semibold text-blue-900 border-blue-600 border-2 text-xl w-1/2 mx-auto mt-2 rounded-xl"
          onClick={() => TokenFetcher(password)}
        >
          Insert
        </button>
      </div>
    </div>
  );
}

export default RandomString;
