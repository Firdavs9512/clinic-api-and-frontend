import React, { useState } from "react";
import logo from "../assets/img/Logo.png";
import loginImage from "../assets/img/loginImage1.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { setToken } = useAuth();
  const nav = useNavigate();

  const sendDate = (event) => {
    event.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/register`,
        {
          email: email,
          name: name,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data?.status) {
          toast.success(res.data.message);
          localStorage.setItem("_token", res.data.token);
          setToken(res.data.token);
          nav("/dashboard/home");
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response.data);
        if (e.response.status === 422) {
          setErrors(e.response.data.errors);
          toast.error(e.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex w-full h-screen">
        <div className="bg-[#0A062C] h-screen w-2/5">
          <div className="m-8">
            <img src={logo} className="pt-5" alt="Logo" />
          </div>
          <div className="flex justify-center mt-20">
            <img
              src={loginImage}
              alt="Login Image"
              className="flex justify-center"
            />
          </div>
        </div>
        <ToastContainer />
        <div className="bg-[#23075E] h-screen w-3/5">
          <div className="mt-12 mx-20 pt-5">
            <h2 className="text-white text-4xl font-bold">Please Register</h2>
            <form onSubmit={sendDate} className="mt-10 flex flex-col gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-400 text-xl py-1">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(i) => setName(i.target.value)}
                  type="text"
                  id="name"
                  className="rounded p-2 bg-gray-200 hover:bg-gray-50 focus:bg-gray-50"
                  placeholder="Your name"
                />
                {errors?.name && <p className="text-red-600">{errors.name}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-400 text-xl py-1">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(i) => setEmail(i.target.value)}
                  type="email"
                  id="email"
                  className="rounded p-2 bg-gray-200 hover:bg-gray-50 focus:bg-gray-50"
                  placeholder="Your email"
                />
                {errors?.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-gray-400 text-xl py-1"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(i) => setPassword(i.target.value)}
                  type="text"
                  id="password"
                  className="rounded p-2 bg-gray-200 hover:bg-gray-50 focus:bg-gray-50"
                  placeholder="Password"
                />
                {errors?.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#722ED1] hover:bg-violet-800 transition-colors p-2 text-xl text-white font-semibold rounded mt-7"
              >
                Register
              </button>
              <Link
                to={"/login"}
                className="text-white text-lg font-semibold hover:text-[#722ED1] transition-colors duration-200 flex w-fit"
              >
                Already have an account?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
