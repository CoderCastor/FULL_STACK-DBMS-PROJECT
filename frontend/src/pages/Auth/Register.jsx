import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../components/Loading";

function Register() {
  //Context
  const UserState = useContext(UserContext);
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    role: `${UserState.user}`,
  });
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [allInputs, setAllInputs] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTokenValid(true)
    
  };
  
  
  //check if username exists
  useEffect(() => {
    if (formData.username) {
      axios
        .get(`http://localhost:8000/register/check-username`, {
          params: { username: formData.username, role: formData.role },
        })
        .then((res) => {
          setUsernameExists(res.data.exists);
        })
        .catch((err) => console.error(err));
    }
  }, [formData.username, formData.role]);
  useEffect(() => {
    if (formData.email) {
      axios
        .get(`http://localhost:8000/register/check-email`, {
          params: { email: formData.email, role: formData.role },
        })
        .then((res) => {
          setEmailExists(res.data.exists);
        })
        .catch((err) => console.error(err));
    }
  }, [formData.email, formData.role]);

  //all fields checkers
  const emailValidation = () => {
    const atIndex = formData.email.indexOf("@");
    return atIndex > 0;
  };

  //form validation
  const checkAllFields = (e) => {
    e.preventDefault();

    if (
      formData.first_name !== "" &&
      formData.last_name !== "" &&
      formData.username !== "" &&
      formData.email.includes("@") &&
      emailValidation() &&
      formData.password !== "" &&
      formData.college_name !== "" &&
      formData.college_id !== "" &&
      formData.token !== ""
    ) {
      setAllInputs(true);
      if (!emailExists && !usernameExists) {
        //after successfull validation sending request
        console.log("working");
        
        switch (UserState.user) {
          case "admin":
            submitHandler();
            break;

          case "teacher":
            if (formData.token) {
              axios
                .get(`http://localhost:8000/register/check-token`, {
                  params: { token: formData.token, role: formData.role },
                })
                .then((res) => {
                  setTokenValid(res.data.exists);
                  if(res.data.exists){
                    submitHandler();                   
                  }
                })
                .catch((err) => console.error(err));
            }
            break;

            case "student":
            if (formData.token) {
              axios
                .get(`http://localhost:8000/register/check-tokenstd`, {
                  params: { token: formData.token, role: formData.role },
                })
                .then((res) => {
                  setTokenValid(res.data.exists);
                  console.log(res.data);
                  
                  if(res.data.exists){
                    submitHandler();                   
                  }
                })
                .catch((err) => console.error(err));
            }
            break;
        }
      }
    } else {
      setAllInputs(false);
    }
  };

  const submitHandler = async () => {
    switch(UserState.user){
      case 'admin':
        try {
          console.log(formData);
          const response = await axios.post(
            "http://localhost:8000/register/new-admin",
            formData
          );
          console.log(response.data);
          setShowLoading(true);
          loginNavigator();
        } catch (err) {
          console.log(err);
        }
        break

      case 'teacher':
        try {
          console.log(formData);
          const response = await axios.post(
            "http://localhost:8000/register/new-teacher",
            formData
          );
          console.log(response.data);
          setShowLoading(true);
          loginNavigator();
        } catch (err) {
          console.log(err);
        }
        break

        case 'student':
          try {
            console.log(formData);
            const response = await axios.post(
              "http://localhost:8000/register/new-student",
              formData
            );
            console.log(response.data);
            setShowLoading(true);
            loginNavigator();
          } catch (err) {
            console.log(err);
          }
          break
        
    }
  };

  //loginNavigator
  const loginNavigator = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  //context usecase
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
      <div className={`w-full h-full absolute ${showLoading ? "" : "hidden"}`}>
        <Loading data={{ msg: `Admin Created Successfully` }} />
      </div>
      <form
        action=""
        className="bg-white rounded-lg w-[90%] lg:w-[600px] flex flex-col items-center gap-6 p-10 relative pb-14 overflow-x-hidden"
      >
        <h1 className="text-5xl font-extrabold text-blue-700 text-center">
          Register
        </h1>
        <div className="flex justify-between gap-6 pl-1 lg:pl-0 lg:gap-8">
          <input
            className="px-2 py-2 rounded-md w-[44%] lg:w-[10vw] bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
            placeholder="First Name"
            type="text"
            name="first_name"
            onChange={changeHandler}
            required
          />
          <input
            className="px-2 py-2 rounded-md w-[44%] lg:w-[10vw] bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="w-[96%] lg:w-4/5 relative">
          <input
            className={`px-2 py-2 rounded-md h-[100%] w-[100%] bg-transparent ${
              usernameExists ? "border-red-500" : "border-blue-500"
            } border-b-2 placeholder:text-black focus:outline-none caret-blue-500`}
            placeholder="Username"
            type="text"
            name="username"
            onChange={changeHandler}
            required
          />
          <span
            className={`text-sm font-black text-red-500 absolute bottom-0 left-2 translate-y-6 ${
              !usernameExists && "hidden"
            }`}
          >
            Username already exist !
          </span>
        </div>
        <div className="w-[96%] lg:w-4/5 relative">
          <input
            className={`px-2 py-2 rounded-md h-[100%] w-[100%] bg-transparent ${
              emailExists ? "border-red-500" : "border-blue-500"
            } border-b-2 placeholder:text-black focus:outline-none caret-blue-500`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            required
          />
          <span
            className={`text-sm font-black text-red-500 absolute bottom-0 left-2 translate-y-6 ${
              !emailExists && "hidden"
            }`}
          >
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
                <div className="w-[96%] lg:w-4/5 relative">
                  <input
                    className={`px-2 py-2 rounded-md w-[100%] bg-transparent ${tokenValid ? "border-blue-500" : "border-red-500"} border-b-2 placeholder:text-black focus:outline-none caret-blue-500`}
                    type="text"
                    name="token"
                    placeholder="Admin Token"
                    onChange={changeHandler}
                    required
                  />
                  <span
                    className={`text-sm font-black text-red-500 absolute left-2 -bottom-6 ${tokenValid && "hidden"}`}
                  >
                    Invalid Token !
                  </span>
                </div>
              );

            case "student":
              return (
                <div className="w-[96%] lg:w-4/5 relative">
                <input
                  className="px-2 py-2 rounded-md w-[96%] lg:w-4/5 bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
                  type="text"
                  name="token"
                  placeholder="Student Token"
                  onChange={changeHandler}
                  required
                />
                <span
                    className={`text-sm font-black text-red-500 absolute left-2 -bottom-6 ${tokenValid && "hidden"}`}
                  >
                    Invalid Token !
                  </span>
                </div>
              );
          }
        })()}
        <button
          type="submit"
          onClick={checkAllFields}
          className={`bg-blue-800 border-2 text-2xl font-semibold text-white w-2/4 px-4 py-4 rounded-2xl relative mt-6 overflow-hidden ${
            emailExists || usernameExists
              ? "bg-blue-950 border-2 border-red-500 transition-all duration-1000"
              : ""
          } `}
        >
          Submit
          <span
            className={`ml-2 ${
              emailExists || usernameExists ? "text-red-600" : "opacity-0"
            }`}
          >
            !
          </span>
          <div
            className={`letsJoin absolute bg-blue-800 h-full w-full  items-center justify-center top-0 left-0 rounded-2xl ${
              emailExists || usernameExists ? "hidden" : "flex"
            }`}
          >
            Let's Join
          </div>
        </button>
        <p className="absolute bottom-4 text-xl font-semibold">
          Already have an account ?
          <Link to="/login" className="text-red-600 font-black">
            Login
          </Link>
        </p>

        <p
          className={`text-md font-black text-red-500 absolute bottom-[135px] drop-shadow-2xl ${
            allInputs ? "hidden" : ""
          }`}
        >
          fill all fields with valid input !
        </p>
      </form>
    </div>
  );
}

export default Register;
