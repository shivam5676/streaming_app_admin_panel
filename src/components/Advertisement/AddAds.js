import React, { useState } from "react";
import RoutesInfoDiv from "../RoutesInfoDiv";
import { useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";

const AddAds = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const [liveType = setLiveType] = useState("Yes");
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-auto px-4 py-2 customScrollbar">
      {" "}
      <RoutesInfoDiv
        mainHeading={"Add Ads"}
        websiteName={"Reelies"}
        sectionName={"Ads section"}
        currentDir={"Add Ads"}
      ></RoutesInfoDiv>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div
            className={`${
              selectedTheme === "modern reeloid"
                ? "bg-black/40 backdrop-blur-lg"
                : "bg-[#2A3042]"
            } flex-1  rounded-md text-white`}
          >
            <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
              <p>Advertisement Info</p>
            </div>
            <div className="m-4 font-semibold">
              <p>
                Ads Name <span className="text-red-500"> *</span>
              </p>
              <input
                className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                // ref={sliderNameRef}
              ></input>
            </div>
            <div className="p-4 font-semibold w-[100%]">
              <p>
                Ads Provider <span className="text-red-500"> *</span>
              </p>

              <select
                className="w-full h-[40px] bg-[#2E3648]  py-2 px-4 outline-none text-white  rounded-md my-2"
                // onChange={handleSliderTypeChange}
                // ref={sliderTypeRef}
              >
                <option value={"Promotional"}>Google Personlised Ads</option>
                {/*this will not click any things this willl only take and image of promotional conttnt*/}
                <option value={"Trailer"}>Custom Ads</option>
                {/*this will play trailer on click when type will be equal to this and it will take a trailer video or link*/}
                {/* <option value={"Redirection"}>Redirection(app section)</option>{" "} */}
                {/*this will  take an image and also a link for redirection to app and othger things*/}
              </select>
            </div>
            <div className="p-4 font-semibold w-[100%]">
              <p>
                Ads Type <span className="text-red-500"> *</span>
              </p>

              <select
                className="w-full h-[40px] bg-[#2E3648]  py-2 px-4 outline-none text-white  rounded-md my-2"
                // onChange={handleSliderTypeChange}
                // ref={sliderTypeRef}
              >
                <option value={"Promotional"}>Banner Ads</option>
                {/*this will not click any things this willl only take and image of promotional conttnt*/}
                <option value={"Trailer"}>Full Screen Ads</option>
                {/*this will play trailer on click when type will be equal to this and it will take a trailer video or link*/}
                {/* <option value={"Redirection"}>Redirection(app section)</option>{" "} */}
                {/*this will  take an image and also a link for redirection to app and othger things*/}
              </select>
            </div>
            {/* if user select Movies_shorts then this will dropdown all movies  from backend and  thier shorts will be  linked to the slide*/}

            <div className="p-4 font-semibold w-[100%] ">
              <p>
                Link Ads Content :<span className="text-red-500"> *</span>
                <select
                  className="bg-transparent mx-4 outline-none border-2 rounded px-2 py-1"
                  // onChange={handlePromotionalContentType}
                >
                  <option className="px-2 bg-[#2E3648]" value="Image-upload">
                    By Image Upload:
                  </option>
                  <option className="px-2 bg-[#2E3648]" value="URL">
                    By Video Upload:
                  </option>
                </select>
              </p>
              <div className="my-4">
                {" "}
                <input
                  className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                  // ref={promotionalImageRef}
                  type="file"
                ></input>
              </div>{" "}
              {/* if promotional content type will be url then we will show url input box else we will show file input box with thier given key property*/}
            </div>

            <div className="p-4 font-semibold w-[100%]">
              <p>Visible</p>

              <select
                className="w-full h-[40px] bg-[#2E3648] px-2 outline-none text-white rounded-md my-2"
                // ref={visibleRef}
                // onChange={()=>setLiveType()}
              >
                <option value={"Yes"}>Yes, make it live </option>
                <option value={"No"}>No, will make it live later</option>
                <option value="Scheduled">Schedule</option>
              </select>
            </div>
          </div>
        </div>{" "}
      </section>
    </div>
  );
};

export default AddAds;
