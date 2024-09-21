import axios from "axios";
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const AddGenreModal = (props) => {
  const connectionString = process.env.REACT_APP_API_URL;
  const titleRef = useRef("");
  const iconref = useRef("");
  const addGenreHAndler = async () => {
    const formData = new FormData();
    formData.append("name", titleRef.current.value);
    formData.append("icon", iconref.current.files[0]);

    try {
      const res = await axios.post(
        `${connectionString}/admin/addGenre`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      toast.success("Genre Added Successfully...");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={props.closeModal} // Close modal when clicking outside the modal content
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
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 border-b-2">
            Add a new Genre
          </h3>
          <div className="w-[100%] flex justify-start text-[.9rem] font-semibold p-2">
            <label className="w-[100px]">Genre Name</label>
            <input
              className="mx-2 border-gray-500 border rounded-md"
              ref={titleRef}
            ></input>
          </div>
          <div className="w-[100%] flex justify-start text-[.9rem] font-semibold p-2">
            <label className="w-[100px]">Genre Icon</label>
            <input
              className="mx-2 border-gray-500 border rounded-md w-[180px]"
              type="file"
              ref={iconref}
            ></input>
          </div>
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={addGenreHAndler}
          >
            Submit
          </button>
          <button
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={props.closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGenreModal;
