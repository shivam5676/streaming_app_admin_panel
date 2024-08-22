import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

const AddLayout = () => {
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="text-white px-2 py-4 ">
        <p className="text-lg font-bold">Add Layout</p>
        <p className="text-[.95rem] font-semibold">
          <span>Reelisis</span> <span className="mx-2"> &gt; </span>
          <span>Layout section</span>
          <span className="mx-2"> &gt; </span>
          <span>Add Layout</span>
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
              <p>Title</p>
              <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input>
            </div>
            <div className="m-4 font-semibold">
              <p>Description</p>
              <textarea className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></textarea>
            </div>
            <div className="m-4 font-semibold">
              <FormGroup>
                {" "}
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Do you Want to add content now in this layout?"
                />
              </FormGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddLayout;
