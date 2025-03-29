import React, { useRef } from "react";
import RoutesInfoDiv from "./../commonComponents/RoutesInfoDiv";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const CreateAdmin = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  const titleRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const addAdminHandler = async () => {
    try {
      const response = await axios.post(
        `${connectionString}/admin/registerAdmin`,
        {
          name: titleRef.current.value,
          email: emailRef.current.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("admin added successfully .need to verify email for login");
    } catch (err) {
      toast.error("Something went wrong while adding admin ...");
    }
  };
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
          // onClick={props.closeModal}
        >
          <IoMdClose className="w-[20px] h-[20px]" />
        </button>
        <div className="p-4 md:p-5 text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 border-b-2">
            Add a new Admin
          </h3>
          <div className="w-[100%] flex justify-start text-[.9rem] font-semibold p-2">
            <label className="w-[100px]">Name :</label>
            <input
              className="mx-2 px-2 py-1 border-gray-500 border rounded-md"
              ref={titleRef}
            ></input>
          </div>
          <div className="w-[100%] flex justify-start text-[.9rem] font-semibold p-2">
            <label className="w-[100px]">Email :</label>
            <input
              className="mx-2 px-2 py-1 border-gray-500 border rounded-md"
              ref={emailRef}
            ></input>
          </div>

          <button
            type="button"
            className="text-white mt-4 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={addAdminHandler}
          >
            Create Admin
          </button>
          {/*when admin will create new admin then it will send the email verification to user with a confirmation link and when the user will click on this then he need to input confirm password password and validate id(which he will get from the admin and admin will get the validate id when he registered the user*/}
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
