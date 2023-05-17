import React, { Fragment, useEffect, useState } from "react";
import banner from "../assets/img/banner1.png";
import ReactPaginate from "react-paginate";
import { useAuth } from "../Context/AuthProvider";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, token, setIsLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectDate, setSelectDate] = useState(0);

  const changePage = (event) => {
    setPage(event.selected + 1);
    console.log(event.selected + 1);
  };

  const getData = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND}/appointments/list?page=${page}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const UpdateModal = () => {
    const confirmData = () => {
      setIsLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_BACKEND}/appointments/update/${selectDate}`,
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("Your order success confirmed");
          getData();
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setIsLoading(false);
          setOpen(false);
        });
    };
    return (
      <>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-[100]" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <div className="flex h-full rounded-xl flex-col overflow-y-hidden bg-white dark:bg-gray-800 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base flex gap-1 items-center font-semibold leading-6 text-gray-900 dark:text-gray-100">
                          <ArrowPathIcon className="w-6 h-6" /> Cancel order
                        </Dialog.Title>
                      </div>
                      <div className="relative text-left mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col gap-4">
                          <h5 className="text-red-500">
                            Are you sure you want to proceed with this action?
                            This action cannot be undone.
                          </h5>
                          <div className="flex justify-end">
                            <button
                              onClick={confirmData}
                              className="bg-violet-600 hover:bg-violet-700 text-sm text-white mr-2 py-2.5 px-5 font-medium rounded-lg"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setOpen(false)}
                              className="bg-slate-600 hover:bg-slate-700 text-sm text-white mr-2 py-2.5 px-5 font-medium rounded-lg"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full mt-4">
        <div className="flex justify-between items-center px-16 w-full bg-[#D3ADF8] rounded-xl">
          <div>
            <h4 className="text-3xl text-[#23075E]">
              Hello, {JSON.parse(user).name}
            </h4>
            <p className="text-[#722ED1] mt-1">Welcome to Doctor’s Portal</p>
          </div>
          <img src={banner} alt="Banner" className="w-44 pt-2" />
        </div>
        <div className="bg-[#23075E] p-4 mt-3 rounded-xl">
          <div class="relative overflow-x-auto sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-400">
              <thead class="text-xs uppercase bg-[#1a0547] text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    #
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Doctor name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Payment type
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Payment status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data?.map((item) => (
                  <tr className="hover:bg-[#340d86] transition-colors duration-300">
                    <td class="px-6 py-4">#{item.id}</td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      <Link to={`/dashboard/doctor/${item.doctor_id}`} className="cursor-pointer">{item.doctor_name}</Link>
                      
                    </th>
                    <td class="px-6 py-4 capitalize">{item.type}</td>
                    <td class="px-6 py-4">
                      {item.payment_status === "success" && (
                        <div className="bg-lime-500 text-white flex font-semibold justify-center rounded-2xl">
                          {item.payment_status}
                        </div>
                      )}
                      {item.payment_status === "pending" && (
                        <div className="bg-amber-500 text-white flex font-semibold justify-center rounded-2xl">
                          {item.payment_status}
                        </div>
                      )}
                      {item.payment_status === "error" && (
                        <div className="bg-red-500 text-white flex font-semibold justify-center rounded-2xl">
                          faild
                        </div>
                      )}
                    </td>
                    <td class="px-6 py-4">{item.date}</td>
                    <td class="px-6 py-4">{item.time.replace(/:00$/, "")}</td>
                    <td class="px-6 py-4">{item.status}</td>
                    <td class="px-6 py-4">
                      {item.status === "cancelled" ? (
                        <button className="font-medium text-gray-500">
                          Cancelled
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectDate(item.id);
                            setOpen(true);
                          }}
                          class="font-medium  text-blue-500 hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {!data.data?.length && (
                  <tr>
                    <td colSpan={6}>
                      <div className="w-full flex justify-center">
                        You have no created lists!
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <UpdateModal />
          <div className="mt-4">
            <nav aria-label="Page navigation example">
              <ul className="">
                <ReactPaginate
                  breakLabel="..."
                  pageCount={data?.last_page}
                  previousLabel="<"
                  nextLabel=">"
                  pageRangeDisplayed={2}
                  pageLinkClassName={
                    "px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }
                  activeLinkClassName={
                    "z-10 px-3 py-2 leading-tight border hover:bg-blue-100 hover:text-blue-700 border-gray-700 bg-gray-900 text-white"
                  }
                  className={"inline-flex items-center -space-x-px"}
                  previousClassName={
                    "block px-3 py-2 ml-0 leading-tight border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }
                  nextClassName={
                    "block px-3 py-2 leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }
                  onPageChange={changePage}
                  renderOnZeroPageCount={null}
                />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
