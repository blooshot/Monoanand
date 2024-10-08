import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, redirect } from "react-router-dom";
import MySideBar from "../admin/sidebar";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const userSlice = useSelector((state) => state.entities.user);

  /*   useEffect(() => {
    if (userSlice.userData != null && userSlice.userData?.admin) {
      console.log("admin hu main");
    } else {
      navigate("/login");
    }
  }, []); */

  return (
    <div className="">
      <MySideBar />
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
}
