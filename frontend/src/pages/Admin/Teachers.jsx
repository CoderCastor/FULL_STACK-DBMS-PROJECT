import React, { useState } from "react";
import { TbLetterSpacing } from "react-icons/tb";
import { RiAiGenerate } from "react-icons/ri";
import { FaKey } from "react-icons/fa6";
import RandomString from "../../components/RandomString";
import { IoMdClose } from "react-icons/io";
import Table from "../../components/Table";

function Teachers() {

  const subColumns = [
    { header: 'Teacher Name', field: 'teacher_name' },
    { header: 'Subject Name', field: 'sub_code' },
    
  ];

  const subData = [
    { teacher_name: 'Sheetal Nirve', sub_code: 'FDS', sessions: '71' },
    { teacher_name: 'Satish Yedage', sub_code: 'SPOS', sessions: '72' },
    { teacher_name: 'Geetanjali Bansod', sub_code: 'Computer Graphics', sessions: '73' },
    { teacher_name: 'Sheetal Nirve', sub_code: 'FDS', sessions: '71' },
    { teacher_name: 'Satish Yedage', sub_code: 'SPOS', sessions: '72' },
    { teacher_name: 'Geetanjali Bansod', sub_code: 'Computer Graphics', sessions: '73' },
    { teacher_name: 'Sheetal Nirve', sub_code: 'FDS', sessions: '71' },
    { teacher_name: 'Satish Yedage', sub_code: 'SPOS', sessions: '72' },
    { teacher_name: 'Geetanjali Bansod', sub_code: 'Computer Graphics', sessions: '73' },
  ];



  const [token, setToken] = useState("");
  const [tokenPopup, setTokenPopup] = useState(false);
  const [customTokenPopup, setCustomTokenPopup] = useState(false);
  const TokenFetcher = (token) => {
    setToken(token);
    console.log(token);
  };
  return (
    <>
      <div
        className={`${
          !customTokenPopup && "hidden"
        } w-full mx-auto relative flex justify-center items-center z-10`}
      >
        <div
          className={`popupAddClass h-[300px] w-[600px] bg-zinc-200 absolute top-[200px] px-4 py-8 flex flex-col justify-between border-2 border-purple-250 rounded-2xl shadow-2xl z-10`}
        >
          <div className="w-full flex justify-between items-center px-8 rounded-md">
            <h3 className="flex justify-center items-center text-black text-2xl font-semibold gap-5 py-2 px-10 rounded-2xl">
              Enter Custom Token
            </h3>
            <div
              onClick={() => setCustomTokenPopup(false)}
              className="close flex justify-center items-center bg-white rounded-full h-9 w-9"
            >
              <IoMdClose className="text-2xl" />
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter Token"
            className="px-4 py-3 w-[80%] mx-auto outline-none rounded-xl font-semibold text-xl"
          />
          <button className="bg-purple-950 px-5 py-3 text-white font-semibold rounded-xl w-[40%] mx-auto text-2xl">
            Insert
          </button>
        </div>
      </div>

      <div
        className={`absolute mx-auto top-[180px] ${!tokenPopup && "hidden"} z-10`}
      >
        <RandomString
          title={"Token for Teacher"}
          TokenFetcher={TokenFetcher}
          setTokenPopup={setTokenPopup}
        />
      </div>
      <div className="w-3/4 mx-auto bg-blue-50 px-8 py-4 mt-10">
        <h1 className="text-3xl">Token Section</h1>
        <hr className="bg-black h-[3px] my-2" />
        <div className="mainFns flex justify-between px-10 py-4">
          <div className="tokens flex gap-10">
            <button
              onClick={() => setTokenPopup(true)}
              className="bg-red-300 px-7 py-3 rounded-xl font-black text-lg shadow-md flex justify-center items-center gap-4"
            >
              <span className="text-2xl bg-red-400 text-white rounded-2xl p-1">
                <RiAiGenerate />
              </span>{" "}
              Generate Token
            </button>
            <button
              onClick={() => setCustomTokenPopup(true)}
              className="bg-blue-300 px-7 py-3 rounded-xl font-black text-lg shadow-md flex justify-center items-center gap-4"
            >
              <span className="text-2xl bg-blue-400 text-white rounded-2xl p-1">
                <TbLetterSpacing />
              </span>{" "}
              Custom Token
            </button>
          </div>
          <button className="availableTokens bg-green-300 px-7 py-3 rounded-xl font-black text-lg shadow-md flex justify-center items-center gap-4">
            <span className="text-xl bg-green-400 text-white rounded-2xl p-[5px]">
              <FaKey />
            </span>{" "}
            Available Tokens
          </button>
        </div>
        <div className="absolute top-[350px] w-[71vw] mx-auto flex justify-center items-center" >
        <Table columns={subColumns} data={subData} />
        </div>
      </div>
      
    </>
  );
}

export default Teachers;
