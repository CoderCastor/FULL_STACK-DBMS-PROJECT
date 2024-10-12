import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Admin/Home";
import Navbar from "../components/Navbar";
import Classes from "../pages/Admin/Classes";
import Students from "../pages/Admin/Students";
import Teachers from "../pages/Admin/Teachers";
import Notices from "../pages/Admin/Notices";
import Subjects from "../pages/Admin/Subjects";


function AdminRoutes() {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="classes" element={<Classes/>} />
        <Route path="subjects" element={<Subjects/>} />
        <Route path="students" element={<Students/>} />
        <Route path="teachers" element={<Teachers/>} />
        <Route path="notices" element={<Notices/>} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
