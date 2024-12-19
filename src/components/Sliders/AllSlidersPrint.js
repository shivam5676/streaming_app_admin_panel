import React from "react";
import { useSelector } from "react-redux";

const AllSlidersPrint = ({ allSliders }) => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  return (
    <>
      {" "}
      {allSliders?.length > 0 &&
        allSliders?.map((current, index) => {
          return (
            <div className="font-normal flex my-2  border-b border-gray-500">
              <div className="w-[50px] p-2  flex-shrink-0">
                <p className="p-2">{index + 1}</p>
              </div>
              <div className="w-[90px] text-white font-semibold flex-shrink-0">
                <select
                  className={`${
                    selectedTheme === "modern reeloid"
                      ? "bg-[#3C445A]/70 backdrop-blur-sm rounded"
                      : "bg-[#3C445A]"
                  } rounded-sm p-2`}
                  onChange={(event) => {
                    handleSelectChange(current._id, event);
                  }}
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
              <div className="w-[150px]  flex-shrink-0  mx-8">
                <p className="p-2">{current?.type}</p>
              </div>
              <div className="w-[50%]  flex-shrink-1 mx-8">
                <p className="p-2">{current?.schemaName}</p>
              </div>

              <div className="w-[50%]  flex-shrink-1 mx-8">
                <p className="p-2">{current?.linkedMovie?.name}</p>
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
          );
        })}
    </>
  );
};

export default AllSlidersPrint;
