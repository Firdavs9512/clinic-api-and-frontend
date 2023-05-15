import React from "react";
import person from "../../assets/img/person.jpg";
import { Link } from "react-router-dom";

const DoctorInfo = ({ data }) => {
  return (
    <div className="flex flex-col flex-1 columns-2 border-4 border-[#B88BF8] rounded-xl items-center text-center">
      <div className="w-full flex mt-4 mb-3">
        <img
          src={person}
          alt="Person"
          className="flex mx-auto w-20 h-20 object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col text-white">
        <h5 className="font-medium">{data?.doctor_name}</h5>
        <div className="mt-2 mb-4 mx-1">
          <Link
            to={`/dashboard/doctor/${data?.id}`}
            className="px-6 py-1 rounded-full bg-[#722ED1] hover:bg-[#813fdd] transition-colors"
          >
            Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
