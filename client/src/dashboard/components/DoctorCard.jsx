import React from "react";
import cli from "../../assets/img/person.jpg";
import { Link } from "react-router-dom";

const DoctorCard = ({ data }) => {
  return (
    <Link
      to={`/dashboard/doctor/${data?.id}`}
      className="flex flex-col bg-[#722ED1] bg-opacity-50 hover:bg-opacity-80 cursor-pointer transition-opacity p-2 rounded-md relative"
    >
      <img
        src={cli}
        alt="Image"
        className="w-28 h-28 rounded-md justify-center object-cover"
      />
      <div
        className={
          data?.status === "true"
            ? "w-3 h-3 absolute top-3 right-3 bg-lime-500 rounded-full"
            : "w-3 h-3 absolute top-3 right-3 bg-red-500 rounded-full"
        }
      ></div>
      <p className="text-gray-50 leading-none w-28 font-medium mt-1 mb-2">
        {data?.doctor_name}
      </p>
      <p className="texg-sm text-gray-300">
        {data?.opening_time.replace(/:00$/, "")} -{" "}
        {data?.closing_time.replace(/:00$/, "")}
      </p>
    </Link>
  );
};

export default DoctorCard;
