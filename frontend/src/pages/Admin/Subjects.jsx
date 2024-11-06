import React, { useContext, useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { IoMdClose } from "react-icons/io";
import Table from "../../components/Table";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import DeletePopup from "../../components/DeletePopup";

function Subjects() {
  const [popup, setPopup] = useState(false);
  const UserState = useContext(UserContext);
  //Handling Frontend
  const [data, setData] = useState([]);
  const [deleted,setDeleted] = useState(false)
  const [formData, setFormData] = useState({
    sub_name: '',
    sub_code: '',
    sessions: '',
    user_id:UserState.userInfo.user_id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAdd = async() => {
    console.log(formData); // You can now send this data to your backend or handle it as needed
    
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/add-subject",
        formData
      );
      if(response.data.added){
        setPopup(false)
      };
      
    } catch (err) {
      console.log(err);
    }
    
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/admin/subjects"
        );
        setData(
          response.data.map((item) => ({
            sub_id:item.sub_id,
            sub_name: item.sub_name,
            sub_code: item.sub_code,
            sessions: item.sessions, // Convert sessions to string to match the original format
          }))
        );
        
        
      } catch (err) {
        console.log(err);
      }
    };

    getData();
    setDeleted(false);
  }, [popup,deleted]);

  const subColumns = [
    { header: "Subject Name", field: "sub_name" },
    { header: "Subject Code", field: "sub_code" },
    { header: "Total Sessions", field: "sessions" },
  ];

  //view and delete
  const onView = (index) =>{
    console.log(index);
    
  }

  const onDelete = async(row) =>{
    console.log();
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/delete-subject",
        {id:row.sub_id}
      );
      console.log(response.data.DELETED);
      if(response.data.DELETED){
        setDeleted(true);
      }
      
      
    } catch (err) {
      console.log(err);
    }
    
  }

  const deletion =(bool)=>{
    
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      {/* <DeletePopup deletion={deletion}/> */}
      <div
        className={`popupAddClass h-[400px] w-[600px] bg-zinc-200 absolute top-[200px] px-4 py-8 ${
          !popup && "hidden"
        } flex flex-col justify-between border-2 border-purple-250 rounded-2xl shadow-2xl z-10`}
      >
        <div className="w-full flex justify-between items-center px-8 rounded-md">
          <h3 className="flex justify-center items-center text-white text-2xl font-semibold gap-5 py-2 bg-purple-800 px-10 rounded-2xl">
            {" "}
            <span className="text-2xl">
              <FaBook />
            </span>{" "}
            Add Subject
          </h3>
          <div
            onClick={() => setPopup(false)}
            className="close flex justify-center items-center bg-white rounded-full h-9 w-9"
          >
            <IoMdClose className="text-2xl" />
          </div>
        </div>
        <input
        type="text"
        name="sub_name"
        placeholder="Subject name"
        value={formData.sub_name}
        onChange={handleChange}
        className="px-4 py-3 w-[80%] mx-auto outline-none rounded-xl font-semibold text-xl"
      />
      <input
        type="text"
        name="sub_code"
        placeholder="Subject code"
        value={formData.sub_code}
        onChange={handleChange}
        className="px-4 py-3 w-[80%] mx-auto outline-none rounded-xl font-semibold text-xl"
      />
      <input
        type="text"
        name="sessions"
        placeholder="Sessions"
        value={formData.sessions}
        onChange={handleChange}
        className="px-4 py-3 w-[80%] mx-auto outline-none rounded-xl font-semibold text-xl"
      />
      <button
        onClick={handleAdd}
        className="bg-purple-950 px-5 py-3 text-white font-semibold rounded-xl w-[40%] mx-auto text-2xl"
      >
        Add
      </button>
      </div>
      <div
        onClick={() => setPopup(true)}
        className="addclass flex justify-end w-full px-20 py-4"
      >
        <button className="bg-blue-900 px-20 py-3 text-2xl shadow-2xl text-white font-semibold rounded-xl mx-">
          ADD SUBJECT
        </button>
      </div>

      {data && data.length > 0 ? (
        <Table columns={subColumns} data={data} onView={onView} onDelete={onDelete} />
      ) : (
        <div className="text-center text-xl">Loading data...</div>
      )}
    </div>
  );
}

export default Subjects;
