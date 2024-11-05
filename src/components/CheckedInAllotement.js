import React, { useEffect, useState } from "react";
import RoutesInfoDiv from "./RoutesInfoDiv";
import coins from "../assests/coins.gif";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "./../../node_modules/@mui/x-date-pickers/AdapterDayjs/AdapterDayjs";

import CheckedInAllotementModal from "./checkedInAllotementModal";
import axios from "axios";
const CheckedInAllotement = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  const [checkedInData, setCheckedInData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    async function fetchCheckedInSlide() {
      try {
        const response = await axios.get(
          `${connectionString}/admin/allCheckedInSlide`
        );
        console.log(response.data.checkedInData);
        if (response.data.checkedInData) {
          setCheckedInData(response.data.checkedInData);
        }
      } catch (err) {
        console.log(err.response.data.msg);
        //   setSuccessTick("error");
        //   if (err.response && err.response.data.msg)
        //     setMessage(err.response.data.msg);
      }
    }
    fetchCheckedInSlide();
  }, []);
  return (
    <>
      {" "}
      <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
        <RoutesInfoDiv
          mainHeading={"Checked_In Points"}
          websiteName={"Reelies"}
          sectionName={"Others"}
          currentDir={"Checked_In Points section"}
        ></RoutesInfoDiv>
        <section className="w-[100%] h-fit">
          <div className="flex gap-6 flex-col xl:flex-row">
            <div className="bg-[#2A3042] flex-1  rounded-md text-gray-400 max-[690px]:overflow-auto py-2">
              <div className="m-4 text-[.9rem] font-semibold ">
                <div className="flex justify-between text-white">
                  <div className="flex items-center">
                    <>
                      {" "}
                      <p>Jump to Day</p>
                      <select className="bg-[#2E3648] text-[#959db6] mx-2 px-4 py-1  font-normal">
                        <option>10</option>
                        <option>10</option>
                        <option>10</option>
                      </select>
                    </>
                    <>
                      {" "}
                      <p>No Data is Present </p>
                    </>
                  </div>
                  <div className="flex items-center">
                    <div
                      onClick={() => setOpenModal(true)}
                      className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-yellow-600 text-yellow-600"
                    >
                      <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-yellow-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                      <span className="relative text-yellow-600 transition duration-300 group-hover:text-white ease font-bold">
                        Add Day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </section>
        <div className="w-[100%] bg-[#2A3042] my-2 grid 3xl:grid-cols-5 xl:grid-cols-4   lg:grid-cols-3 sm:grid-cols-2 gap-4 ">
          {checkedInData &&
            checkedInData.map((current) => {
              return (
                <div className="rounded-md bg-[#333F6B] min-h-[200px]  p-4 ">
                  <div className="w-full h-full bg-white rounded-md px-4 py-8 font-semibold flex flex-col justify-between">
                    <p className="font-bold text-[.9rem]">
                      Day - {current.Day + 1}
                    </p>
                    <p className="font-bold text-[1.2rem]">{current.title}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-[.9rem] flex items-center">
                        {" "}
                        + {current.allocatedPoints}{" "}
                        <img src={coins} className="w-[40px] h-[40px]"></img>
                      </p>
                      <div className="">
                        <div className="bg-[#132152] hover:hover:bg-[#415ec7] cursor-pointer text-white text-[.8rem] py-2 px-4 rounded-md">
                          Edit
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {openModal && (
        <CheckedInAllotementModal
          lastIndex={checkedInData[checkedInData.length - 1]}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default CheckedInAllotement;
