import React from "react";
import { useNavigate } from "react-router-dom";
import { layoutSliceACtion } from "../../store/layoutSlice";
import { useDispatch } from "react-redux";
import { deleteLayoutsApi } from "../../Api/Layouts/layoutApi";

const AllLAyoutPrint = ({ allLayouts, handleSelectChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteLayoutHandler = async (id) => {
    try {
      const response = deleteLayoutsApi(id);
      if (!response) {
        toast.error("invalid id");

        return;
      }
      dispatch(layoutSliceACtion.deleteLayout(id));
      toast.success("movie deleted successfully");
    } catch (err) {
      toast.error("something went wrong");
    }
  };
  // const handleSelectChange = (id, event, name) => {
  //   const action = event.target.value;
  //   console.log(action);
  //   // Reset the select value after handling the event to ensure proper re-rendering
  //   event.target.value = ""; // Reset the value to ensure change is recognized next time

  //   if (action === "DELETE") {
  //     deleteLayoutHandler(id);
  //   } else if (action === "EDIT") {
  //     navigate(`/allLayout/${id}`);
  //   }
  // };
  return (
    <>
      <div className="mx-4 font-normal text-[.9rem] min-w-[768px]">
        <div className="font-semibold flex border-b pb-2 border-gray-500">
          <div className="w-[50px] flex-shrink-0">
            <p className="p-2">sr</p>
          </div>
          <div className="w-[90px]  flex-shrink-0">
            <p className="p-2">action</p>
          </div>

          <div className="w-[100%] flex-shrink-1 mx-8">
            <p className="p-2">Name</p>
          </div>

          <div className="w-[80px]  flex-shrink-0">
            <p className="p-2">status</p>
          </div>
        </div>
        {/* items */}
        {allLayouts?.length > 0 &&
          allLayouts.map((current, index) => (
            <div className="font-normal flex my-2  border-b border-gray-500">
              <div className="w-[50px] p-2  flex-shrink-0">
                <p className="p-2">{index + 1}</p>
              </div>
              <div className="w-[90px] text-white font-semibold flex-shrink-0">
                <select
                  className="bg-[#3C445A] rounded-sm p-2"
                  onChange={(event) => handleSelectChange(current._id, event, current.name)}
                >
                  <option
                    value=""
                    // disabled
                    className="border-b-2 border-gray-400"
                  >
                    option
                  </option>
                  <option value="EDIT">EDIT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>

              <div className="w-[100%]  flex-shrink-1 mx-8">
                <p className="p-2">{current.name}</p>
              </div>

              <div className="w-[80px]  flex-shrink-0">
                {!current.visible ? (
                  <p className="px-2 py-1 font-semibold bg-red-500 rounded-md text-white text-[.8rem] flex justify-center text-center">
                    Not published
                  </p>
                ) : (
                  <p className="px-2 py-1 font-semibold bg-green-500 rounded-md text-white text-[.8rem] flex justify-center text-center">
                    Published
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllLAyoutPrint;
