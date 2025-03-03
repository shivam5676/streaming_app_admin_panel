import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSliceAction } from "../../store/themeSlice";
import { IoMdClose } from "react-icons/io";
import { FaAffiliatetheme } from "react-icons/fa6";

const ThemeSelector = () => {
  const dispatch = useDispatch();

  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const themeList = [
    { name: "Yellow Majestic" },
    { name: "modern reeloid" },
    { name: "default" },
  ];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => dispatch(themeSliceAction.themeMode())}
    >
      <div
        className="relative bg-white rounded-lg shadow dark:bg-gray-700   w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  w-8 h-8 flex justify-center items-center"
          onClick={() => dispatch(themeSliceAction.themeMode())}
        >
          <IoMdClose className="w-[20px] h-[20px]" />
        </button>
        <div className="p-4 md:p-5 text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 border-b-2">
            Select Your New Theme
          </h3>
          <div className="w-[100%] flex flex-wrap justify-center text-[.9rem] font-semibold p-2">
            {themeList.map((current) => (
              <div className="p-2" onClick={()=>{
                dispatch(themeSliceAction.changeTheme(current.name))
              }}>
                {" "}
                <div
                  className={`border ${
                    selectedTheme == current.name
                      ? "border-blue-500"
                      : "border-gray-400"
                  } rounded w-[80px] h-[50px]  relative`}
                >
                  {selectedTheme == current.name && (
                    <div className="bottom-0 right-0 absolute text-blue-500">
                      <FaAffiliatetheme />
                    </div>
                  )}
                </div>
                <p className="w-[80px] text-center">{current.name}</p>
              </div>
            ))}
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
