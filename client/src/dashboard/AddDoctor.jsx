import React, { Fragment, useEffect, useState } from "react";
import add from "../assets/img/addChamber.png";
import ReactPaginate from "react-paginate";
import { useAuth } from "../Context/AuthProvider";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [page, setPage] = useState(1);
  const { token, user, setIsLoading } = useAuth();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(0);

  const addDoctor = () => {
    setIsLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/users/up-doctor`,
        {
          user: select,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);

        if (res.data.status) {
          toast.success(res.data.message);
          setOpen(false);
        }
        getData();
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const getData = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND}/users/get?page=${page}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const changePage = (event) => {
    setPage(event.selected + 1);
    console.log(event.selected + 1);
  };

  useEffect(() => {
    getData();
  }, [page]);

  const ConfirmModal = () => {
    return (
      <>
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
                            <BanknotesIcon className="w-6 h-6" /> Confirm
                          </Dialog.Title>
                        </div>
                        <div className="relative text-left mt-6 flex-1 px-4 sm:px-6">
                          <div className="flex flex-col gap-4">
                            <h5 className="text-violet-500">
                              Do you really want to add this user to your list
                              of doctors?
                            </h5>
                            <div className="flex justify-end">
                              <button
                                onClick={addDoctor}
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
      </>
    );
  };

  return (
    <>
      <div className="bg-[#722ED1] w-full bg-opacity-50 mt-5 rounded-xl p-4 flex justify-between">
        <div className="bg-[#23075E] rounded-lg w-[65%] p-3">
          <h5 className="text-white font-semibold text-2xl">Users list</h5>
          <table className="w-[63%] text-sm text-left text-gray-400 mt-4 overflow-x-auto">
            <thead className="text-xs uppercase bg-[#1a0547] text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  User email
                </th>
                <th scope="col" className="px-6 py-3">
                  Register
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <ConfirmModal />
            <tbody className="h-min overflow-y-auto">
              {data.data?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#340d86] transition-colors duration-300"
                >
                  <td colSpan={1} className="py-2 mx-auto">
                    #{item.id}
                  </td>
                  <th
                    colSpan={1}
                    scope="row"
                    className="py-2 mx-auto font-medium whitespace-nowrap text-white"
                  >
                    {item.name}
                  </th>

                  <td colSpan={1} className="py-2 mx-auto">
                    {item.email}
                  </td>

                  <td colSpan={1} className="py-2 mx-auto">
                    {item.created_at.slice(0, 10)}
                  </td>
                  <td colSpan={1} className="py-2 mx-auto">
                    <button
                      onClick={() => {
                        setSelect(item.id);
                        setOpen(true);
                      }}
                      className="font-medium text-white bg-lime-500 py-1.5 px-3 rounded-md"
                    >
                      ADD
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="w-full flex justify-center">
                      You have no created lists!
                    </div>
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </table>
          <div className="mt-2">
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
        <div className="w-[35%] flex items-end justify-center">
          <img src={add} alt="Image" />
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
