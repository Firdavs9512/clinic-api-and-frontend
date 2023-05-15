import React from "react";
import { useAuth } from "../../Context/AuthProvider";

const UserDetails = () => {
  const { user } = useAuth();
  const todayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][new Date().getDay()];
  const todayDate = new Date().toLocaleDateString("en-GB").replace(/\//g, ".");

  return (
    <div className="flex bg-[#4B1B97] w-[24%] h-max items-center rounded-xl text-white">
      <div className="p-3 w-full">
        <div className="flex flex-row items-start justify-between">
          <div className="text-3xl font-medium">
            {JSON.parse(user).name.split(" ")[0]}
          </div>
          <div className="font-medium">
            <div className="text-xs">{todayName}</div>
            <div className="text-xs">{todayDate}</div>
          </div>
        </div>
        <div>{JSON.parse(user).email}</div>
      </div>
    </div>
  );
};

export default UserDetails;
