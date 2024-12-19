import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import {
  deleteLayoutsApi,
  deleteLinkedMoviesApi,
} from "../../Api/Layouts/layoutApi";

const EditLAyoutPrint = ({ AllLayoutsData }) => {
  const removeLinkedMovies = async (id) => {
    try {
      const deleteMoviesResponse = await deleteLinkedMoviesApi(
        id,
        AllLayoutsData._id
      );

      toast.success("movie unlinked successfully");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className=" m-4  border-white border ">
      <div className="flex m-2 overflow-x-none flex-wrap">
        {AllLayoutsData?.linkedMovies?.map((current) => {
          return (
            <div className="bg-white text-gray-700 text-[.8rem] p-2 m-2 rounded flex items-center">
              <p>{current?.name}</p>
              <IoMdCloseCircle
                className="ms-2 h-[20px] w-[20px] text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => {
                  removeLinkedMovies(current._id);
                }}
              />
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default EditLAyoutPrint;
