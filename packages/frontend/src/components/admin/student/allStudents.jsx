import React, { useEffect, useState } from "react";

import TableHeader from "../datatable/tableHeaders";
import TableBody from "../datatable/tableBody";
import TableFilter from "../datatable/tableFilter";
import TableSearch from "../datatable/tableSearch";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllStudentsQuery } from "@/store/api/studentApi";
import { setStudents } from "@/store/slices/students";
import Loader from "@/components/common/loader";
import _ from "lodash";

export default function AllStudents() {
  const students = useSelector((state) => state.entities.students);
  const dispatch = useDispatch();
  // const [login, { isLoading, isError, error, isSuccess, data }] =

  const { data, isLoading, isFetching, isError, error, isSuccess } =
    useGetAllStudentsQuery();

  useEffect(() => {
    if (students.length === 0 && isSuccess) {
      dispatch(setStudents(data));
      // console.log(data);
    }
  }, [isSuccess]);

  if (isSuccess && data.length !== 0) {
    // _.pull(headKey, )
    // const headKey = _.pull(_.keysIn(students[0]), "_id", "profile_img");
    const headKey = ["Student Name", "Class", "Fee Status", "Fee", "Action"];
    // _.slice(keys1,1)
    // console.log("le:", keys);
    return (
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 mb-4">
            {/* filter */}
            {/* <TableFilter /> */}

            {/* Search Bar */}
            <TableSearch />
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <TableHeader headKey={headKey} />
            <TableBody data={data} />
          </table>
        </div>
      </div>
    );
  } else {
    <Loader />;
  }
}
