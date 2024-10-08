import React from "react";
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

export default function Login() {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .min(5, "Must be 5 characters or more")
            .required("Required"),
          email: Yup.string()
            .email()
            .max(15, "Must be 15 characters or less")
            .min(5, "Must be 5 characters or more")
            .required("Required"),
          password: Yup.string()
            .min(5, "Must be 5 characters or more")
            .max(10, "Must be 20 characters or less")
            .matches(/[\w\@\!\#\.]+/)
            .required("Required"),
          abortEarly: false,
        })}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          /*  setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400); */
        }}
      >
        <Form>
          <Card>
            <CardHeader>
              <CardTitle>Login To Account</CardTitle>
            </CardHeader>
            <CardContent>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Name"
              />
              <MyTextInput
                label="Email Id"
                name="email"
                type="email"
                placeholder="email Id"
              />

              <MyTextInput
                label="Password"
                name="password"
                type="text"
                placeholder="Password"
              />
            </CardContent>
            <CardFooter>
              1<Button type="submit">Register Me!</Button>
              {/* <Loader /> */}
            </CardFooter>
          </Card>
        </Form>
      </Formik>
    </>
  );
}
