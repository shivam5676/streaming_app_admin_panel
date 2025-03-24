import React, { useRef, useState } from "react";
import RoutesInfoDiv from "../commonComponents/RoutesInfoDiv";
import { Provider, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { MdSwapHorizontalCircle } from "react-icons/md";
import ToolTip from "./ToolTip";
import axios from "axios";

const AddAds = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const connectionString = process.env.REACT_APP_API_URL;
  const [adsProvider, setAdsProvider] = useState("Google");
  const [visible, setVisible] = useState(true);
  const AdsNameRef = useRef("");
  const AdsTypeRef = useRef("Banner");
  // const visibleRef = useRef(true);
  const promotionalAdsContentRef = useRef("");
  const AdsPositionSessionTypeRef = useRef("firstTime");
  const AdsSkipableAfter = useRef("3");
  const AdsPositionRef = useRef("/homePage");
  const handleAdsProvider = (e) => {
    setAdsProvider(e.target.value);
  };
  const handleAdsType = (e) => {};
  const saveAdsHandler = async () => {
    const data = {
      name: AdsNameRef.current.value,
      type: AdsTypeRef.current.value,
      Provider: adsProvider,
      visible: visible,
      position: AdsPositionRef.current.value,
      sessionType: AdsPositionSessionTypeRef.current.value,
      ...(promotionalAdsContentRef.current?.files?.length > 0 && {
        contentData: promotionalAdsContentRef?.current?.files[0],
      }),
      ...(AdsSkipableAfter?.current?.length > 0 && {
        skipAfter: AdsSkipableAfter?.current?.value,
      }),
    };
    console.log(data);
    return;
    try {
      const res = await axios.post(`${connectionString}/admin/addAds`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // setUserDetails(res.data.userDetails);
      toast.success("user fetched successfully");
    } catch (error) {
      console.log(error);
    }
  };
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
                className="w-full h-[40px] bg-[#2E3648] my-2 py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                ref={AdsNameRef}
              ></input>
            </div>
            <div className="p-4 font-semibold w-[100%]">
              <p>
                Ads Provider <span className="text-red-500"> *</span>
              </p>

              <select
                className="w-full h-[40px] bg-[#2E3648]  py-2 px-4 outline-none text-white  rounded-md my-2"
                onChange={handleAdsProvider}
                // ref={sliderTypeRef}
              >
                <option value={"Google"}>Google Personlised Ads</option>
                {/*this will not click any things this willl only take and image of promotional content*/}
                <option value={"Custom"}>Custom Ads</option>
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
                // onChange={handleAdsType}
                ref={AdsTypeRef}
              >
                <option value={"Banner"}>Banner Ads</option>
                {/*this will not click any things this willl only take and image of promotional conttnt*/}
                <option value={"interstitial "}>Full Screen Ads</option>
                {/*this will play trailer on click when type will be equal to this and it will take a trailer video or link*/}
                {/* <option value={"Redirection"}>Redirection(app section)</option>{" "} */}
                {/*this will  take an image and also a link for redirection to app and othger things*/}
              </select>
            </div>
            {adsProvider !== "Google" && (
              <>
                {" "}
                <div className="p-4 font-semibold w-[100%] ">
                  <p>
                    Link Ads Content :<span className="text-red-500"> *</span>
                    <select
                      className="bg-transparent mx-4 outline-none border-2 rounded px-2 py-1"
                      // onChange={handlePromotionalContentType}
                    >
                      <option
                        className="px-2 bg-[#2E3648]"
                        value="Image-upload"
                      >
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
                      ref={promotionalAdsContentRef}
                      type="file"
                    ></input>
                  </div>{" "}
                  {/* if promotional content type will be url then we will show url input box else we will show file input box with thier given key property*/}
                </div>
                <div className="p-4 font-semibold w-[100%] flex">
                  <p className="flex items-center">
                    {" "}
                    Ads Skippable After :{" "}
                    <span className="text-red-500"> *</span>
                  </p>{" "}
                  <select
                    className=" h-[40px] bg-[#2E3648] w-[50%]   px-4 outline-none text-white  rounded-md mx-2"
                    // onChange={handleSliderTypeChange}
                    ref={AdsSkipableAfter}
                  >
                    <option value={"3"}> 3s</option>
                    {/*this will not click any things this willl only take and image of promotional conttnt*/}
                    <option value={"5"}>5s</option>
                    <option value={"10"}>10s</option>
                    <option value={"15"}>15s</option>
                    {/*this will play trailer on click when type will be equal to this and it will take a trailer video or link*/}
                    {/* <option value={"Redirection"}>Redirection(app section)</option>{" "} */}
                    {/*this will  take an image and also a link for redirection to app and other things*/}
                  </select>
                </div>
              </>
            )}
            {/* if user select Movies_shorts then this will dropdown all movies  from backend and  thier shorts will be  linked to the slide*/}
            <div className="p-4 font-semibold w-[100%] flex gap-6 flex-col xl:flex-row">
              <div className="dd-1  w-[100%] ">
                {" "}
                <p>Visible</p>
                <select
                  className="w-full h-[40px] bg-[#2E3648] px-2 outline-none text-white rounded-md my-2"
                  // ref={visibleRef}
                  onChange={(e) => setVisible(e.target.value)}
                >
                  <option value={true}>Yes, make it live </option>
                  <option value={false}>No, will make it live later</option>
                </select>
              </div>
              <div className="flex w-[100%] max-[700px]:flex-col xl:border-l px-2 text-sm ">
                {" "}
                <div className="bg-[#2E3648] p-2">
                  {" "}
                  <p className="pb-2">
                    Start time{" "}
                    <ToolTip
                      ParaHeading={"Start Time -"}
                      content={
                        "From when you want to launch your Ads if you Add an ads today and put start time after 3 days then ads will be visible after 3 days on specific time  "
                      }
                      tipsContent={
                        "leave Start time empty (no data & time) selected if you want to launch ads instantly"
                      }
                    />
                  </p>
                  <div className="flex gap-8">
                    {" "}
                    <input
                      type="date"
                      className="bg-transparent  border h-[25px] p-2"
                    ></input>
                    <input
                      type="time"
                      className="bg-transparent border h-[25px] p-2"
                    ></input>
                  </div>
                </div>
                <div className="flex items-center px-3  max-[700px]:hidden">
                  <MdSwapHorizontalCircle className="w-[30px] h-[30px] " />
                </div>
                <div className="bg-[#2E3648] p-2">
                  {" "}
                  <p className="pb-2">
                    End time{" "}
                    <ToolTip
                      ParaHeading={"End Time -"}
                      content={
                        "this option will ensure when you want to end your ads campaign "
                      }
                      tipsContent={
                        "leave End time empty (no date & time) selected, if you want that ads will be visible permanently"
                      }
                    />
                  </p>
                  <div className="flex gap-8">
                    {" "}
                    <input
                      type="date"
                      className="bg-transparent  border h-[25px] p-2"
                    ></input>
                    <input
                      type="time"
                      className="bg-transparent border h-[25px] p-2"
                    ></input>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="p-4 font-semibold w-[100%] ">
              <div className="flex flex-col ">
                <p className="flex w-[100%]">
                  {" "}
                  Ads Position :<span className="text-red-500"> *</span>
                </p>
                <div className="flex gap-4">
                  {" "}
                  <select
                    className=" h-[40px] bg-[#2E3648] w-[50%]  py-2 px-4 outline-none text-white  rounded-md my-2"
                    // onChange={handleSliderTypeChange}
                    ref={AdsPositionSessionTypeRef}
                  >
                    <option value={"firstTime"}>
                      {" "}
                      when user opens (first time in that session)
                    </option>
                    {/*this will not click any things this willl only take and image of promotional conttnt*/}
                    <option value={"eachTime"}>
                      when user opens (each time in that session)
                    </option>
                    {/*this will play trailer on click when type will be equal to this and it will take a trailer video or link*/}
                    {/* <option value={"Redirection"}>Redirection(app section)</option>{" "} */}
                    {/*this will  take an image and also a link for redirection to app and other things*/}
                  </select>
                  <select
                    className=" h-[40px] bg-[#2E3648] w-[50%]  py-2 px-4 outline-none text-white  rounded-md my-2"
                    // onChange={handleSliderTypeChange}
                    ref={AdsPositionRef}
                  >
                    <option value={"/homepage"}> HomePage</option>
                    <option value={"/wallet"}>Wallet section</option>
                    <option value={"/movies"}>Movies Section</option>{" "}
                    <option value={"/bookmarks"}>Bookmarks section</option>{" "}
                    {/* we will later add section dynamically we will fetch the apps section dynamically and aetr we will us ethier urls  */}
                  </select>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </section>
      <div className="my-3">
        {" "}
        <div className="flex justify-end w-[100%]">
          <div
            onClick={() => {
              saveAdsHandler();
            }}
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-semibold">Add Ads</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAds;
