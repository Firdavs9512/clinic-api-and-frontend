import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cli from "../assets/img/clinic.jpeg";
import ClinicCard from "./components/ClinicCard";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import DoctorCard from "./components/DoctorCard";

const Doctors = () => {
  return (
    <>
      <div className="flex flex-col bg-[#23075E] text-white mt-6 rounded-xl p-6">
        <div className="flex flex-row w-full items-center justify-between mb-3">
          <h3 className="text-2xl font-semibold">Doctors</h3>
          <Link className="text-gray-50 hover:text-violet-400 transition-colors">
            Get all
          </Link>
        </div>
        <div className="flex flex-wrap gap-5">
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
          <ClinicCard />
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const { setIsLoading, token } = useAuth();

  const getClinics = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND}/clinics/list?count=12`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setClinics(res.data.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getDoctors = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND}/doctors/list?count=12`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setDoctors(res.data.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getClinics();
    getDoctors();
  }, []);

  return (
    <>
      <div className="flex flex-col bg-[#23075E] text-white mt-6 rounded-xl p-6">
        <div className="flex flex-row w-full items-center justify-between mb-3">
          <h3 className="text-2xl font-semibold">Clinics</h3>
          <Link to={'/dashboard/clinics'} className="text-gray-50 hover:text-violet-400 transition-colors">
            Get all
          </Link>
        </div>
        <div className="flex flex-wrap gap-5">
          {clinics?.map((item) => (
            <ClinicCard data={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col bg-[#23075E] text-white mt-6 rounded-xl p-6">
        <div className="flex flex-row w-full items-center justify-between mb-3">
          <h3 className="text-2xl font-semibold">Doctors</h3>
          <Link to={'/dashboard/doctors'} className="text-gray-50 hover:text-violet-400 transition-colors">
            Get all
          </Link>
        </div>
        <div className="flex flex-wrap gap-5">
          {doctors?.map((item) => (
            <DoctorCard data={item} />
          ))}
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
