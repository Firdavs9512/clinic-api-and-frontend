import React, { Fragment, useEffect, useState } from "react";
import person from "../assets/img/person.jpg";
import Time from "./components/Time";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { BanknotesIcon } from "@heroicons/react/24/solid";

const Doctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [times, setTimes] = useState([]);
  const { token, user, setIsLoading } = useAuth();
  const [select, setSelect] = useState();
  const [payment, setPayment] = useState("cash");
  const [open, setOpen] = useState(false);
  const [paymentData, setPaymentData] = useState([]);

  var bugun = new Date();
  var correct =
    bugun.getFullYear().toString() +
    "-" +
    (bugun.getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    bugun.getDate().toString().padStart(2, 0);
  const [date, setDate] = useState(correct);

  const getDoctor = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND}/doctors/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        setDoctor(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const sendOrder = () => {
    if (!select) {
      toast.error("Please select one time for appointment!");
      return;
    }
    setIsLoading(true);

    if (payment === "webmoney") {
      setOpen(true);
    }
    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/appointments`,
        {
          time: select,
          date: date,
          doctor: id,
          type: payment,
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
          if (payment === "webmoney") {
            setPaymentData(res.data);
            setOpen(true);
          } else {
            toast.success(res.data.message);
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        if (e.response.status === 422) {
          toast.error(e.response.data.message);
        }
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  const getTimes = () => {
    setIsLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/appointments/daily`,
        {
          doctor: id,
          date: date,
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
        setTimes(res.data);
      })
      .catch((e) => console.log(e))
      .finally(setIsLoading(false));
  };

  const PaymentModal = () => {
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
                            <BanknotesIcon className="w-6 h-6" /> WebMoney order
                          </Dialog.Title>
                        </div>
                        <div className="relative text-left mt-6 flex-1 px-4 sm:px-6">
                          <div className="flex flex-col gap-4">
                            <h5 className="text-violet-500">
                              Do you approve the money transfer for the
                              appointment with the doctor?
                              <p className="text-lime-500 font-semibold">
                                Payment money: 12$
                              </p>
                            </h5>
                            <div className="flex justify-end">
                              <form
                                method="POST"
                                action="https://merchant.webmoney.ru/lmi/payment_utf.asp"
                                accept-charset="utf-8"
                              >
                                <input
                                  type="hidden"
                                  name="LMI_PAYMENT_AMOUNT"
                                  value={doctor?.payment}
                                />
                                <input
                                  type="hidden"
                                  name="LMI_PAYMENT_DESC"
                                  value="платеж по счету"
                                />
                                <input
                                  type="hidden"
                                  name="LMI_PAYMENT_NO"
                                  value={paymentData?.payment_id}
                                />
                                <input
                                  type="hidden"
                                  name="LMI_PAYEE_PURSE"
                                  value={import.meta.env.VITE_API_KEY}
                                />
                                <input
                                  type="hidden"
                                  name="LMI_SUCCESS_URL"
                                  value={`${
                                    import.meta.env.VITE_BACK
                                  }payment/success`}
                                />
                                <input
                                  type="hidden"
                                  name="LMI_SUCCESS_METHOD"
                                  value="1"
                                />
                                <input
                                  type="hidden"
                                  name="LMI_FAIL_URL"
                                  value={`${
                                    import.meta.env.VITE_BACK
                                  }payment/fail`}
                                />
                                <input
                                  type="hidden"
                                  name="LMI_FAIL_METHOD"
                                  value="1"
                                />
                                <button className="bg-violet-600 hover:bg-violet-700 text-sm text-white mr-2 py-2.5 px-5 font-medium rounded-lg">
                                  Confirm
                                </button>
                              </form>

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

  useEffect(() => {
    getDoctor();
  }, []);

  useEffect(() => {
    if (date < correct) {
      toast.error("Your selected date is not correct!");
    } else {
      getTimes();
    }
  }, [date]);

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <div className="bg-[#23075E] rounded-xl w-[37%]">
          <div className="p-3">
            <img
              src={person}
              alt=""
              className="w-28 h-28 mx-auto rounded-full object-cover"
            />
          </div>
          <div className="text-center">
            <h5 className="text-lg font-semibold text-white mb-2">
              {doctor?.doctor_name}
            </h5>
          </div>
        </div>
        <div className="bg-[#23075E] rounded-lg w-[60%] p-3">
          <div className="text-white ">
            <h2 className="text-lg mb-2 font-semibold">General Dentistry</h2>
            <h3>
              Clinic:
              <Link
                to={`/dashboard/clinic/${doctor?.clinic_id}`}
                className="ml-1.5 underline text-sky-500"
              >
                {doctor?.clinic_name}
              </Link>
            </h3>
            <h3>Total orders: {doctor?.orders}</h3>
            <div className="flex mt-2">
              <div className="bg-[#461890] px-10 py-3 rounded-full font-bold">
                FEE: {doctor?.payment} $
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentModal />
      <div className="mt-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col w-[44%] bg-[#23075E] rounded-lg p-3">
            <div className="flex flex-col">
              <label htmlFor="date" className="text-white">
                Day:
              </label>
              <input
                type="date"
                value={date}
                onChange={(i) => setDate(i.target.value)}
                id="date"
                className="w-80 rounded-md"
              />
            </div>
            <label className="text-white mt-4 mb-1">Clock:</label>
            <div className="flex flex-wrap gap-3 mb-5">
              {times &&
                times?.map((time, index) => (
                  <Time
                    key={index}
                    time={time}
                    select={select}
                    setSelect={setSelect}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col w-[53%] bg-[#23075E] rounded-lg p-3">
            <h2 className="text-white text-xl">Information</h2>
            <h3 className="text-white">Available Appointments On {date}</h3>
            <h3 className="text-white">Your doctor {doctor?.doctor_name}</h3>
            <h3 className="text-white">From: {select}</h3>
            <label
              for="payment"
              class="block mb-2 text-sm font-medium text-white"
            >
              Payment
            </label>
            <select
              id="payment"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              class=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="cash">Cash payment</option>
              <option value="webmoney">Webmoney payment</option>
            </select>
            {JSON.parse(user).role === "user" && (
              <button
                onClick={sendOrder}
                className="py-2 bg-[#461890] text-lg font-medium text-white rounded-full mb-2 mt-5"
              >
                Confirm order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
