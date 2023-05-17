import React, { useEffect, useState } from "react";
import chamber from "../assets/img/addChamber.png";
import { useAuth } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

const Settings = () => {
  const { user, token, setUser } = useAuth();
  const [name, setName] = useState(JSON.parse(user).name);
  const [email, setEmail] = useState(JSON.parse(user).email);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const sendDate = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/user/update`,
        {
          email: email,
          name: name,
          password: password,
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
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(JSON.stringify(res.data));
        toast.success("User information success updated!");
        setPassword("");
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 422) {
          toast.error(e.response.data.message);
          setErrors(e.response.data.errors);
        }
      });
  };

  useEffect(() => {
    //
  }, []);

  return (
    <>
      <div className="bg-[#722ED1] bg-opacity-50 mt-4 p-3 rounded-xl flex justify-between">
        <div className="w-[35%] flex items-end justify-center">
          <img src={chamber} className="w-[100%]" alt="Image" />
        </div>
        <div className="bg-[#23075E] w-[65%] p-4 rounded-xl">
          <h4 className="text-white font-semibold text-3xl">
            User informations
          </h4>
          <p className="text-gray-300 font-medium text-lg">Change data</p>
          <div className="border-gray-500 mt-5 border-t"></div>
          <form onSubmit={sendDate} className="mt-5 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-gray-100 font-medium">
                Name
              </label>
              <input
                value={name}
                onChange={(i) => setName(i.target.value)}
                type="text"
                id="name"
                placeholder="Name"
                required
              />
              {errors?.name && <p className="text-red-500">{errors?.name}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-100 font-medium">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Email"
                required
              />
              {errors?.email && <p className="text-red-500">{errors?.email}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-gray-100 font-medium">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                id="password"
                placeholder="Password"
              />
              {errors?.password && (
                <p className="text-red-500">{errors?.password}</p>
              )}
            </div>
            <div className="flex justify-center">
              <button className="text-lg bg-[#722ED1] hover:bg-[#561ea5] transition-colors text-white py-2.5 my-1 px-36 rounded-3xl">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
