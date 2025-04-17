import React from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import loader from "../../assests/loader.gif";
import success from "../../assests/verified.gif";
import { RxCross2 } from "react-icons/rx";
import errorImg from "../../assests/broken-battery.gif";
import loadingStatusGif from "../../assests/fileStatusLoader.gif";
import { useNavigate } from "react-router-dom";
const SavingLoaderModal = (props) => {
  const navigate=useNavigate()
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
      // onClick={props.closeModal} // Close modal when clicking outside the modal content
    >
      <div
        className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {(props.success == "Success" || props.success == "Error") && (
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
            onClick={props.closeModal}
          >
            <IoMdClose className="w-[20px] h-[20px]" />
          </button>
        )}
        {props.success != "Error" && (
          <div className="p-4 md:p-5 text-center">
            <div className="flex justify-center">
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-yellow-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full "
                  style={{ width: `${props.uploadingPercentage}%` }}
                >
                  {props?.uploadingPercentage}%
                  {props?.uploadingPercentage == 100 && " uploaded"}
                </div>
              </div>
            </div>
            <div className="w-[100%] flex flex-col items-start text-[.65rem] font-semibold pt-2 pb-4 text-sm">
              <p
                className="w-[100%] text-gray-600 mb-4"
                style={{ textShadow: "2px 2px 8px gray" }}
              >
                {props.message}
              </p>
              <div
                className={`font-semibold text-[.8rem] flex items-center gap-2`}
              >
                <p>Step 1:</p>
                {(props.success == "Pending" ||
                  props.uploadingPercentage < 100) && (
                  <div className="flex items-center">
                    {" "}
                    <p>Uploading</p>{" "}
                    <img
                      src={loadingStatusGif}
                      className="h-[30px] w-[30px] mx-1"
                    ></img>
                  </div>
                )}

                {(props.success == "Extracting" ||
                  props.uploadingPercentage == 100) && (
                  <>
                    <span>Uploaded</span>
                    <IoMdCheckmark className="mx-1  font-bold text-yellow-500 h-[20px] w-[20px]"></IoMdCheckmark>
                  </>
                )}
              </div>
              <div
                className={`font-semibold text-[.8rem] flex items-center gap-2 ${
                  props.uploadingPercentage < 100 &&
                  "text-[.7rem] text-gray-600"
                }`}
              >
                Step 2:
                {console.log(props.success)}
                {(props.success == "Pending" ||
                  props.uploadingPercentage < 100) &&<span>Extraction </span>}
                {(props.uploadingPercentage == 100 ||
                  props.status == "Extraction") &&
                  props.success != "Success" && (
                    <div className="flex items-center">
                      {" "}
                      <p>Extracting</p>{" "}
                      <img
                        src={loadingStatusGif}
                        className="h-[30px] w-[30px] mx-1"
                      ></img>
                    </div>
                  )}
                {props.success == "Success" && (
                  <>
                    <span>Extracted</span>
                    <IoMdCheckmark className="mx-2 text-green-700 font-semibold"></IoMdCheckmark>
                  </>
                )}
              </div>
            </div>
            {(props.success == "Success" || props.success == "Error") && (
              <div
                className={`cursor-pointer relative text-[.9rem] hover:shadow-md  inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-bold text-[#26868d] transition duration-300 ease-out border-2 ${
                  (props.success === "Success" && "border-[#5fd6df]") ||
                  (props.success === "Error" && "border-[#FF5733]")
                } rounded-md shadow-md group`}
                // style={{ textShadow: "2px 2px 8px #facc15" }}
                onClick={() => {
                  props.closeModal();
                }}
              >
                <span
                  class={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full ${
                    (props.success === "Success" && "bg-[#5fd6df]") ||
                    (props.success === "Error" && "bg-[#FF5733]")
                  } group-hover:translate-x-0 ease`}
                >
                  <RxCross2 className="w-[25px] h-[25px]" />
                </span>
                <span
                  className={`absolute  flex items-center justify-center w-full h-full ${
                    (props.success === "Success" && "text-[#5fd6df]") ||
                    (props.success === "Error" && "text-[#FF5733]")
                  } transition-all duration-300 transform group-hover:translate-x-full ease`}
                >
                  Close
                </span>
                <span className="relative invisible">Close</span>
              </div>
            )}
          </div>
        )}
        {props.success == "Error" && (
          <div className="p-4 md:p-5 text-center">
            <div className="flex justify-center">
              <img
                src={
                  (props.success === "Success" && success) ||
                  (props.success === "Error" && errorImg)
                }
                className="w-[80px] h-[80px]"
              />
            </div>
            <div className="w-[100%] flex flex-col items-start text-[.65rem] font-semibold pt-2 pb-4 text-sm">
              <p
                className="w-[100%] text-gray-600 mb-4"
                style={{ textShadow: "2px 2px 8px gray" }}
              >
                {props.message}
              </p>
            </div>
            {(props.success == "Success" || props.success == "Error") && (
              <div
                className={`cursor-pointer relative text-[.9rem] hover:shadow-md  inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-bold text-[#26868d] transition duration-300 ease-out border-2 ${
                  (props.success === "Success" && "border-[#5fd6df]") ||
                  (props.success === "Error" && "border-[#FF5733]")
                } rounded-md shadow-md group`}
                // style={{ textShadow: "2px 2px 8px #facc15" }}
                onClick={() => {
                  if (props.success == "Success" ){
                    navigate(-1)
                  }
                  props.closeModal();
                }}
              >
                <span
                  class={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full ${
                    (props.success === "Success" && "bg-[#5fd6df]") ||
                    (props.success === "Error" && "bg-[#FF5733]")
                  } group-hover:translate-x-0 ease`}
                >
                  <RxCross2 className="w-[25px] h-[25px]" />
                </span>
                <span
                  className={`absolute  flex items-center justify-center w-full h-full ${
                    (props.success === "Success" && "text-[#5fd6df]") ||
                    (props.success === "Error" && "text-[#FF5733]")
                  } transition-all duration-300 transform group-hover:translate-x-full ease`}
                >
                  Close
                </span>
                <span className="relative invisible">Close</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingLoaderModal;
