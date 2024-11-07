import React, { useState, useEffect } from "react";
import SelfieCapturePopup from "../components/SelfieCapturePopup";
import ApplyLeavePopup from "../components/ApplyLeavePopup";

const Header = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const toggleClockInOut = () => {
    setIsPopupOpen(true); // Open the clock-in/clock-out popup
  };

  const handleClockPopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleLeavePopupOpen = () => {
    setIsLeavePopupOpen(true); // Open the apply leave popup
  };

  const handleLeavePopupClose = () => {
    setIsLeavePopupOpen(false); // Close the apply leave popup
  };

  const handleSuccess = () => {
    // Only toggle the clock state when the submission is successful
    setIsClockedIn((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-tr-md rounded-tl-md">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img
            src="/placeholder-avatar.png"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{userData.name}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          {/* Apply Leave Button */}
          <button
            onClick={handleLeavePopupOpen}
            className="px-4 py-2 rounded-md bg-white text-black border border-gray-300 hover:bg-gray-100"
          >
            Apply Leave
          </button>

          {/* Clock In/Clock Out Button */}
          <button
            onClick={toggleClockInOut}
            className={`px-4 py-2 rounded-md ${
              isClockedIn
                ? "bg-red-500 hover:bg-red-600"
                : "bg-black hover:bg-gray-800"
            } text-white`}
          >
            {isClockedIn ? "Clock Out" : "Selfie Clock In"}
          </button>
        </div>

        {/* Selfie Capture Popup for Clock In/Clock Out */}
        <SelfieCapturePopup
          isOpen={isPopupOpen}
          onClose={handleClockPopupClose}
          endpoint={
            isClockedIn
              ? "http://localhost:5000/checkout"
              : "http://localhost:5000/checkin"
          }
          title={isClockedIn ? "Clock Out" : "Clock In"}
          onSuccess={handleSuccess}
        />

        {/* Apply Leave Popup */}
        {isLeavePopupOpen && (
          <ApplyLeavePopup
            isOpen={isLeavePopupOpen}
            onClose={handleLeavePopupClose}
          />
        )}
      </div>
      <div className="h-px bg-gray-200" /> {/* Horizontal divider */}
    </div>
  );
};

export default Header;
