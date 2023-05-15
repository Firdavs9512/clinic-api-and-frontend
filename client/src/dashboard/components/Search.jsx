import React from "react";

const Search = () => {
  return (
    <div className="flex bg-[#4B1B97] w-[73%] h-max items-center rounded-xl">
      <div className="flex p-4 w-full items-center justify-between">
        <h3 className="text-3xl py-2 font-bold text-white">Home</h3>
        <input
          type="text"
          name="search"
          id="search"
          className="p-2 rounded-md flex"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default Search;
