import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import ClinicCard from "./components/ClinicCard";
import ReactPaginate from "react-paginate";

const Clinics = () => {
  const { setIsLoading, token } = useAuth();
  const [clinics, setClinics] = useState([]);
  const [page, setPage] = useState(1);

  const getClinics = () => {
    setIsLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BACKEND}/clinics/list?count=18&page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setClinics(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const changePage = (event) => {
    setPage(event.selected + 1);
    console.log(event.selected + 1);
  };

  useEffect(() => {
    getClinics();
  }, [page]);
  return (
    <>
      <div className="flex flex-col bg-[#23075E] text-white mt-6 rounded-xl p-6">
        <div className="flex flex-row w-full items-center justify-between mb-3">
          <h3 className="text-2xl font-semibold">Clinics</h3>
        </div>
        <div className="flex flex-wrap gap-5">
          {clinics.data?.map((item) => (
            <ClinicCard data={item} />
          ))}
        </div>
        <div className="mt-3">
          <nav aria-label="Page navigation example">
            <ul className="">
              <ReactPaginate
                breakLabel="..."
                pageCount={clinics?.last_page}
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
    </>
  );
};

export default Clinics;
