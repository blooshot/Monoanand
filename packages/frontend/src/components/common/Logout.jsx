import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/store/api/userApi";
import { logout } from "@/store/slices/userSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());

    navigate("/login");
  }, []);
  dispatch(logout());
  return <div>logout</div>;
}

export default Logout;
