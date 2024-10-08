import { React, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyCheckbox, MySelect, MyTextInput } from "../common/genericFields";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "../common/loader";
// import { login, getCurrentUser } from "@/services/authService";
import { useNavigate, redirect } from "react-router-dom";
import { useLoginUserMutation } from "@/store/api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "@/store/slices/userSlice";

export default function Login() {
  // const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const userSlice = useSelector((state) => state.entities.user);
  const dispatch = useDispatch();

  const [login, { isLoading, isError, error, isSuccess, data }] =
    useLoginUserMutation();

  // const [loggedIn, setLoggedIn] = useState(false);

  if (userSlice && userSlice?.token && userSlice?.userData) {
    console.log(`Admin ${userSlice}`);
    userSlice.userData.admin
      ? navigate("/admin", { replace: true })
      : navigate("/admin/student", { replace: true }); //replace: true
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log("de:", error);
    // return null;
  }

  // console.log(`isSuccess: ${isSuccess}, data:${data}`);
  // if (isSuccess) {
  //   localStorage.setItem("token", data);
  //   dispatch(setToken(data));
  // }

  /*   useEffect(() => {
    if (userSlice && userSlice?.token && userSlice?.userData) {
      console.log(`Admin ${userSlice}`);
      userSlice.userData.admin
        ? navigate("/admin", { replace: true })
        : navigate("/admin/student", { replace: true }); //replace: true

      return null;
    }
  }, [loggedIn]); */

  return (
    /* userSlice && userSlice?.token && userSlice?.userData
    console.log(`Admin ${userSlice}`);
    userSlice.userData.admin ? navigate("/admin") : navigate("/admin/student"); //replace: true
  } */
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, "Must be 15 characters or less")
            .min(5, "Must be 5 characters or more")
            .required("Required"),
          password: Yup.string()
            .min(5, "Must be 5 characters or more")
            .max(30, "Must be 20 characters or less")
            .matches(/[\w\@\!\#\.]+/)
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          login(values).then((res) => {
            // console.log("the res", );
            if (!res.error) {
              localStorage.setItem("token", res.data);
              dispatch(setToken(res.data));
              // setLoggedIn(true);
            }
          });
          setSubmitting(false);
        }}
      >
        <Form>
          <Card>
            <CardHeader>
              <CardTitle>Login To Account</CardTitle>
            </CardHeader>
            <CardContent>
              <MyTextInput
                label="Email ID"
                name="email"
                type="text"
                placeholder="Enter your email ID"
              />

              <MyTextInput
                label="Password"
                name="password"
                type="text"
                placeholder="Enter Password"
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Log me In</Button>
              {/* <Loader /> */}
            </CardFooter>
          </Card>
        </Form>
      </Formik>
    </>
  );
}
