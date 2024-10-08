import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IndianRupee } from "lucide-react";
import moment from "moment";
import Student from "../student/student";
import _ from "lodash";
import romanize from "romanize";
import { Link } from "react-router-dom";

export default function TableBody({ data }) {
  const currentMonth = moment().format("MMMM"); //moment().month() + 1; // Add 1 as JavaScript months start from 0
  const currentYear = moment().year();
  return (
    <tbody>
      {data.map((student, index) => (
        <tr
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          key={index}
        >
          {/*    <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td> */}
          <th
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ps-3">
              <div className="text-base font-semibold">
                {_.capitalize(student.name)}
              </div>
              <div className="font-normal text-gray-500">
                Gaurdian: {_.capitalize(student.father_name)}
              </div>
            </div>
          </th>
          <td className="px-6 py-4">{romanize(student.class)}</td>
          <td className="px-6 py-4">
            {student?.feeStatus && student?.feeStatus == "submit" ? (
              <div className="flex items-center">
                <span
                  className={`h-2.5 w-2.5 rounded-full  bg-green-500 me-2`}
                ></span>{" "}
                Paid {`${currentMonth.substring(0, 4)}.  ${currentYear}`}
              </div>
            ) : (
              <div className="flex items-center">
                <span
                  className={`h-2.5 w-2.5 rounded-full  bg-red-500 me-2`}
                ></span>{" "}
                Pending {`${currentMonth.substring(0, 4)}.  ${currentYear}`}
              </div>
            )}
          </td>
          <td className="px-6 py-4 flex items-center">
            <IndianRupee size="16" strokeWidth="2.5" />{" "}
            <span>{student?.fee_amount ? student.fee_amount : `-`}</span>
          </td>
          <td className="px-6 py-4">
            <Link
              to={`/admin/student/update/${student._id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit user
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
