import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyCheckbox, MySelect, MyTextInput } from "../common/genericFields";
import { Button } from "../ui/button";

// And now we can use these
const UserForm = () => {
  const ops = [
    { id: 1, name: "Designer", value: "designer" },
    { id: 2, name: "Tech Lead", value: "techlead" },
    { id: 3, name: "Product  ManagerManagerManager", value: "product" },
    { id: 4, name: "Developer", value: "development" },
  ];

  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          acceptedTerms: false, // added for our checkbox
          jobType: "", // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          jobType: Yup.string()
            .oneOf(
              //   ["designer", "development", "product", "other", "developer"],
              [ops[0].value, ops[1].value, ops[2].value, ops[3].value],
              "Invalid Job Type"
            )
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          //   alert(JSON.stringify(values, null, 2));
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MySelect
            options={ops}
            label="Job Type"
            name="jobType"
            klass="w-[200px]"
          />

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </>
  );
};

export default UserForm;
