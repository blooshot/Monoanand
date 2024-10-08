import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useField } from "formik";
import { Select, Option } from "@material-tailwind/react";
import { toast } from "react-toastify";

export const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <Input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  //   console.log("In>>", field, meta);
  return (
    <div className="m-2">
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input className="" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error flex justify-center">
          <X size={32} color="#f00000" strokeWidth={3} />
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <Label className="checkbox-input">
        <Input type="checkbox" {...field} {...props} />
        {children}
      </Label>
      {meta.touched && meta.error ? (
        <div className="error flex justify-center">
          <X size={32} color="#f00000" strokeWidth={3} />
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export const MySelect = ({ label, klass, options, ...props }) => {
  const [field, meta] = useField(props);
  //   console.log("SE>>", field, meta);
  //   console.log("p<", children);
  return (
    <div className={`${klass} m-2`}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <div>
        <select
          {...field}
          className="w-80 appearance-none bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-1"
        >
          {options.map((op) => (
            <option key={op.id || op.name} value={op.value} className="">
              {op.name}
            </option>
          ))}
        </select>
      </div>

      {meta.touched && meta.error ? (
        <div className="error flex justify-center">
          <X size={32} color="#f00000" strokeWidth={3} />
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export const MyRadio = ({ label, options, ...props }) => {
  const [field, meta] = useField({ ...props, type: "radio" });
  const numOfCols = options.length;
  // console.log(field);
  return (
    <div className="m-2">
      <Label htmlFor={props?.id || props?.name}>{label}</Label>
      <div
        className={`grid sm:grid-cols-${numOfCols} gap-${numOfCols} form-group`}
      >
        {options.map((op) => (
          <label
            key={op}
            htmlFor={op}
            className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
          >
            <input
              label={op}
              type="radio"
              className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              /*   id={op.toLowerCase()}
              name={props.name}*/
              {...field}
              value={op.toLowerCase()}
            />

            <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
              {op.toUpperCase()}
            </span>
          </label>
        ))}
      </div>

      {meta.touched && meta.error ? (
        <div className="error flex justify-center">
          <X size={32} color="#f00000" strokeWidth={3} />
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export const GptRadio = (props) => {
  // this will return field props for an <input />
  // const [field, meta] = useField({ ...props, type: "radio" });
  const [field, meta] = useField(props.name);
  // console.log(meta);
  return (
    <>
      {/*  <label htmlFor={props.name}>{props.label}</label>
      <input {...field} {...props} /> */}
      <label
        htmlFor={props.name}
        className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
      >
        <input
          className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
          type="radio"
          {...field}
          {...props}
        />

        <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
          {props.label}
        </span>
      </label>

      {meta.touched && meta.error ? (
        <div className="error flex justify-center">
          <X size={32} color="#f00000" strokeWidth={3} />
          {meta.error}
        </div>
      ) : null}
      {/* {meta.error && meta.touched && <div className="error">{meta.error}</div>} */}
      {/* {errors.gender && touched.gender && (
        <div className="error">{errors.gender}</div>
      )} */}
    </>
  );
};

export const FileUpload = (props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <>
      <input {...field} {...props} type="file" />
      {meta.touched && meta.error ? (
        <div className="error flex justify-center">
          <X size={32} color="#f00000" strokeWidth={3} />
          {meta.error}
        </div>
      ) : null}
    </>
  );
};
