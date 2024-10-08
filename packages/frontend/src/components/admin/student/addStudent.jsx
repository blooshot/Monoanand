import React, { useEffect, useState } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Loader from "@/components/common/loader";
import StudentForm from "./studentForm";
import { useUpdateStudentMutation } from "@/store/api/studentApi";
import { updateStudentSlice } from "@/store/slices/students";

export default function AddStudent(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matches = useMatches();
  const loc = useLocation();
  const locArr = loc.pathname.split("/");
  const students = useSelector((state) => state.entities.students);
  const [initVal, setInitVal] = useState({});
  const [studID, setStudID] = useState("");

  const [updateStudent, { isLoading, isError, error, isSuccess, data }] =
    useUpdateStudentMutation();

  useEffect(() => {
    if (locArr[locArr.length - 2] === "update" && matches[0]?.params?.id) {
      const currentStudentData = students.filter(
        (student) => student._id === matches[0].params.id
      );

      const initialVal = _.pick(currentStudentData[0], [
        "name",
        "father_name",
        "contact",
        "email",
        "class",
        "gender",
      ]);

      setInitVal({ ...initialVal });
      setStudID(currentStudentData[0]._id);
      // return initialVal;
    }
    if (locArr[locArr.length - 1] === "add") {
      setInitVal({
        name: "kjare",
        father_name: "",
        contact: "",
        email: "",
        class: "",
        gender: "",
      });
      setStudID("");
    }

    /*   if (locArr[locArr.length - 1] !== "add") {
      navigate("/admin/student");
    } */
    if (isSuccess) {
      dispatch(updateStudentSlice(data));
      // console.log("Server:", isLoading, isError, error, isSuccess, data);
    }
    return () => {
      setInitVal({});
      setStudID("");
    };
  }, [loc, isSuccess]);

  /*  const runUpdate = (requestData) => {
    const studentID = matches[0].params?.id;
    console.log("UPadStu", data, studentID, studID);
    // updateStudent();
    // if(isSuccess){
    //   console.log("ServeData" data)
    // }
    // dispatch(updateStudent(data));
  }; */
  const runAdd = (data) => {
    console.log("ADadStu", data);
    // dispatch(updateStudent(data));
  };

  return (
    <>
      {locArr[locArr.length - 2] === "update" ? (
        <h1>Update Student</h1>
      ) : (
        <h1>Add New Student</h1>
      )}

      {locArr[locArr.length - 2] === "update" &&
      Object.keys(initVal).length !== 0 ? (
        <StudentForm
          initVal={initVal}
          update={updateStudent}
          locarr={locArr}
          studentID={matches[0].params?.id}
        />
      ) : locArr[locArr.length - 1] === "add" && initVal.father_name === "" ? (
        <StudentForm
          initVal={initVal}
          add={runAdd}
          locarr={locArr}
          studentID=""
        />
      ) : (
        <Loader />
      )}
    </>
  );
}
