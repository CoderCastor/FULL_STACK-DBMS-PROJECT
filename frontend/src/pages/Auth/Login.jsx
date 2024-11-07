import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../components/Loading";

function Login() {
  //Context
  const UserState = useContext(UserContext);
  const navigate = useNavigate();

  const [userNotFound, setUserNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [validInputField, setValidInputField] = useState(false);
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: `${UserState.user}`,
  });

  //valid fields handler
  useEffect(() => {
    setValidInputField(false);
    setUserNotFound(false);
    setWrongPassword(false)
  }, [formData.username, formData.password]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validInputFields = (e) => {
    e.preventDefault();
    console.log("working");

    if (formData.username === "" || formData.password === "") {
      setValidInputField(true);
    } else {
      submitHandler();
    }
  };

  const submitHandler = async () => {

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      if(!response.data.userExists){
        setUserNotFound(true)
      }else{
        try{
          const response = await axios.post(
            "http://localhost:8000/login/check-password",
            formData
          );
          if(!response.data.isCorrect){
            setWrongPassword(true);
          }
          if(response.data.isCorrect){
            UserState.setUserInfo(response.data.result[0])
            setLoading(true);
            setTimeout(()=>{
              switch (UserState.user) {
                case "admin":
                  console.log(response.data.result[0]);
                  break;

                  case "teacher":
                  console.log(response.data.result[0]);
                  break;
              
                  case "student":
                    console.log("Im Student");
                    console.log(response.data.result[0]);
                    break;    

                default:
                  break;
              }
              
              navigate('/admin/dashboard/home')
              
            },2000)
          }
          
        }catch(err){
          console.log(err);
        }
      }
      
    } catch (err) {
      console.log(err);
    }
  };

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
      <h1 className="absolute top-[150px] px-2 py-2 bg-white rounded-2xl font-semibold">
        Hello <span className="text-red-500">{UserState.user}</span>
      </h1>
      <div className={`w-full h-full absolute ${loading ? "":"hidden"}`} >
      <Loading data={{msg: `Admin Authorized Successfully`}} />
      </div>
      <form
        action=""
        className="bg-white rounded-lg w-[90%] lg:w-[600px] flex flex-col items-center gap-10 p-10 relative pb-14"
      >
        <h1 className="text-5xl font-extrabold text-blue-700 text-center">
          Login
        </h1>
        <div className="w-[96%] lg:w-4/5">
          <input
            className="px-2 py-2 w-[100%] rounded-md bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
            placeholder="Enter your username or email"
            type="text"
            name="username"
            onChange={changeHandler}
          />
          <span
            className={`text-md font-black text-red-500 absolute bottom-[240px] left-12 lg:left-[98px] w-[80%] ${
              !userNotFound && "hidden"
            }`}
          >
            Invalid username or email !
          </span>
        </div>
        <div className="w-[96%] lg:w-4/5">
          <input
            className="px-2 py-2 rounded-md w-[100%] bg-transparent border-blue-500 border-b-2 placeholder:text-black focus:outline-none caret-blue-500"
            type="text"
            name="password"
            placeholder="Enter password Here"
            onChange={changeHandler}
          />
          <span
            className={`text-md font-black text-red-500 absolute bottom-[158px] left-12 lg:left-[98px] w-[80%] ${
              !wrongPassword && "hidden"
            }`}
          >
            Wrong password !
          </span>
        </div>
        <button
          onClick={validInputFields}
          className="bg-blue-800 text-2xl font-semibold text-white w-2/4 px-4 py-4 rounded-lg mt-6"
        >
          Submit
        </button>
        <p className="absolute bottom-4 text-xl font-semibold">
          New user ?
          <Link to="/register" className="text-red-600 font-black">
            Register
          </Link>
        </p>
        <p
          className={`text-md font-black text-red-500 absolute bottom-[130px] drop-shadow-2xl ${
            validInputField ? "" : "hidden"
          }`}
        >
          Fill all fields with valid input
        </p>
      </form>
    </div>
  );
}

export default Login;
