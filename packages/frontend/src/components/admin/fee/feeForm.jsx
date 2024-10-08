import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object({
  submitted_date: Yup.date()
    .required("Submitted date is required")
    .typeError("Please enter a valid date"),
  from: Yup.date()
    .required("Start date is required")
    .min(Yup.ref("submitted_date"), "From date cannot be before submitted date")
    .typeError("Please enter a valid date"),
  to: Yup.date()
    .required("End date is required")
    .min(Yup.ref("from"), "End date cannot be before start date")
    .typeError("Please enter a valid date"),
  amount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be at least 1")
    .typeError("Please enter a valid number"),
});

const FeeForm = () => {
  return (
    <Formik
      initialValues={{
        submitted_date: new Date("2024-11-09"),
        from: new Date("2024-11-10"),
        to: new Date("2024-12-10"),
        amount: 2000,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div>
            <label>Submitted Date:</label>
            <DatePicker
              selected={values.submitted_date}
              onChange={(date) => setFieldValue("submitted_date", date)}
              dateFormat="yyyy-MM-dd"
            />
            <ErrorMessage
              name="submitted_date"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label>From:</label>
            <DatePicker
              selected={values.from}
              onChange={(date) => setFieldValue("from", date)}
              dateFormat="yyyy-MM-dd"
            />
            <ErrorMessage name="from" component="div" className="error" />
          </div>

          <div>
            <label>To:</label>
            <DatePicker
              selected={values.to}
              onChange={(date) => setFieldValue("to", date)}
              dateFormat="yyyy-MM-dd"
            />
            <ErrorMessage name="to" component="div" className="error" />
          </div>

          <div>
            <label>Amount:</label>
            <Field type="number" name="amount" />
            <ErrorMessage name="amount" component="div" className="error" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FeeForm;
