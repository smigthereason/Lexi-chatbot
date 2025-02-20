import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDeviceId } from "../components/utils/deviceId";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function PhoneRegistration() {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validatePhoneNumber = (number) => {
    try {
      const phoneNumber = parsePhoneNumberFromString(number);
      return phoneNumber && phoneNumber.isValid();
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate using libphonenumber-js
    const phoneNumber = parsePhoneNumberFromString(phone);
    if (!phoneNumber || !phoneNumber.isValid()) {
      setIsValid(false);
      setErrorMessage("Please enter a valid WhatsApp number with country code");
      return;
    }

    try {
      const formattedNumber = phoneNumber.format("E.164");
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: formattedNumber,
          device_id: getDeviceId(),
        }),
      });

      if (!response.ok) throw new Error("Registration failed");

      // Store registration in localStorage
      localStorage.setItem("phone_number", formattedNumber);
      navigate("/");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className=" bg-transparent filter backdrop-blur-md rounded-lg shadow-lg border border-white p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#62767c] text-center">
          WhatsApp Verification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setIsValid(true);
              }}
              className={`w-full text-gray-700/50 p-3 border ${
                isValid ? "border-gray-300" : "border-red-500"
              } rounded-lg focus:ring-2 focus:ring-[#62767c] focus:border-transparent`}
              placeholder="+254723654321"
              pattern="^\+[1-9]\d{1,14}$"
            />
            {!isValid && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#62767c] text-white rounded-lg hover:bg-[#90a9b1] transition-colors"
          >
            Verify via WhatsApp
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          We'll send a verification message to confirm your number
        </p>
      </div>
    </div>
  );
}

export default PhoneRegistration;
