import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const Processing = () => {
  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 backdrop-blur-md p-6">
      <div className="bg-[#2A3042] p-8 rounded-xl shadow-2xl w-full max-w-sm sm:w-96 flex flex-col items-center text-center">
        <HourglassBottomIcon
          className="text-yellow-500 mb-3 animate-pulse"
          style={{ fontSize: "3rem" }}
        />
        <h2 className="text-xl font-semibold text-white mb-2">
          Processing Request...
        </h2>
        <p className="text-white text-sm mb-6">
          Please wait while we complete your action.
        </p>
        <CircularProgress size={40} thickness={4} className="text-yellow-500" />
      </div>
    </div>
  );
};

export default Processing;
