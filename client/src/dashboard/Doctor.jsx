import React, { useEffect, useState } from "react";
import person from "../assets/img/person.jpg";
import { TextInput } from "flowbite-react";
import Time from "./components/Time";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import axios from "axios";
import { data } from "autoprefixer";
import { toast } from "react-toastify";

const Doctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [times, setTimes] = useState([]);
  const { token, setIsLoading } = useAuth();
  const [select, setSelect] = useState();
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
    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/appointments`,
        {
          time: select,
          date: date,
          doctor: id,
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
        if (res.data?.status) {
          toast.success(res.data.message);
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
            <h3>Clinic: {doctor?.clinic_name}</h3>
            <h3>Total orders: {doctor?.orders}</h3>
            <div className="flex mt-2">
              <div className="bg-[#461890] px-10 py-3 rounded-full font-bold">
                FEE: 100 TL
              </div>
            </div>
          </div>
        </div>
      </div>
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
              for="countries"
              class="block mb-2 text-sm font-medium text-white"
            >
              Payment
            </label>
            <select
              id="countries"
              class=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="other">Cash payment</option>
            </select>
            <button
              onClick={sendOrder}
              className="py-2 bg-[#461890] text-lg font-medium text-white rounded-full mb-2 mt-5"
            >
              Confirm order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
