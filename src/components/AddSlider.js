import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const AddSlider = () => {
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="text-white px-2 py-4 ">
        <p className="text-lg font-bold">Add Slider</p>
        <p className="text-[.95rem] font-semibold">
          <span>Reelisis</span> <span className="mx-2"> &gt; </span>
          <span>Hero section</span>
          <span className="mx-2"> &gt; </span>
          <span>Add Slider</span>
        </p>
      </div>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div className="bg-[#2A3042] flex-1  rounded-md text-white">
            <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
              <p>Layout Info</p>
            </div>
            <div className="m-4 font-semibold">
              <p>Slider Name</p>
              <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input>
            </div>
            <div className="p-4 font-semibold w-[100%]">
              <p>Slider Type</p>

              <select className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-white  rounded-md my-2">
                <option>Promotional</option>
                <option>Trailer</option>
                <option>Movies_shorts</option>
              </select>
            </div>
            {/* if user select Movies_shorts then this will dropdown all movies  from backend and  thier shorts will be  linked to the slide*/}
            <div className="p-4 font-semibold w-[100%]">
              <p>Link Movies to this Slide</p>

              <select className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-white  rounded-md my-2">
                <option>Promotional</option>
                <option>Trailer</option>
                <option>Movies_shorts</option>
              </select>
            </div>

            <div className="p-4 font-semibold w-[100%]">
              <p>Additional Info</p>
              <div className=" p-4 flex flex-row gap-4">
                <div className=" w-[70%]">
                  
                  <div className=" border-dashed border-2 h-[400px] flex items-center justify-center"><p>Upload Thumbnail</p></div>
                </div>
                <div className=" border-2 w-[200px]">
                  <p>Thumbnail Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddSlider;
