import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  MyRadio,
  MySelect,
  MyTextInput,
  GptRadio,
  FileUpload,
} from "../../common/genericFields";
import { Button } from "../../ui/button";
import { Label } from "@/components/ui/label";

export default function StudentForm({
  initVal,
  update,
  add,
  locarr,
  studentID,
}) {
  const classArr = [
    { name: "First", value: 1 },
    { name: "Second", value: 2 },
    { name: "Third", value: 3 },
    { name: "Fourth", value: 4 },
    { name: "Fifth", value: 5 },
    { name: "Sixth", value: 6 },
    { name: "Seventh", value: 7 },
    { name: "Eighth", value: 8 },
    { name: "Ninth", value: 9 },
    { name: "Tenth", value: 10 },
  ];

  return (
    <Formik
      initialValues={initVal}
      validationSchema={Yup.object({
        name: Yup.string().min(5).max(30).required("Student Name is required"),
        father_name: Yup.string()
          .min(5)
          .max(30)
          .required("Father's name is mandatory"),
        contact: Yup.string()
          .min(5)
          .max(20)
          .required("Contact number is Required"),
        email: Yup.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
          .min(10)
          .max(255)
          .required("Email is required"),
        class: Yup.string().required("Please select class"),
        gender: Yup.string()
          .required("Please select gender")
          .oneOf(["male", "female"], "only male or female is allowed"),
        // img: Yup.mixed()
        //   .required("Image is required")
        //   .test("fileFormat", "Invalid file format", (value) => {
        //     console.log("img:", value);
        //     if (!value) return true; // No file selected
        //     const fileTypes = [".jpeg", ".png", ".gif"];
        //     return fileTypes.includes(value.type);
        //   }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // alert(JSON.stringify(values, null, 2));
        if (locarr[locarr.length - 2] === "update") {
          // console.log("update");
          update({ data: values, param: studentID });
        }
        if (locarr[locarr.length - 1] === "add") {
          console.log("Add");
          add(values);
        }
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      <Form>
        <MyTextInput
          label="Student Name"
          name="name"
          type="text"
          placeholder="Jane"
        />

        {/* <MyRadio label="Gender" name="gender" options={gender} /> */}

        <div className="m-2">
          <Label htmlFor="gender">Select Gender</Label>
          <div className={`grid sm:grid-cols-2 gap-2 form-group`}>
            <GptRadio
              name="gender"
              value="male"
              label="Male"
              // checked={
              //   initVal?.gender && initVal.gender === "male" ? "checked" : null
              // }
            />
            <GptRadio
              name="gender"
              value="female"
              label="Female"
              // checked={
              //   initVal?.gender && initVal.gender === "female"
              //     ? "checked"
              //     : null
              // }
            />
          </div>
        </div>

        <MySelect
          options={classArr}
          label="Select Class"
          name="class"
          klass=""
        />

        <MyTextInput
          label="Father's Name"
          name="father_name"
          type="text"
          placeholder="Doe"
        />

        <MyTextInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@formik.com"
        />

        <MyTextInput
          label="Contact Number"
          name="contact"
          type="contact"
          required
          placeholder="+91 798451279"
        />
        {/* <FileUpload name="img" label="Upload File" /> */}

        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}
