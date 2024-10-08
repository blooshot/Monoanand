import React from "react";
import _ from "lodash";

export default function TableHeader({ headKey }) {
  //["name", "email", "contact", "class", "father_name"]
  // console.log("Th:", headKey);
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {headKey.map((hk, index) => (
          <th scope="col" className="px-6 py-3" key={index}>
            {hk}
          </th>
        ))}
      </tr>
      {/* <tr> */}
      {/* <th scope="col" className="p-4">
        <div className="flex items-center">
          <input
            id="checkbox-all-search"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="checkbox-all-search" className="sr-only">
            checkbox
          </label>
        </div>
      </th> */}
      {/*  <th scope="col" className="px-6 py-3">
          Student
        </th>
        <th scope="col" className="px-6 py-3">
          Class
        </th>
        <th scope="col" className="px-6 py-3">
          Fee Status
        </th>
        <th scope="col" className="px-6 py-3">
          Monthly Fee
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th> */}
      {/* </tr> */}
    </thead>
  );
}
