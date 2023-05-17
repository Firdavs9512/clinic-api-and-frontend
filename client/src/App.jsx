import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";
import DashboardTemplate from "./dashboard/DashboardTemplate";
import IndexPage from "./IndexPage";
import PrivitedRoute from "./Context/PrivateRoute";
import PageNotFound from "./404";
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./dashboard/Dashboard";
import ClinicPage from "./dashboard/ClinicPage";
import Doctor from "./dashboard/Doctor";
import Home from "./dashboard/Home";
import Logout from "./dashboard/Logout";
import Doctors from "./dashboard/Doctors";
import Clinics from "./dashboard/Clinics";
import Settings from "./dashboard/Settings";
import RoleRoute from "./Context/RoleRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivitedRoute>
                <DashboardTemplate />
              </PrivitedRoute>
            }
          >
            <Route exact index element={<Dashboard />} />
            <Route path="clinic/:id" element={<ClinicPage />} />
            <Route path="doctor/:id" element={<Doctor />} />
            <Route path="clinics" element={<Clinics />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
