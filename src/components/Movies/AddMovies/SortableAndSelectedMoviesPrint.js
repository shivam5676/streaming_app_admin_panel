import React, { useEffect, useState } from "react";
import { CgMenuOreos } from "react-icons/cg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ReactSortable } from "react-sortablejs";

const SortableAndSelectedMoviesPrint = ({ videoFiles,videoFilesSnapshot,sortArray ,deleteVideoHandler}) => {
    const [menuOpenIndex, setMenuOpenIndex] = useState(null);
    const handleSort=(newList)=>{
        sortArray(newList)
    }
      useEffect(() => {
        const handleClickOutside = (event) => {
          // Close the menu if clicked outside
          if (!event.target.closest(".menu-item")) {
            setMenuOpenIndex(null);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    const toggleMenu = (index) => {
        setMenuOpenIndex(menuOpenIndex === index ? null : index);
      };
  return (
    <ReactSortable
      list={videoFiles.map((_, index) => ({
        id: index,
        name: videoFiles[index].name,
      }))}
      setList={handleSort}
      className="w-[100%] border-2 border-gray-500 grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 p-2 my-2"
    >
      {videoFiles.map((current, index) => (
        <div key={index} className="relative  bg-white h-[100px] m-2 group">
          <img
            src={videoFilesSnapshot[index]}
            alt={`Snapshot of `}
            className="h-[100%] w-[100%] object-cover select-none text-sm"
            draggable="false"
          />
          <div
            className={`absolute top-0 left-0 right-0  bg-opacity-80 text-white text-xs p-1 font-bold text-center break-words  select-none ${
              current.name == "Personalised Ads"
                ? "bg-yellow-800"
                : "bg-sky-800"
            }`}
          >
            {current.name}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <CgMenuOreos
              className="text-white text-lg cursor-pointer w-[30px] h-[30px]  select-none"
              // onClick={() => {
              //   deleteVideoHandler(index);
              // }}
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-sky-800 p-3 rounded-ss-2xl bg-opacity-90 text-white text-sm font-bold  text-center break-words  select-none">
            {index + 1}
          </div>
          <div className="absolute bottom-0 left-0 p-1 rounded-ss-2xl bg-opacity-90 text-white text-sm font-bold  text-center break-words  select-none">
           
            {/*if i hovers on it then a menu will open with three option delete ,premium/ and othrs*/}

            <HiOutlineDotsVertical
              className="cursor-pointer"
              onClick={() => toggleMenu(index)}
            />
            {menuOpenIndex === index && (
              <div className="menu-item absolute bottom-0 left-0 mb-2 bg-white text-black text-sm shadow-lg rounded p-2 w-[120px] z-10">
                <ul>
                  <li
                    className="hover:bg-gray-200 p-1 cursor-pointer"
                    onClick={() => {
                      deleteVideoHandler(index);
                      setMenuOpenIndex(null);
                    }}
                  >
                    Delete
                  </li>
                  <li
                    className="hover:bg-gray-200 p-1 cursor-pointer"
                    onClick={() => console.log("Premium")}
                  >
                    Premium
                  </li>
                  <li
                    className="hover:bg-gray-200 p-1 cursor-pointer"
                    onClick={() => console.log("Others")}
                  >
                    Others
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </ReactSortable>
  );
};

export default SortableAndSelectedMoviesPrint;
