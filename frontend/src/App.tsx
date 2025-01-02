import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/Users/RegisterForm/RegisterForm";
import Activate from "./components/Users/Activate/Activete";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Registration Route */}
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Activation Route */}
        <Route path="/activate" element={<Activate />} />
        
        {/* Default Route */}
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </div>
  );
};

export default App;
