import React, { useState } from "react";

const Time = ({ time, select, setSelect }) => {
  const changeType = () => {
    if (time?.status) {
      setSelect(time.time);
    }
  };
  return (
    <div
      onClick={changeType}
      className={
        time?.status
          ? select === time?.time
            ? "flex border-2 border-white text-white bg-violet-600 py-2 rounded-md cursor-pointer px-4"
            : "flex border-2 border-white text-white cursor-pointer py-2 px-4 rounded-md"
          : "flex border-2 border-[#8f65d3] text-[#8f65d3] py-2 px-4 rounded-md"
      }
    >
      {time?.time}
    </div>
  );
};

export default Time;
