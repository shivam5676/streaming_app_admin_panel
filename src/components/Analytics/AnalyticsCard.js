import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AnalyticsCard = ({cardName,data}) => {
  const dispatch = useDispatch();
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  return (
    <div
      className={`${
        selectedTheme === "Yellow Majestic"
          ? "bg-[#FEBD59] backdrop-filter backdrop-blur-lg bg-opacity-70"
          : selectedTheme === "modern reeloid"
          ? "bg-black/40 backdrop-blur-lg "
          : "bg-[#3d3f58]"
      }  flex flex-col p-4 rounded-lg w-[100%]  max-md:min-w-[300px] h-[100%]`}
    >
      <div className=" flex">
        <div className="bg-[#2F3040] rounded-md">
          <div className="h-[50px] w-[50px]"></div>
        </div>
        <div className="px-3">
          <p className="text-white text-semibold text-lg">{cardName}</p>
          <p className="text-gray-400 text-sm">Date Range :</p>
        </div>
      </div>
      <div className="h-[100px]  text-gray-400 ">graph will show here</div>
      <p className="text-2xl text-white p-2 font-semibold" >{data}</p>
    </div>
  );
};

export default AnalyticsCard;
