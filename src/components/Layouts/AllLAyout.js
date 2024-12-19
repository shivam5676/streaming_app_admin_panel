import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import allLayouts from "./allLayouts";
import { layoutSliceACtion } from "../../store/layoutSlice";

import RoutesInfoDiv from "./../RoutesInfoDiv";

import AllLAyoutPrint from "./AllLAyoutPrint";
import { allLayoutsApi } from "../../Api/Layouts/layoutApi";
import Pagination from "../commonComponents/pagination";


const AllLAyout = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const dispatch = useDispatch();
  const allLayouts = useSelector((state) => state.layOutData);

  useEffect(() => {
    if (allLayouts.length === 0) {
      try {
        (async () => {
          const res = await allLayoutsApi();
          if (res.data.Layout) {
            Object.values(res.data.Layout).forEach((current) => {
              dispatch(layoutSliceACtion.addLayout(current));
            });
          }
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [allLayouts, dispatch]);

  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"All Layouts"}
        websiteName={"Reelies"}
        sectionName={"Layout section"}
        currentDir={"All Layouts"}
      ></RoutesInfoDiv>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div
            className={`max-[690px]:overflow-auto ${
              selectedTheme === "modern reeloid"
                ? "bg-black/40 backdrop-blur-lg "
                : "bg-[#2A3042] "
            } flex-1  rounded-md text-gray-200 max-md:overflow-auto py-2`}
          >
            <div className="m-4 text-[.9rem] font-semibold ">
              <div className="flex justify-between text-white">
                <div className="flex items-center">
                  <p>Show </p>
                  <select className="bg-[#2E3648] text-[#959db6] mx-2 px-4 py-1  font-normal">
                    <option>10</option>
                    <option>10</option>
                    <option>10</option>
                  </select>
                  <p>results </p>
                </div>
                <div className="flex items-center">
                  <p>search : </p>
                  <input
                    className="w-[150px] bg-[#2E3648] mx-2 p-2"
                    placeholder="search"
                  ></input>
                </div>
              </div>
            </div>

            <AllLAyoutPrint allLayouts={allLayouts} />
           <Pagination/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllLAyout;
