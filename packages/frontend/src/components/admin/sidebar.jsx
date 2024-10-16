import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  HandCoins,
  UserRoundPlus,
  UserRound,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
// import { Sidebar } from "flowbite-react";
// import {
//   HiArrowSmRight,
//   HiChartPie,
//   HiInbox,
//   HiShoppingBag,
//   HiTable,
//   HiUser,
// } from "react-icons/hi";
function MySideBar() {
  const [isOpen, setIsOpen] = useState({ student: false });

  return (
    <div
      id="sidebar-mini"
      className="fixed w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white border-2 border-gray-200  dark:bg-neutral-800 dark:border-neutral-700"
      role="dialog"
      aria-label="Mini Sidebar"
    >
      <div className="flex flex-col gap-y-2 px-4 my-2">
        <div className="mb-4">
          <Link
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            to="/admin/dashboard"
          >
            <LayoutDashboard color="#111827" strokeWidth={2.25} />
            <span className="ms-3">Dashboard</span>
          </Link>
        </div>

        <div className="mb-4">
          <div
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen({ student: !isOpen.student })}
          >
            <Users color="#111827" strokeWidth={2.25} />
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

            /* {`transition-opacity duration-300 ${
              isOpen.dashboard ? "opacity-100" : "opacity-0"
            }`} */
          >
            <ul className="mt-2 space-y-2 ml-4">
              <li>
                <Link
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  to="/admin/student/all"
                >
                  <UserRound color="#111827" strokeWidth={2.25} />
                  <span className="ms-3">All Students</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  to="/admin/student/add"
                >
                  <UserRoundPlus color="#111827" strokeWidth={2.25} />
                  <span className="ms-3">Add New</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <Link
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            to="/admin/fee"
          >
            <HandCoins color="#111827" strokeWidth={2.25} />
            <span className="ms-3">Manage Fee</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MySideBar;

/* Mini width
        <div
      id="sidebar-mini"
      className="fixed w-24 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white border-2 border-gray-200  dark:bg-neutral-800 dark:border-neutral-700"
      role="dialog"
      tabindex="-1"
      aria-label="Mini Sidebar"
    >
      <div className="flex flex-col justify-center items-center gap-y-2 py-4">
        <div className="mb-4">
          <a className="flex-none focus:outline-none focus:opacity-80" href="#">
            <svg
              className="w-10 h-auto"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" rx="10" fill="black" />
              <path
                d="M37.656 68V31.6364H51.5764C54.2043 31.6364 56.3882 32.0507 58.1283 32.8793C59.8802 33.696 61.1882 34.8146 62.0523 36.2351C62.9282 37.6555 63.3662 39.2654 63.3662 41.0646C63.3662 42.5443 63.0821 43.8108 62.5139 44.8643C61.9458 45.906 61.1823 46.7524 60.2235 47.4034C59.2646 48.0544 58.1934 48.522 57.0097 48.8061V49.1612C58.2999 49.2322 59.5369 49.6288 60.7206 50.3509C61.9162 51.0611 62.8927 52.0672 63.6503 53.3693C64.4079 54.6714 64.7867 56.2457 64.7867 58.0923C64.7867 59.9744 64.3309 61.6671 63.4195 63.1705C62.508 64.6619 61.1349 65.8397 59.3002 66.7038C57.4654 67.5679 55.1572 68 52.3754 68H37.656ZM44.2433 62.4957H51.3279C53.719 62.4957 55.4413 62.04 56.4948 61.1286C57.5601 60.2053 58.0928 59.0215 58.0928 57.5774C58.0928 56.5002 57.8264 55.5296 57.2938 54.6655C56.7611 53.7895 56.0035 53.103 55.021 52.6058C54.0386 52.0968 52.8667 51.8423 51.5054 51.8423H44.2433V62.4957ZM44.2433 47.1016H50.7597C51.896 47.1016 52.92 46.8944 53.8314 46.4801C54.7429 46.054 55.459 45.4562 55.9798 44.6868C56.5125 43.9055 56.7789 42.9822 56.7789 41.9169C56.7789 40.5083 56.2817 39.3482 55.2874 38.4368C54.3049 37.5253 52.843 37.0696 50.9017 37.0696H44.2433V47.1016Z"
                fill="white"
              />
            </svg>
          </a>
        </div>

        <div className="hs-tooltip [--placement:right] inline-block">
          <button
            type="button"
            className="hs-tooltip-toggle size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap dark:bg-neutral-700"
              role="tooltip"
            >
              Home
            </span>
          </button>
        </div>

        <div className="hs-tooltip [--placement:right] inline-block">
          <button
            type="button"
            className="hs-tooltip-toggle size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap dark:bg-neutral-700"
              role="tooltip"
            >
              Users
            </span>
          </button>
        </div>

        <div className="hs-tooltip [--placement:right] inline-block">
          <button
            type="button"
            className="hs-tooltip-toggle size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap dark:bg-neutral-700"
              role="tooltip"
            >
              Notifications
            </span>
          </button>
        </div>
      </div>
    </div>
    
    
    ==================================================
      <div className="fixed w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie}>
              <Link to="/admin">Dashboard</Link>{" "}
            </Sidebar.Item>
            <Sidebar.Collapse
              href="4"
              icon={HiShoppingBag}
              label="Manage Students"
            >
              <Link to="/admin/student">
                <Sidebar.Item>Student</Sidebar.Item>
              </Link> 

              <Sidebar.Item>
                <Link to="/admin/student">All Students</Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/add">Add New</Link>{" "}
              </Sidebar.Item>
            </Sidebar.Collapse>
            {/*  <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item> 
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
    
    */
