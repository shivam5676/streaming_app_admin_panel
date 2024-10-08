import axios from "axios";
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfileDetailsEditModal = ({ target, closeModal }) => {
  const titleRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const params = useParams();
  const connectionString = process.env.REACT_APP_API_URL;
  const updateDetailsHAndler = async () => {
    // console.log(
    //   //   titleRef.current.value,
    //   emailRef.current.value
    //   //   mobileRef.current.value
    // );
    if (
      target == "email" &&
      (!emailRef?.current || !emailRef?.current?.value)
    ) {
      toast.error("please provide email id");
      return;
    }
    if (
      target == "mobile" &&
      (!mobileRef?.current || !mobileRef?.current?.value)
    ) {
      toast.error("please provide mobile no");
      return;
    }
    if (target == "name" && (!titleRef?.current || !titleRef?.current?.value)) {
      toast.error("please provide name");
      return;
    }
    try {
      const res = await axios.put(
        `${connectionString}/admin/updateUserDetails`,
        {
          userId: params.uid,
          type: target,
          updatedData:
            titleRef?.current?.value ||
            mobileRef?.current?.value ||
            emailRef?.current?.value,
        }
      );
    //   setUserDetails(res.data.userDetails);
      toast.success("user fetched successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal} // Close modal when clicking outside the modal content
    >
      <div
        className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
          onClick={closeModal}
        >
          <IoMdClose className="w-[20px] h-[20px]" />
        </button>
        <div className="p-4 md:p-5 text-center">
          {
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 border-b-2">
              {target === "name" && "Please Provide New Name"}
              {target === "email" && "Please Provide New Email"}
              {target === "mobile" && "Please Provide New Mobile No"}
            </h3>
          }
          <div className="w-[100%] flex justify-center text-[.9rem] font-semibold pb-4">
            {/* <label className="w-[100px]"> Name</label> */}
            {target === "name" && (
              <input
                className="mx-2 border-gray-500 border rounded-md w-[100%] p-2"
                placeholder="Enter new Name here..."
                type="text"
                ref={titleRef}
              ></input>
            )}
            {target === "email" && (
              <input
                className="mx-2 border-gray-500 border rounded-md w-[100%] p-2"
                placeholder="Enter new Email Id here..."
                type="email"
                required
                ref={emailRef}
              ></input>
            )}
            {target === "mobile" && (
              <input
                className="mx-2 border-gray-500 border rounded-md w-[100%] p-2"
                placeholder="Enter New Mobile No here..."
                type="tel"
                required
                ref={mobileRef}
              ></input>
            )}
          </div>

          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={updateDetailsHAndler}
          >
            Update
          </button>
          <button
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetailsEditModal;
