// import React from "react";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import Processing from "./Processing";

// const DeleteConfirm = ({
//   message,
//   name,
//   setConfirmDelete,
//   deleteFun,
//   selectedIds,
//   checkType,
//   deleteVideoLoader,
//   MovieName,
// }) => {
//   return (
//     <>
//       {!deleteVideoLoader ? (
//         <>
//           <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-[100000] p-9">
//             <div className="bg-[#2A3042] p-8 rounded-xl shadow-2xl w-full sm:w-96 max-w-lg">
//               {/* Icon and Title */}
//               <div className="flex flex-col items-center text-center mb-2">
//                 <WarningAmberIcon
//                   className="text-yellow-500 mb-2 animate-pulse"
//                   style={{ fontSize: "3rem" }}
//                 />
//                 <h2 className="text-xl font-semibold text-white">
//                   {name.length > 0 ? "Are You Sure?" : "No Item Selected!"}
//                 </h2>
//               </div>

//               {/* Message */}
//               <p className="text-sm leading-relaxed text-white text-center mb-1">
//                 {name.length > 0 ? (
//                   <div className="mb-2">
//                     <div>{message}</div>
//                     <div>
//                       <span>Movie Name - </span>
//                       <span className="text-white text-sm py-1 text-center font-semibold last:border-none">
//                         "{MovieName}"
//                       </span>
//                     </div>
//                     <div>The total selected items: {name.length}</div>
//                   </div>
//                 ) : (
//                   "Please select atleast one item to delete."
//                 )}
//               </p>
//               <div className="mb-6 max-h-28 overflow-auto">
//                 {name?.map((i) => {
//                   return (
//                     <div className="text-white text-sm font-semibold text-center">
//                       "{i}"
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-between gap-4">
//                 {name.length > 0 ? (
//                   <>
//                     <button
//                       onClick={() => setConfirmDelete(false)}
//                       className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium transition-all hover:bg-gray-300 hover:scale-105 active:scale-100"
//                     >
//                       <CancelIcon fontSize="small" />
//                       Cancel
//                     </button>
//                     <button
//                       onClick={() => {
//                         // setConfirmDelete(false);
//                         // if (name.length === 1) {
//                         //   toast.success(`"${name}" Deleted Successfully!`);
//                         // } else {
//                         //   toast.success(`All Selected Deleted Successfully!`);
//                         // }
//                         deleteFun(selectedIds, name, checkType);
//                       }}
//                       className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium transition-all hover:bg-red-600 hover:scale-105 active:scale-100"
//                     >
//                       <CheckCircleIcon fontSize="small" />
//                       Confirm
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       setConfirmDelete(false);
//                       deleteFun(selectedIds);
//                     }}
//                     className="flex items-center mx-auto gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium transition-all hover:bg-orange-600 hover:scale-105 active:scale-100"
//                   >
//                     <CheckCircleIcon fontSize="small" />
//                     Got it!
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <Processing />
//       )}
//     </>
//   );
// };

// export default DeleteConfirm;

import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Processing from "./Processing";

const DeleteConfirm = ({
  message,
  name,
  setConfirmDelete,
  deleteFun,
  selectedIds,
  checkType,
  deleteVideoLoader,
  MovieName,
}) => {
  const hasItems = name?.length > 0;
  const multipleItems = name?.length > 1;

  return (
    <>
      {!deleteVideoLoader ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-[100000] p-6">
          <div className="bg-[#2A3042] p-6 sm:p-8 rounded-xl shadow-2xl w-full sm:w-96 max-w-lg space-y-6">
            {/* Icon and Title */}
            <div className="flex flex-col items-center text-center mb-4">
              <WarningAmberIcon
                className="text-yellow-500 mb-2 animate-pulse"
                style={{ fontSize: "3rem" }}
              />
              <h2 className="text-2xl font-bold text-white mb-1">
                {hasItems ? "Confirm Deletion" : "No Item Selected!"}
              </h2>
            </div>

            {/* Message */}
            <div className="text-center text-white text-sm mb-2">
              {hasItems ? (
                <>
                  <p className="mb-1">{message}</p>
                  {MovieName?.length > 0 && (
                    <div>
                      <span>Movie Name - </span>
                      <span className="font-semibold">"{MovieName}"</span>
                    </div>
                  )}
                  {/* <p className="mt-1">
                    Total selected items:{" "}
                    <span className="font-medium">{name.length}</span>
                  </p> */}
                </>
              ) : (
                <p>Please select at least one item to delete.</p>
              )}
            </div>

            {/* Selected Items List */}
            {hasItems && (
              <div className="max-h-32 overflow-auto p-2 rounded-md mb-5 text-sm bg-[#1f2535]">
                {multipleItems ? (
                  <table className="w-full text-left text-white text-xs">
                    <thead className="bg-[#1F2533] text-gray-400 uppercase text-xs">
                      <tr className="border-b border-gray-600">
                        <th className="py-2 px-2 font-semibold">No.</th>
                        <th className="py-2 px-2 font-semibold">File Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {name.map((item, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="py-2 px-2">{index + 1}</td>
                          <td className="py-2 px-2">"{item}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-white text-center">
                    <p className="text-sm">
                      File Name:{" "}
                      <span className="font-semibold">"{name[0]}"</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div
              className={`flex ${
                hasItems ? "justify-between" : "justify-center"
              } gap-4`}
            >
              {hasItems ? (
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
                      deleteFun(selectedIds, name, checkType);
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
      ) : (
        <Processing />
      )}
    </>
  );
};

export default DeleteConfirm;
