import React from "react";
import RoutesInfoDiv from "../commonComponents/RoutesInfoDiv";
import ProductReportCard from "../dashboard/ProductReportCard";
import AnalyticsCard from "./AnalyticsCard";
// import GenreWiseDataLineGraph from "./GenreWiseDataLineGraph";
import DataLineGraph from "./DataLineGraph";
import AnalyticsUserRetitionGraph from "./AnalyticsUserRetitionGraph";
import userImg from "../../assests/user.gif";
import clockImg from "../../assests/clock.gif";
import sessionImg from "../../assests/session-time.gif";
import Speedograph from "./SpeedoGraph";
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
            <AnalyticsCard
              cardName={"Users"}
              data={"+852"}
              id={1}
              iconImg={userImg}
              type={"Analytics"}
            />
            <AnalyticsCard
              cardName={"Total watch time"}
              data={"2400 hrs"}
              id={2}
              iconImg={clockImg}
              type={"Analytics"}
            />
            {/* <Speedograph/> */}
            <AnalyticsCard
              
              cardName={"Avg. Session Duration"}
              data={"60min"}
              id={3}
              iconImg={sessionImg}
              
            />
          </div>
          <div className="bg-[#3d3f58] h-[350px] w-[100%] mt-6 rounded-lg p-2">
            <p className="text-white font-bold text-lg">User Retetion</p>
            {/* here we will use graph what old user likes vs what new user likes like genre diffrent and different language ratio new vs old */}
            <AnalyticsUserRetitionGraph />
          </div>
        </div>
        <div className="flex flex-col max-[1100px]:w-[100%] w-[30%]  h-[600px] gap-6 min-[1100px]:ms-6 max-[1100px]:mt-6 ">
          <div className="flex flex-col w-full h-[330px] bg-[#3d3f58] rounded-lg p-2 text-white font-semibold text-lg relative">
            {" "}
            <DataLineGraph
              headingName={"Genre Wise Views"}
              categoryName={"Genre"}
              data={[
                { type: "Action", data: { oldUser: "2400", newUser: "700" } },
                { type: "Adventure", data: { oldUser: "500", newUser: "600" } },
                { type: "Comedy", data: { oldUser: "1200", newUser: "600" } },
                { type: "Romance", data: { oldUser: "1200", newUser: "1200" } },
                { type: "Thriller", data: { oldUser: "2400", newUser: "700" } },
                {
                  type: "Suspense",
                  data: { oldUser: "1400", newUser: "1700" },
                },
                {
                  type: "Motivational",
                  data: { oldUser: "2400", newUser: "700" },
                },
              ]}
            />
          </div>
          <div className="flex flex-col w-full h-[calc(270px-24px)] bg-[#3d3f58] rounded-lg p-2 text-white font-semibold text-lg relative">
            <DataLineGraph
              headingName={"Language Wise Views"}
              categoryName={"Language"}
              data={[
                { type: "Kannada", data: { oldUser: "1200", newUser: "1200" } },

                { type: "Hindi", data: { oldUser: "2400", newUser: "700" } },
                { type: "English", data: { oldUser: "500", newUser: "600" } },
                { type: "Tamil", data: { oldUser: "1200", newUser: "600" } },

                {
                  type: "TElgu",
                  data: { oldUser: "2400", newUser: "700" },
                },
              ]}
            ></DataLineGraph>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
