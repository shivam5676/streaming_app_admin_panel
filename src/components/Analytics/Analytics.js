import React from "react";
import RoutesInfoDiv from "../RoutesInfoDiv";
import ProductReportCard from "../dashboard/ProductReportCard";
import AnalyticsCard from "./AnalyticsCard";

const Analytics = () => {
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"Analytics"}
        websiteName={"Reelies"}
        sectionName={"Others"}
        currentDir={"Analytics"}
      ></RoutesInfoDiv>
      <section className="flex  w-[100%] max-[1100px]:flex-col">
        <div className="flex flex-col h-[600px]  max-[1100px]:w-[100%] w-[70%]">
          <div className="w-[100%] flex gap-6 overflow-x-auto">
            {" "}
            <AnalyticsCard cardName={"Users"} data={"+852"}/>
            <AnalyticsCard cardName={"Total watch time"} data={"2400 hrs"}/>
            <AnalyticsCard cardName={"Avg. Session Duration"} data={"15min"}/>
          </div>
          <div className="bg-[#3d3f58] h-[400px] mt-6 rounded-lg p-2">
            <p className="text-white text-bold text-lg">User insights</p>
            {/* here we will use graph what old user likes vs what new user likes like genre diffrent and different language ratio new vs old */}
          </div>
        </div>
        <div className="flex flex-col max-[1100px]:w-[100%] w-[30%]  h-[600px] gap-6 min-[1100px]:ms-6 max-[1100px]:mt-6 ">
          {" "}
          <div className="flex w-[100%] h-[330px] bg-[#3d3f58] rounded-lg p-2 text-white font-semibold text-lg"><p>Genre Wise data</p></div>
          <div className="flex w-[100%] h-[270px] bg-[#3d3f58] rounded-lg p-2 text-white font-semibold text-lg">Language wise Data</div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
