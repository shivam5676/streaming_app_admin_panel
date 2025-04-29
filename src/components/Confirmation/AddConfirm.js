// import React from "react";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import Processing from "./Processing";

// const AddConfirm = ({
//   message,
//   setConfirmAdd,
//   videoFiles,
//   setvideoFiles,
//   addVideoLoader,
//   addFun,
//   setUploadMoreMovies,
//   MovieName,
// }) => {
//   const hasFiles = videoFiles?.length > 0;

//   return (
//     <>
//       {!addVideoLoader ? (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-[100000] p-6">
//           <div className="bg-[#2A3042] p-6 sm:p-8 rounded-xl shadow-2xl w-full sm:w-96 max-w-lg">
//             {/* Icon & Heading */}
//             <div className="flex flex-col items-center text-center mb-4">
//               <WarningAmberIcon
//                 className="text-yellow-500 mb-2 animate-pulse"
//                 style={{ fontSize: "3rem" }}
//               />
//               <h2 className="text-2xl font-bold text-white mb-1">
//                 Confirm Changes
//               </h2>
//               {/* <p className="text-sm text-white">
//               {hasFiles
//                 ? ""
//                 : "No items selected to add."}
//             </p> */}
//             </div>

//             <div className="text-center text-white mb-1 text-sm">
//               <p>{message}</p>
//             </div>

//             <div className="text-center text-white mb-1 text-sm">
//               <div>
//                 <span>Movie Name - </span>
//                 <span className="text-white text-sm py-1 text-center font-semibold last:border-none">
//                   "{MovieName}"
//                 </span>
//               </div>
//             </div>

//             {/* File Summary */}
//             {hasFiles ? (
//               <div className="text-center text-white mb-1 text-sm">
//                 {/* <p>{message}</p> */}
//                 <p className="text-white mt-1">
//                   Total selected items:{" "}
//                   <span className="font-medium">{videoFiles.length}</span>
//                 </p>
//               </div>
//             ) : (
//               <div className="text-center text-white mb-1 text-sm">
//                 <p className="text-white mt-1">Do you want to save Changes?</p>
//               </div>
//             )}

//             {/* File Names */}
//             <div className="max-h-32 overflow-auto p-2 rounded-md mb-5 text-sm">
//               {videoFiles?.length > 0 &&
//                 videoFiles?.map((file, index) => (
//                   <div
//                     key={index}
//                     className="text-white text-sm py-1 text-center font-semibold last:border-none"
//                   >
//                     "{file.name}"
//                   </div>
//                 ))}
//             </div>

//             {/* Action Buttons */}
//             <div
//               className={`flex ${
//                 hasFiles ? "justify-between" : "justify-center"
//               } gap-4`}
//             >
//               <>
//                 <button
//                   onClick={() => {
//                     setConfirmAdd(false);
//                     // setvideoFiles([]);
//                     setUploadMoreMovies(false);
//                   }}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium transition-all hover:bg-gray-300 hover:scale-105 active:scale-100"
//                 >
//                   <CancelIcon fontSize="small" />
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     addFun();
//                     setvideoFiles([]);
//                     setUploadMoreMovies(false);
//                   }}
//                   className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium transition-all hover:bg-red-600 hover:scale-105 active:scale-100"
//                 >
//                   <CheckCircleIcon fontSize="small" />
//                   Confirm
//                 </button>
//               </>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Processing />
//       )}
//     </>
//   );
// };

// export default AddConfirm;

import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Processing from "./Processing";

const AddConfirm = ({
  message,
  setConfirmAdd,
  videoFiles,
  setvideoFiles,
  addVideoLoader,
  addFun,
  setUploadMoreMovies,
  MovieName,
}) => {
  const hasFiles = videoFiles?.length > 0;

  return (
    <>
      {!addVideoLoader ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-[100000] p-6">
          <div className="bg-[#2A3042] p-6 sm:p-8 rounded-xl shadow-2xl w-full sm:w-[420px] max-w-lg space-y-4">
            {/* Top Section */}
            <div className="flex flex-col items-center text-center">
              <WarningAmberIcon
                className="text-yellow-500 mb-2 animate-pulse"
                style={{ fontSize: "3rem" }}
              />
              <h2 className="text-2xl font-bold text-white">
                Confirmation Required
              </h2>
              <p className="text-sm text-gray-300 mt-1">{message}</p>
            </div>

            {/* Movie Info */}
            <div className="text-center">
              {MovieName?.length > 0 && (
                <p className="text-gray-400 text-sm">
                  <span className="text-gray-300">Movie Name:</span>
                  <span className="font-semibold text-white ml-1">
                    "{MovieName}"
                  </span>
                </p>
              )}
            </div>

            {/* File Summary */}
            {hasFiles ? (
              <div className="text-center">
                {/* <p className="text-gray-300 text-sm">
                  Total files selected:{" "}
                  <span className="font-semibold text-white">
                    {videoFiles.length}
                  </span>
                </p> */}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-300 text-sm">
                  Do you want to save the changes?
                </p>
              </div>
            )}

            {/* Files Table */}
            {hasFiles && (
              <div className="max-h-40 overflow-y-auto rounded-md border border-gray-600">
                <table className="min-w-full text-sm text-left text-gray-300">
                  <thead className="bg-[#1F2533] text-gray-400 uppercase text-xs">
                    <tr>
                      <th scope="col" className="px-4 py-2">
                        No.
                      </th>
                      <th scope="col" className="px-4 py-2">
                        File Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {videoFiles.map((file, index) => (
                      <tr key={index} className="hover:bg-[#3A4054]">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2 break-words">{file.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Action Buttons */}
            <div
              className={`flex ${
                hasFiles ? "justify-between" : "justify-center"
              } gap-4 pt-2`}
            >
              <button
                onClick={() => {
                  setConfirmAdd(false);
                  setUploadMoreMovies(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium transition-all hover:bg-gray-400 hover:scale-105 active:scale-100"
              >
                <CancelIcon fontSize="small" />
                Cancel
              </button>
              <button
                onClick={() => {
                  addFun();
                  setvideoFiles([]);
                  setUploadMoreMovies(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium transition-all hover:bg-red-600 hover:scale-105 active:scale-100"
              >
                <CheckCircleIcon fontSize="small" />
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Processing />
      )}
    </>
  );
};

export default AddConfirm;
