import React, { useRef } from "react";
import ToolTip from "../Advertisement/ToolTip";
import { MdSwapHorizontalCircle } from "react-icons/md";
import RoutesInfoDiv from "../RoutesInfoDiv";
import { useSelector } from "react-redux";
import axios from "axios";

const AddNotification = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const notificationTitleRef = useRef("");
  const notificationTypeRef = useRef("");
  const notificationDescriptionRef = useRef("");
  const saveNotificationHandler = async () => {
    try {
      const response = await axios.post(
        `${connectionString}/admin/saveNotification`,
        { title: notificationTitleRef.current.value, description: notificationDescriptionRef.current.value }
      );
    } catch (err) {}
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-auto px-4 py-2 customScrollbar">
      {" "}
      <RoutesInfoDiv
        mainHeading={"Add Notification"}
        websiteName={"Reelies"}
        sectionName={"Notification section"}
        currentDir={"Add Notification"}
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
              <p>Notification Info</p>
            </div>
            <div className="m-4 font-semibold">
              <p>
                Title <span className="text-red-500"> *</span>
              </p>
              <input
                className="w-full h-[40px] bg-[#2E3648] my-2 py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                ref={notificationTitleRef}
              ></input>
            </div>{" "}
            <div className="p-4 font-semibold w-[100%]">
              <p>
                Notification Type <span className="text-red-500"> *</span>
              </p>

              <select
                className="w-full h-[40px] bg-[#2E3648]  py-2 px-4 outline-none text-white  rounded-md my-2"
                // onChange={handleAdsType}
                ref={notificationTypeRef}
              >
                <option value={"Content-update"}>Content Update</option>
                <option value={"Reminder "}>Reminder</option>
                <option value={"Promotional "}>Promotional</option>
                <option value={"Event "}>Event</option>
                <option value={"Trending Content "}>Trending Content</option>
              </select>
            </div>
            <div className="p-4 font-semibold w-[100%]">
              {" "}
              <p>
                Notification Description{" "}
                <span className="text-[.8rem]">( only 150 text )</span>
                <span className="text-red-500"> *</span>
              </p>
              <input
                className="w-full h-[40px] bg-[#2E3648]  py-2 px-4 outline-none text-white  rounded-md my-2  "
                ref={notificationDescriptionRef}
              ></input>
            </div>
            <div className="p-4 font-semibold w-[100%] flex gap-6 flex-col xl:flex-row">
              <div className="dd-1  w-[100%] ">
                {" "}
                <p>Visible</p>
                <select
                  className="w-full h-[40px] bg-[#2E3648] px-2 outline-none text-white rounded-md my-2"
                  // ref={visibleRef}
                  // onChange={(e) => setVisible(e.target.value)}
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
                    //   ref={AdsPositionSessionTypeRef}
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
                    {/*this will  take an image and also a link for redirection to app and othger things*/}
                  </select>
                  <select
                    className=" h-[40px] bg-[#2E3648] w-[50%]  py-2 px-4 outline-none text-white  rounded-md my-2"
                    // onChange={handleSliderTypeChange}
                    //   ref={AdsPositionRef}
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
              saveNotificationHandler();
            }}
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-semibold">Add Notification</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNotification;
