import React from "react";
import { IoMdClose } from "react-icons/io";
import loader from "../../assests/loader.gif";
import success from "../../assests/verified.gif";
import { RxCross2 } from "react-icons/rx";
import errorImg from "../../assests/broken-battery.gif";
const SavingLoaderModal = (props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      // onClick={props.closeModal} // Close modal when clicking outside the modal content
    >
      <div
        className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
          onClick={props.closeModal}
        >
          <IoMdClose className="w-[20px] h-[20px]" />
        </button>
        <div className="p-4 md:p-5 text-center">
          <div className="flex justify-center">
            <img
              src={
                (props.success === "pending" && loader) ||
                (props.success === "success" && success) ||
                (props.success === "error" && errorImg)
              }
              className="w-[80px] h-[80px]"
            />
          </div>
          <div className="w-[100%] flex justify-start text-[.9rem] font-semibold pt-2 pb-4">
            <p
              className="w-[100%] text-[1.2rem] text-gray-600"
              style={{ textShadow: "2px 2px 8px gray" }}
            >
              {props.message}
            </p>
          </div>
          <div
            className={`cursor-pointer relative text-[.9rem] hover:shadow-md  inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-bold text-[#26868d] transition duration-300 ease-out border-2 ${
              (props.success === "success" && "border-[#5fd6df]") ||
              (props.success === "error" && "border-[#FF5733]") ||
              (props.success === "pending" && "border-[#FFC107]")
            } rounded-md shadow-md group`}
            // style={{ textShadow: "2px 2px 8px #facc15" }}
            onClick={() => {
              props.closeModal();
            }}
          >
            <span
              class={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full ${
                (props.success === "success" && "bg-[#5fd6df]") ||
                (props.success === "error" && "bg-[#FF5733]") ||
                (props.success === "pending" && "bg-[#FFC107]")
              } group-hover:translate-x-0 ease`}
            >
              <RxCross2 className="w-[25px] h-[25px]" />
            </span>
            <span
              className={`absolute  flex items-center justify-center w-full h-full ${
                (props.success === "success" && "text-[#5fd6df]") ||
                (props.success === "error" && "text-[#FF5733]") ||
                (props.success === "pending" && "text-[#FFC107]")
              } transition-all duration-300 transform group-hover:translate-x-full ease`}
            >
              Close
            </span>
            <span className="relative invisible">Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingLoaderModal;
