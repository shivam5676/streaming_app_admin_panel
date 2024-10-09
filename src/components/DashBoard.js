import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import React from "react";
import movieIcon from "../assests/movie-animate.gif";
import arrowAnimate from "../assests/upward_arrow-animate.gif";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaArrowUp,
} from "react-icons/fa";
import PyramidGraph from "./PyramidGraph";
import { VictoryPie } from "./../../node_modules/victory-pie/es/victory-pie";
const DashBoard = () => {
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="text-white px-2 py-4 ">
        <div className="text-[1rem] font-bold flex justify-between">
          <p className="text-[1rem] font-bold">DashBoard</p>
          <div className="border-2">
            {" "}
            <FormControl fullWidth>
              <Select
                defaultValue={30}
                inputProps={{
                  name: "age",
                  id: "controlled-native",
                }}
                sx={{
                  // Styles for the select element
                  fontSize: "0.875rem", // Small text size
                  color: "white", // Text color
                  backgroundColor: "transparent", // Background color for the select
                  height: "32px", // Reduce height of the select
                  "& .MuiSelect-select": {
                    border: "none", // Remove border
                    backgroundColor: "transparent", // Background color for selected option
                    padding: "4px 10px", // Adjust padding to control height
                    outline: "none", // Remove outline on focus

                    "&:focus": {
                      outline: "none", // Remove outline on focus
                    },
                  },
                  // Styles for the dropdown options
                  "& .MuiMenuItem-root": {
                    backgroundColor: "gray", // Background color for dropdown options
                    "&:hover": {
                      backgroundColor: "darkgray", // Background color on hover
                    },
                  },
                }}
              >
                <MenuItem value={10}>Current Month</MenuItem>
                <MenuItem value={20}>Current Year</MenuItem>
                <MenuItem value={30}>All Time</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <p className="text-[.95rem] font-semibold text-gray-400">
          <span>Welcome to Reelies Dashboard</span>
        </p>
        <section className="w-[100%]  grid xl:grid-cols-4 sm:grid-cols-2  gap-4 py-2">
          <div className="bg-[#626ED4] h-[156px] flex flex-col p-4">
            <div className="flex">
              <div className="p-2 bg-[#7984DA] h-fit rounded-md">
                <img src={movieIcon} className="h-[50px] w-[50px]"></img>
              </div>{" "}
              <div className="p-2 text-xl font-semibold text-gray-300">
                <p className="">Movie</p>
                <div className="text-white flex">
                  <p>33393</p>
                  <div className="flex items-center px-2">
                    <FaArrowUp className="text-green-500" />
                    {/* <img src={arrowAnimate} className="w-[30px] h-[30px]"></img> */}
                  </div>
                </div>
              </div>
            </div>
            <div className=" h-[100px]">
              <div className="flex text-[.9rem] font-semibold justify-between py-1">
                <div className="flex items-center">
                  <FaArrowAltCircleUp className="text-green-400" />
                  <div className="px-2 flex flex-col items-center">
                    <p>Published</p>
                    <p>(2200)</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaArrowAltCircleDown className="text-red-400" />
                  <div className="px-2 flex flex-col items-center">
                    <p>Unpublished</p>
                    <p>(2200)</p>
                  </div>
                </div>
              </div>{" "}
            </div>
            {/* <p className="text-[.8rem] text-gray-300 font-semibold">This Month Data</p> */}
          </div>{" "}
        </section>
      </div>
    </div>
  );
};

export default DashBoard;
