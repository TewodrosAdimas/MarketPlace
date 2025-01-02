import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

type LocationState = {
  email: string;
};

const Activate: React.FC = () => {
  const location = useLocation();
  const { email } = location.state as LocationState;

  const [activationCode, setActivationCode] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleActivation = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/activate/", {
        email,
        code: activationCode,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage("Activation failed. Please check the code.");
    }
  };

  return (
    <div>
      <h2>Activate Your Account</h2>
      <p>An activation code has been sent to {email}. Please enter it below.</p>
      <input
        type="text"
        value={activationCode}
        onChange={(e) => setActivationCode(e.target.value)}
        placeholder="Activation Code"
      />
      <button onClick={handleActivation}>Activate</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Activate;
