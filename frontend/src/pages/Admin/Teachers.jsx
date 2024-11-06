import React, { useEffect, useState } from "react";
import { TbLetterSpacing } from "react-icons/tb";
import { RiAiGenerate } from "react-icons/ri";
import { FaKey } from "react-icons/fa6";
import RandomString from "../../components/RandomString";
import { IoMdClose } from "react-icons/io";
import Table from "../../components/Table";
import axios from "axios";
import TableToken from "../../components/TableToken";
import { PiArrowFatLinesRightFill } from "react-icons/pi";
import { MdLibraryAdd } from "react-icons/md";

function Teachers() {
  const subColumns = [
    { header: "Teacher Name", field: "teacher_name" },
    { header: "Subject Name", field: "sub_name" },
  ];

  const subData = [
    { teacher_name: "Sheetal Nirve", sub_name: "FDS", sessions: "71" },
    { teacher_name: "Satish Yedage", sub_name: "SPOS", sessions: "72" },
  ];

  const subToken = [{ header: "Available Tokens", field: "token" }];

  const subDataToken = [{ token: "1234" }];

  const [token, setToken] = useState("");
  const [tokenPopup, setTokenPopup] = useState(false);
  const [customTokenPopup, setCustomTokenPopup] = useState(false);
  const [availTokenPopup, setAvailTokenPopup] = useState(false);
  const [customToken, setCustomToken] = useState("");
  const [availTokenData,setAvailTokenData] = useState([])
  const [teachersData,setTeachersData] = useState([])

  const TokenFetcher = (token) => {
    setToken(token);
    TokenFetcherHandler(token);
    console.log(token);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin/avail-tokens");
        setAvailTokenData(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

  }, [availTokenPopup]);


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin/get-teachers");
        // console.log(response.data);
        const transformedData = response.data.map(item => {
          return {
            ...item, // Copy all original properties
            teacher_name: `${item.first_name} ${item.last_name}`, // Combine first_name and last_name
          };
        });

        setTeachersData(transformedData);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    
  },[])


  const customTokenHandler = () => {
    // setToken(customToken);
    TokenFetcherHandler(customToken);
  };

  const TokenFetcherHandler = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/insert-token",
        { token }
      );
      console.log(response.data);
      if (response.data.Inserted) {
        setTokenPopup(false);
        setCustomTokenPopup(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`${
          !availTokenPopup && "hidden"
        } availableTokensPopup w-full h-[80vh] mx-auto flex justify-center items-center z-10 absolute`}
      >
        <div className="w-1/3 flex flex-col bg-green-200 px-5 py-5 shadow-2xl rounded-lg">
          <div
            onClick={() => setAvailTokenPopup(false)}
            className="close flex justify-center items-center bg-white rounded-full h-9 w-9 self-end mr-5 mb-5"
          >
            <IoMdClose className="text-2xl" />
          </div>
          <TableToken columns={subToken} data={availTokenData} />
        </div>
      </div>
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
            onChange={(e) => setCustomToken(e.target.value)}
          />
          <button
            className="bg-purple-950 px-5 py-3 text-white font-semibold rounded-xl w-[40%] mx-auto text-2xl"
            onClick={customTokenHandler}
          >
            Insert
          </button>
        </div>
      </div>

      <div
        className={`absolute mx-auto top-[180px] ${
          !tokenPopup && "hidden"
        } z-10`}
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
              </span>
              Generate Token
            </button>
            <button
              onClick={() => setCustomTokenPopup(true)}
              className="bg-blue-300 px-7 py-3 rounded-xl font-black text-lg shadow-md flex justify-center items-center gap-4"
            >
              <span className="text-2xl bg-blue-400 text-white rounded-2xl p-1">
                <TbLetterSpacing />
              </span>
              Custom Token
            </button>
          </div>
          <button
            className="availableTokens bg-yellow-300 px-7 py-3 rounded-xl font-black text-lg shadow-md flex justify-center items-center gap-4"
            
          >
            <span className="text-xl bg-yellow-400 text-white rounded-2xl p-[5px]">
            <MdLibraryAdd />
            </span>
            Assign Subject <PiArrowFatLinesRightFill /> Teacher
          </button>
          <button
            className="availableTokens bg-green-300 px-7 py-3 rounded-xl font-black text-lg shadow-md flex justify-center items-center gap-4"
            onClick={() => setAvailTokenPopup(true)}
          >
            <span className="text-xl bg-green-400 text-white rounded-2xl p-[5px]">
              <FaKey />
            </span>
            Available Tokens
          </button>
        </div>
        <div className="absolute top-[350px] w-[71vw] mx-auto flex justify-center items-center">
          <Table columns={subColumns} data={teachersData} />
        </div>
      </div>
    </>
  );
}

export default Teachers;
