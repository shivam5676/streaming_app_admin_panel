import React from "react";
import DragNDropImage from "./DragNDropImage";
import LayoutSelector from "./layoutSelector";

const AddMovies = () => {
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="text-white px-2 py-4 ">
        <p className="text-lg font-bold">Add Movie</p>
        <p className="text-[.95rem] font-semibold">
          <span>Reelisis</span> <span className="mx-2"> &gt; </span>
          <span>Movies section</span>
          <span className="mx-2"> &gt; </span>
          <span>Add Movie</span>
        </p>
      </div>
      <section className="w-[100%]">
        <div className="flex gap-6 flex-col xl:flex-row">
          <div className="bg-[#2A3042] flex-1  rounded-md text-white">
            <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
              <p>Movie Info</p>
            </div>
            <div className="m-4 font-semibold">
              <p>Title</p>
              <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input>
            </div>
            <div className="m-4 font-semibold">
              <p>Select Layout</p>
              <LayoutSelector />
              {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
            </div>
            <div className="flex sm:flex-row flex-col">
              <div className="p-4 font-semibold w-[100%] sm:w-[50%]">
                <p>Free Videos</p>

                <input
                  defaultValue="0"
                  className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)]  rounded-md my-2"
                ></input>
              </div>
              <div className="p-4 font-semibold w-[100%] sm:w-[50%]">
                <p>Visible</p>

                <select className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-white  rounded-md my-2">
                  <option>Yes,make it live</option>
                  <option>No,will make it live later</option>
                </select>
              </div>
              {/* <div className="p-4 font-semibold w-[100%] md:w-[50%] flex justify-center items-center">
                <div className="w-fit h-fit bg-[#626ED4] px-6 py-2 hover:bg-[#5764d4] cursor-pointer rounded-md">
                  Add
                </div>
              </div> */}
            </div>
          </div>
          <div className="bg-[#2A3042] flex-1  rounded-md text-white">
            <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
              <p>Additional Info</p>
            </div>
            <div className="m-4 font-semibold">
              <p>Thumbnail</p>
              <div className="flex flex-col-reverse sm:flex-row w-[100%] py-4 md:gap-16 gap-8 items-center">
                {" "}
                <DragNDropImage></DragNDropImage>
                <div className="w-[150px] h-[220px] rounded-md">
                  <div className="border w-[100%] h-[100%] rounded-md"></div>
                </div>
              </div>
              {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
            </div>
          </div>
        </div>
        <div className="flex  bg-[#2A3042] w-[100%] my-4 p-4">
          <div className="flex flex-shrink-0 border-dashed text-white border-white border-2 w-[300px] min-h-[300px] mx-4 items-center justify-center ">
            <p className="text-xl font-semibold">upload shorts here </p>
          </div>{" "}
          <div className="w-[100%] border-2 flex flex-wrap p-2">
          <div className="bg-white h-[100px] w-[150px] m-2"></div>{" "}
            <div className="bg-white h-[100px] w-[150px] m-2"></div>
            <div className="bg-white h-[100px] w-[150px] m-2"></div>
            <div className="bg-white h-[100px] w-[150px] m-2"></div>
            <div className="bg-white h-[100px] w-[150px] m-2"></div> <div className="bg-white h-[100px] w-[150px] m-2"></div>{" "}
            <div className="bg-white h-[100px] w-[150px] m-2"></div>
            <div className="bg-white h-[100px] w-[150px] m-2"></div>
            <div className="bg-white h-[100px] w-[150px] m-2"></div>
            <div className="bg-white h-[100px] w-[150px] m-2"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovies;
