import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const DeleteConfirm = ({ message, name, setConfirmDelete }) => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-[100000] p-9">
      <div className="bg-[#2A3042] p-8 rounded-xl shadow-2xl w-full sm:w-96 max-w-lg">
        {/* Icon and Title */}
        <div className="flex flex-col items-center text-center mb-2">
          <WarningAmberIcon
            className="text-yellow-500 mb-2 animate-pulse"
            style={{ fontSize: "3rem" }}
          />
          <h2 className="text-xl font-semibold text-white">
            {name.length > 0 ? "Are You Sure?" : "No Item Selected!"}
          </h2>
        </div>

        {/* Message */}
        <p className="text-sm leading-relaxed text-white text-center">
          {name.length > 0
            ? (<div className="mb-2"><div>{message}</div><div>The total selected items: {name.length}</div></div>)
            : "Please select atleast one item to delete."}
        </p>
        <div className="mb-6 max-h-28 overflow-auto">
          {name?.map((i) => {
            return (
              <div className="text-white text-sm font-semibold text-center">"{i}"</div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          {name.length > 0 ? (
            <>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium transition-all hover:bg-gray-300 hover:scale-105 active:scale-100"
              >
                <CancelIcon fontSize="small" />
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  if (name.length === 1) {
                    toast.success(`"${name}" Deleted Successfully!`);
                  } else {
                    toast.success(`All Selected Deleted Successfully!`);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium transition-all hover:bg-red-600 hover:scale-105 active:scale-100"
              >
                <CheckCircleIcon fontSize="small" />
                Confirm
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setConfirmDelete(false);
              }}
              className="flex items-center mx-auto gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium transition-all hover:bg-orange-600 hover:scale-105 active:scale-100"
            >
              <CheckCircleIcon fontSize="small" />
              Got it!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
