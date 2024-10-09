import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { UserContext } from "../../context/UserContext";
import { useNavigate,Link } from "react-router-dom";

function Register() {
  



  const [userData, setUserData] = useState({
    username: "",
    password: "",
    
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(userData);

      const response = await axios.post(
        "http://localhost:8000/register",
        userData
      );
      console.log(response.data);
    } catch (err) {
      log.error(err);
    }
  };

  //Context
  const UserState = useContext(UserContext)

  const navigate = useNavigate();

  console.log(UserState.user);

  useEffect(()=>{
    if(UserState.user===undefined)
      {
        navigate('/')
      }
  },[])
  

  if(UserState.user===undefined)
  {
    navigate('/')
  }

  return (
    <div className="bg-blue-950 h-screen w-screen flex justify-center items-center relative">
      <h1 className="absolute top-[150px] px-2 py-2 bg-white rounded-2xl font-semibold">Hello <span className="text-red-500">{UserState.user}</span></h1>
      <form
        action=""
        className="bg-white rounded-lg w-[90%] lg:w-[600px] flex flex-col items-center gap-10 p-10 relative pb-14"
      >
        <h1 className="text-5xl font-extrabold text-blue-700 text-center" >
          Register
        </h1>
        <input
          className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
          placeholder="Enter your username or email"
          type="text"
          name="username"
          onChange={changeHandler}
          required
        />
        <input
          className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
          type="text"
          name="password"
          placeholder="Enter password Here"
          onChange={changeHandler}
          required
        />
        <input
          className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
          placeholder="Enter your username or email"
          type="text"
          name="username"
          onChange={changeHandler}
          required
        />
        <input
          className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
          type="text"
          name="password"
          placeholder="Enter password Here"
          onChange={changeHandler}
          required
        />
        <button
        type="submit"
          onClick={submitHandler}
          className="bg-blue-800 text-2xl font-semibold text-white w-2/4 px-4 py-4 rounded-lg"
        >
          Submit
        </button>
        <p className="absolute bottom-4 text-xl font-semibold">Already have an account ? <Link to="/login" className="text-red-600 font-black">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;
