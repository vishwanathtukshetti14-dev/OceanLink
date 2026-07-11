import Admin from "./Admin";
import Tracking from "./pages/Tracking";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";
import "./styles/global.css";
import "./styles/home.css";
import "./styles/login.css";
import "./styles/dashboard.css";
import "./styles/tracking.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <AuthProvider>

    <BrowserRouter>

      <Routes>

  <Route path="/" element={<App />} />

  <Route path="/login" element={<Login />} />

  <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>

  <Route path="/tracking" element={<Tracking />} />

  </Routes>

    </BrowserRouter>

  </AuthProvider>

</React.StrictMode>
);