import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard/Manager/Home";
import Vehicles from "./Pages/Dashboard/Manager/Vehicles";
import Drivers from "./Pages/Dashboard/Manager/Drivers";
import Settings from "./Pages/Dashboard/Manager/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./protected/protected-route";
import ManagerLayout from "./Components/Layouts/ManagerLayout";
import DriverLayout from "./Components/Layouts/DriverLayout";
import DriverHome from "./Pages/Dashboard/Driver/Home";
import DriverTrip from "./Pages/Dashboard/Driver/Trips";
import DriverMaintenance from "./Pages/Dashboard/Driver/Maintenance";
import DriverSettings from "./Pages/Dashboard/Driver/Settings";
import Register from "./Pages/Register";
import GuestLayout from "./Components/Layouts/GuestLayout";
import GuestHome from "./Pages/Dashboard/Guest/Home";
import GuestTrip from "./Pages/Dashboard/Guest/Trips";
import GuestSettings from "./Pages/Dashboard/Guest/Settings";
import Maintenance from "./Pages/Dashboard/Manager/Maintenances";
import Trips from "./Pages/Dashboard/Manager/Trips";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/manager" element={<ManagerLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="trips" element={<Trips />} />
          <Route path="settings" element={<Settings />} />
          <Route path="maintenance" element={<Maintenance />} />
        </Route>
        <Route path="/driver" element={<DriverLayout />}>
          <Route path="dashboard" element={<DriverHome />} />
          <Route path="trips" element={<DriverTrip />} />
          <Route path="maintenance" element={<DriverMaintenance />} />
          <Route path="settings" element={<DriverSettings />} />
        </Route>
        <Route path="/guest" element={<GuestLayout />}>
          <Route path="dashboard" element={<GuestHome />} />
          <Route path="trips" element={<GuestTrip />} />
          <Route path="settings" element={<GuestSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
