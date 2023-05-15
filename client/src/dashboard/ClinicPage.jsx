import React, { useEffect, useState } from "react";
import cli from "../assets/img/clinic.jpeg";
import person from "../assets/img/person.jpg";
import DoctorInfo from "./components/DoctorInfo";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";

const ClinicPage = () => {
  const { id } = useParams();
  const [data, setDate] = useState([]);
  const { token, setIsLoading } = useAuth();
  const [page, setPage] = useState(1);

  const getDate = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND}/clinics/${id}?page=${page}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        setDate(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const changePage = (event) => {
    setPage(event.selected + 1);
    console.log(event.selected + 1);
  };

  useEffect(() => {
    getDate();
  }, [page]);

  return (
    <div>
      <div className="flex items-center justify-between mt-4">
        <div className="bg-[#23075E] w-[43%] p-4 rounded-xl h-[73vh]">
          <div>
            <img src={cli} alt="Image" className="w-full" />
          </div>
          <div className="flex flex-col text-white mt-2">
            <h3 className="text-2xl font-semibold">{data.clinic?.name}</h3>
            <p className="text-gray-300 leading-none">{data.clinic?.desc}</p>
            <p className="text-gray-400 leading-none mt-2">
              {data.clinic?.address}
            </p>
            <div className="border border-violet-500 mt-2 mb-3"></div>
            <p>Total doctors: {data.clinic?.doctor_count}</p>
          </div>
        </div>
        <div className="bg-[#23075E] rounded-xl w-[55%] h-[73vh] p-4 scroll-smooth overflow-y-auto">
          <div className="flex w-full flex-wrap gap-4 flex-row">
            {data?.doctors?.data.map((item) => (
              <DoctorInfo key={item?.id} data={item} />
            ))}
          </div>
          <div className="mt-4">
            <nav aria-label="Page navigation example">
              <ul className="">
                <ReactPaginate
                  breakLabel="..."
                  pageCount={data.doctors?.last_page}
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
      </div>
    </div>
  );
};

export default ClinicPage;
