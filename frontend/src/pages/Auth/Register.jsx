import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  useGSAP(() => {
    gsap.from(".letsJoin", {
      x: -300,
      duration: 2,
      ease: "power1.out",
    });

    gsap.to(".letsJoin", {
      x: 300,
      delay: 2.5,
      duration: 2,
      ease: "power3.out",
    });
  });

  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState(true);
  const [email, setEmail] = useState(true);


  //Email and username Error Existence
  useEffect(()=>{
    
    const fetchUsername = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/user/username/${userData.username}`)
        if(response.data)
          setUsername(false)
        
          
      }catch(err){
        console.error(err);
        
      }
    }

    // const fetchEmail = async () => {
    //   try{
    //     const response = await axios.get(`http://localhost:3000/user/email/${userData.email}`)
    //     if(response.data)
    //       setEmail(false)
    //   }catch(err){
    //     console.error(err);
        
    //   }
    // }

    if(userData.username !== undefined){
      fetchUsername()
    }

    // if(userData.email !== undefined){
    //   fetchEmail()
    // }

  },[userData.username,userData.email])

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (userData.username !== undefined || userData.email !== undefined) {
      setUsername(userData.username);
      setEmail(userData.email);
    }

    console.log(username, email);
  };

  const submitHandler = async (e) => {

    // e.preventDefault();

    // try {
    //   console.log(userData);

    //   const response = await axios.post(
    //     "http://localhost:8000/register",
    //     userData
    //   );
    //   console.log(response.data);
    // } catch (err) {
    //   log.error(err);
    // }
  };


  //Context
  const UserState = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (UserState.user === undefined) {
      navigate("/");
    }
  }, []);

  if (UserState.user === undefined) {
    navigate("/");
  }

  return (
    <div className="bg-blue-950 h-screen w-screen flex justify-center items-center relative">
      <form
        action=""
        className="bg-white rounded-lg w-[90%] lg:w-[600px] flex flex-col items-center gap-6 p-10 relative pb-14"
      >
        <h1 className="text-5xl font-extrabold text-blue-700 text-center">
          Register
        </h1>
        <input
          className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
          placeholder="First Name"
          type="text"
          name="first_name"
          onChange={changeHandler}
          required
        />
        <input
          className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={changeHandler}
          required
        />
        <div className="w-[96%] lg:w-4/5 relative">
          <input
            className="px-2 py-2 rounded-md h-[100%] w-[100%] bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
            placeholder="Username"
            type="text"
            name="username"
            onChange={changeHandler}
            required
          />
          <span className={`text-sm font-black text-red-500 absolute bottom-0 left-2 translate-y-6 ${username && "hidden"}`}>
            Username already exist !
          </span>
        </div>
        <div className="w-[96%] lg:w-4/5 relative">
          <input
            className="px-2 py-2 rounded-md h-[100%] w-[100%] bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
            type="email"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            required
          />
          <span className={`text-sm font-black text-red-500 absolute bottom-0 left-2 translate-y-6 ${email && "hidden"}`}>
            Email already exist !
          </span>
        </div>
        <input
          className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeHandler}
          required
        />
        {(() => {
          switch (UserState.user) {
            case "admin":
              return (
                <>
                  <input
                    className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
                    type="text"
                    name="college_name"
                    placeholder="College Name"
                    onChange={changeHandler}
                    required
                  />
                  <input
                    className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
                    type="text"
                    name="college_id"
                    placeholder="College ID"
                    onChange={changeHandler}
                    required
                  />
                </>
              );

            case "teacher":
              return (
                <input
                  className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
                  type="text"
                  name="admin_token"
                  placeholder="Admin Token"
                  onChange={changeHandler}
                  required
                />
              );

            case "student":
              return (
                <input
                  className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
                  type="text"
                  name="STD ID"
                  placeholder="student_id"
                  onChange={changeHandler}
                  required
                />
              );
          }
        })()}
        <button
          type="submit"
          onClick={submitHandler}
          className="bg-blue-800 text-2xl font-semibold text-white w-2/4 px-4 py-4 rounded-lg relative overflow-hidden"
        >
          Submit
          <div className="letsJoin absolute bg-blue-800 h-full w-full  items-center justify-center top-0 left-0 rounded-lg flex">
            Let's Join
          </div>
        </button>
        <p className="absolute bottom-4 text-xl font-semibold">
          Already have an account ?{" "}
          <Link to="/login" className="text-red-600 font-black">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
