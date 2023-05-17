import React from "react";
import logo from "../assets/img/Logo.png";
import {
  ArrowLeftOnRectangleIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  HomeIcon,
  PhoneIcon,
  PlusIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link, NavLink, Outlet } from "react-router-dom";
import Search from "./components/Search";
import UserDetails from "./components/UserDetails";
import { useAuth } from "../Context/AuthProvider";
import { ToastContainer } from "react-toastify";

const DashboardTemplate = () => {
  const { isLoading, user } = useAuth();
  return (
    <div>
      <div className="w-full min-h-screen flex">
        <div className="bg-[#23075E] min-h-screen w-1/5 fixed">
          <img src={logo} alt="Logo" className="mx-auto mt-8" />
          <ToastContainer />
          <div className="border-[#722ED1] border-b-2 mx-5 mt-10"></div>
          <nav className="mt-5">
            <ul className="mb-8">
              <li>
                <NavLink
                  to={"/dashboard/home"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-xl active_menu hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 py-2 pl-10 flex items-center gap-3 text-white"
                      : "text-xl pl-10 hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 flex items-center py-2 gap-3 text-white"
                  }
                >
                  <HomeIcon className="w-7 h-7 text-white" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-xl active_menu hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 py-2 pl-10 flex items-center gap-3 text-white"
                      : "text-xl pl-10 hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 flex items-center py-2 gap-3 text-white"
                  }
                  end
                >
                  <Squares2X2Icon className="w-7 h-7 text-white" /> Dashboard
                </NavLink>
              </li>
              <li>
                <Link className="text-xl pl-10 hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 flex items-center py-2 gap-3 text-white">
                  <UserGroupIcon className="w-7 h-7 text-white" /> About US
                </Link>
              </li>
              <li>
                <Link className="text-xl pl-10 hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 flex items-center py-2 gap-3 text-white">
                  <PhoneIcon className="w-7 h-7 text-white" /> Contact
                </Link>
              </li>
              {JSON.parse(user)?.role === "clinic" && (
                <li>
                  <NavLink
                    to={"/dashboard/add-doctor"}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-xl active_menu hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 py-2 pl-10 flex items-center gap-3 text-white"
                        : "text-xl pl-10 hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 flex items-center py-2 gap-3 text-white"
                    }
                    end
                  >
                    <PlusIcon className="w-7 h-7 text-white" /> Add doctor
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <div className="border-[#722ED1] border-b-2 mx-5 mt-10"></div>
          <nav className="mt-5">
            <ul className="mb-8">
              <li>
                <NavLink
                  to={"/dashboard/settings"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-xl active_menu hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 py-2 pl-10 flex items-center gap-3 text-white"
                      : "text-xl pl-10 hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 flex items-center py-2 gap-3 text-white"
                  }
                  end
                >
                  <Cog6ToothIcon className="w-7 h-7 text-white" /> Settings
                </NavLink>
              </li>
              <li>
                <Link
                  to={"/logout"}
                  className="text-xl pl-10 hover:bg-[#722ED1] hover:bg-opacity-50 hover:border-l-4 transition-transform duration-300 flex items-center py-2 gap-3 text-white"
                >
                  <ArrowLeftOnRectangleIcon className="w-7 h-7 text-white" />{" "}
                  Log out
                </Link>
              </li>
            </ul>
          </nav>
          <div className="fixed bottom-4 text-center left-12">
            <Link
              to={"https://github.com/firdavs9512"}
              target="_blank"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors text-white"
            >
              <CodeBracketIcon className="w-6 text-white" /> Firdavs Sharipov
            </Link>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-[100vh] z-[10000] fixed top-0 left-0 right-0 backdrop-blur-sm">
            <div
              role="status"
              className="fixed top-[50%] left-[50%] right-[50%] h-[100vh]"
            >
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="bg-[#0A062C] min-h-screen w-4/5 ml-[20%]">
          <div className="m-11">
            <div className="w-full flex justify-between items-center">
              <Search />
              <UserDetails />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
