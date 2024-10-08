import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
// import Todo from "../components/custom/Todo.jsx";
// import UserForm from "../components/custom/UserForm.jsx";
import App from "../App";
import Todo from "./custom/Todo";
import Login from "../components/custom/Login";
import ErrorPage from "../components/common/error-page.jsx";
import Logout from "../components/common/Logout.jsx";
import AdminLayout from "./common/adminLayout.jsx";
import AdminDashboard from "./admin/adminDashboard";
import Student from "./admin/student/student.jsx";
import AddStudent from "./admin/student/addStudent.jsx";
import ManageFee from "./admin/fee/manageFee";
import AllStudents from "./admin/student/allStudents";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<App />}
      path="/"
      /* loader={async ({ params }) => {
              return fetch(
                `/fake/api/teams/${params.teamId}.json`
              );
            }}
            action={async ({ request }) => {
              return updateFakeTeam(await request.formData());
            }}
            errorElement={<ErrorBoundary />} */
    >
      <Route path="/" element={<Todo />}></Route>
      <Route element={<AdminLayout />} path="/admin">
        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/admin/student" element={<Student />}>
          <Route path="/admin/student/all" element={<AllStudents />}></Route>
          <Route path="/admin/student/add" element={<AddStudent />}></Route>
          <Route
            path="/admin/student/update/:id"
            element={<AddStudent />}
          ></Route>
        </Route>
        <Route path="/admin/fee" element={<ManageFee />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="*" Component={ErrorPage} />
    </Route>
  )
);
