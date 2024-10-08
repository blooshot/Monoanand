import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableSearch from "../datatable/tableSearch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { ChevronUp, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import FeeForm from "./feeForm";

export default function ManageFee() {
  const [isOpen, setIsOpen] = useState({ student: false });
  return (
    <div>
      <TableSearch placeholder="Search Students" />
      <div className="w-[300px] m-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {" "}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="ml-2">Krishna sadfasdfd</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span
                className={`h-2.5 w-2.5 rounded-full  bg-green-500 me-2`}
              ></span>{" "}
              Submitted Sept. 2024
            </div>
            <div className="border-t-2 mt-2">
              {/* <p className="my-2">2024 Payed List</p> */}
              {/*   <div className="mb-4">
                <div
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsOpen({ student: !isOpen.student })}
                >
                  <User color="#111827" strokeWidth={2.25} />
                  <span className="ms-3 me-3">Manage Students</span>
                  {isOpen.student ? (
                    <ChevronUp size={20} color="#111827" strokeWidth={2.5} />
                  ) : (
                    <ChevronDown size={20} color="#111827" strokeWidth={2} />
                  )}
                </div>
                <div
                  className={`transition-height transition-opacity duration-700 ${
                    isOpen.student
                      ? "h-auto opacity-100"
                      : "h-0 overflow-hidden opacity-0"
                  }`}
                >
                  <ul className="mt-2 space-y-2 ml-4">
                    <li >
                      <Link
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        to="/admin/student/all"
                      >
                        <span className="ms-3">All Students</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        to="/admin/student/add"
                      >
                        <span className="ms-3">Add New</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </CardContent>
          <CardFooter className="">
            <Button className="w-full bg-green-500 ">Submit Fee</Button>
            {/* <Button>Update Fee</Button> */}
          </CardFooter>
        </Card>
      </div>
      <FeeForm />
    </div>
  );
}
