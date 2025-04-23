import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Processing from "./Processing";

const AddConfirm = ({ message, setConfirmAdd, videoFiles, setvideoFiles, addVideoLoader, addFun }) => {
  const hasFiles = videoFiles?.length > 0;

  return (
    <>
    {
      !addVideoLoader ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-[100000] p-6">
        <div className="bg-[#2A3042] p-6 sm:p-8 rounded-xl shadow-2xl w-full sm:w-96 max-w-lg">
          {/* Icon & Heading */}
          <div className="flex flex-col items-center text-center mb-4">
            <WarningAmberIcon
              className="text-yellow-500 mb-2 animate-pulse"
              style={{ fontSize: "3rem" }}
            />
            <h2 className="text-2xl font-bold text-white mb-1">Confirm Add Action</h2>
            <p className="text-sm text-white">
              {hasFiles
                ? ""
                : "No items selected to add."}
            </p>
          </div>
  
          {/* File Summary */}
          {hasFiles && (
            <div className="text-center text-white mb-1 text-sm">
              <p>{message}</p>
              <p className="text-white mt-1">
                Total selected items: <span className="font-medium">{videoFiles.length}</span>
              </p>
            </div>
          )}
  
          {/* File Names */}
          <div className="max-h-32 overflow-auto p-2 rounded-md mb-5 text-sm">
            {videoFiles?.map((file, index) => (
              <div
                key={index}
                className="text-white text-sm py-1 text-center font-semibold last:border-none"
              >
                "{file.name}"
              </div>
            ))}
          </div>
  
          {/* Action Buttons */}
          <div className={`flex ${hasFiles ? "justify-between" : "justify-center"} gap-4`}>
            {hasFiles ? (
              <>
                <button
                  onClick={() => {
                    setConfirmAdd(false);
                    setvideoFiles([]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium transition-all hover:bg-gray-300 hover:scale-105 active:scale-100"
                >
                  <CancelIcon fontSize="small" />
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setvideoFiles([]);
                    addFun()
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium transition-all hover:bg-red-600 hover:scale-105 active:scale-100"
                >
                  <CheckCircleIcon fontSize="small" />
                  Confirm
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirmAdd(false)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium transition-all hover:bg-orange-600 hover:scale-105 active:scale-100"
              >
                <CheckCircleIcon fontSize="small" />
                Got it!
              </button>
            )}
          </div>
        </div>
      </div>
      ):(
        <Processing/>
      )
    }
    </>
  );
};

export default AddConfirm;
