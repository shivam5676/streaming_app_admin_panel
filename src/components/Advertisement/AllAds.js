import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RoutesInfoDiv from "../commonComponents/RoutesInfoDiv";
import { MdChangeCircle } from "react-icons/md";
import ToolTip from "./ToolTip";

const AllAds = () => {
  const params = useParams();
  const connectionString = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  // const allAds = useSelector((state) => state.sliderData);
  const [allAds, setAllAds] = useState([]);
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  useEffect(() => {
    const id = params.edit;
    async function fetchAds() {
      const response = await axios.get(`${connectionString}/admin/getAds`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response);
      if (response?.data?.AdsList) {
        setAllAds(response?.data?.AdsList);
      }
      // return
    }

    fetchAds();
  }, []);
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-auto px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"All Ads"}
        websiteName={"Reelies"}
        sectionName={"Ads section"}
        currentDir={"All Ads"}
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
                  <select
                    className={`${
                      selectedTheme === "modern reeloid"
                        ? "bg-[#2E3648]/70 rounded backdrop-blur-md"
                        : "bg-[#2E3648]"
                    } text-[#959db6] mx-2 px-4 py-1  font-normal`}
                  >
                    <option>10</option>
                    <option>10</option>
                    <option>10</option>
                  </select>
                  <p>results </p>
                </div>
                <div className="flex items-center">
                  <p>search : </p>
                  <input
                    className={`w-[150px] ${
                      selectedTheme === "modern reeloid"
                        ? "bg-[#2E3648]/70 rounded"
                        : "bg-[#2E3648]"
                    } mx-2 p-2`}
                    placeholder="search here..."
                  ></input>
                </div>
              </div>
            </div>
            <div className="m-4 font-normal text-[.9rem] min-w-[768px]">
              <div className="font-semibold flex border-b pb-2 border-gray-500">
                <div className="w-[50px] flex-shrink-0">
                  <p className="p-2">sr</p>
                </div>
                <div className="w-[90px]  flex-shrink-0">
                  <p className="p-2">Action</p>
                </div>
                <div className="w-[150px]  flex-shrink-0  ">
                  <p className="p-2">
                    Position{" "}
                    <ToolTip
                      ParaHeading={"Position -"}
                      content={"on which screen you will see the ads  "}
                    />
                  </p>
                </div>
                <div className="w-[200px]  flex-shrink-0  ">
                  <p className="p-2">
                    Visibility{" "}
                    <ToolTip
                      ParaHeading={"Visibility -"}
                      content={"how ads will display on different screen  "}
                    />
                  </p>
                </div>
                <div className="w-[50%] min-w-[150px] flex-shrink-1 ">
                  <p className="p-2">Name</p>
                </div>{" "}
                <div className="w-[300px] min-w-[200px] flex-shrink-1 ">
                  <p className="p-2">
                    Date{" "}
                    <ToolTip
                      ParaHeading={"Date -"}
                      content={`<b>Start Date</b>  - when an ad will be visible to user.
                        <p></p><b>End Date -</b></p> when ads will get expired `}
                    />
                  </p>
                </div>
                <div className="w-[150px] flex-shrink-0 ">
                  <p className="p-2">
                    Type{" "}
                    <ToolTip
                      ParaHeading={"Ads Type - "}
                      content={`  we will serve multiple types of ads in our app like -Interstrial ads , banner ads ....
                         `}
                    />
                  </p>
                </div>{" "}
                <div className="w-[100px] flex-shrink-0 ">
                  <p className="p-2">
                    Provider{" "}
                    <ToolTip
                      ParaHeading={"Ads Provider - "}
                      content={`  here we willl se which ads provider is providing the Ads eg... Google ads ,Custom ads ...
                         `}
                    />
                  </p>
                </div>
                <div className="w-[80px]  flex-shrink-0">
                  <p className="p-2">Status</p>
                </div>
              </div>
              {/* {console.log(allAds)} */}
              {allAds?.length > 0 &&
                allAds?.map((current, index) => {
                  return (
                    <div className="font-normal flex items-center   border-b border-gray-500">
                      <div className="min-w-[50px] p-2  flex-shrink-0">
                        <p className="p-2">{index + 1}</p>
                      </div>
                      <div className="w-[90px] text-white font-semibold flex-shrink-0">
                        <select
                          className={`${
                            selectedTheme === "modern reeloid"
                              ? "bg-[#3C445A]/70 backdrop-blur-sm rounded"
                              : "bg-[#3C445A]"
                          } rounded-sm p-2`}
                          // onChange={(event) => {
                          //   handleSelectChange(current._id, event);
                          // }}
                        >
                          <option
                            value=""
                            // disabled
                            className="border-b-2 border-gray-400"
                          >
                            option
                          </option>
                          <option value="EDIT">EDIT</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                      </div>
                      <div className="w-[150px]  flex-shrink-0  ">
                        <p className="p-2">
                          {current?.position.replace("/", "")}
                        </p>
                      </div>
                      <div className="w-[200px]  flex-shrink-0  ">
                        <p className="p-2">
                          {`when user opens ${current?.position.replace(
                            "/",
                            ""
                          )} ${current?.sessionType}`}
                        </p>
                      </div>
                      <div className="w-[50%]  min-w-[150px] flex-shrink-1 ">
                        <p className="p-2">{current?.name}</p>
                      </div>
                      <div className="w-[300px] min-w-[200px] flex flex-col flex-shrink-1  relative bg-[#2E3648] rounded-lg">
                        {/* <p className="p-2">{current?.provider}</p> */}
                        <div className=" h-[100%] bg-[#4CAF50] px-2 flex justify-between rounded-t-md">
                          <p>23/10/24</p>
                          <p>9:00am</p>
                        </div>
                        <div className="absolute w-[30px] h-[30px] border rounded-[50%] left-[calc(50%-15px)]  top-[calc(20px-12px)] z-[100]">
                          <MdChangeCircle className="w-[100%] h-[100%]" />
                        </div>
                        <div className=" h-[100%] bg-[#FF5C5C] px-2 flex justify-between rounded-b-md">
                          <p>25/10/24</p>
                          <p>9:00pm</p>
                        </div>
                      </div>
                      <div className="w-[150px]  flex-shrink-0 ">
                        <p className="p-2">{current?.type}</p>
                      </div>

                      <div className="w-[100px]  flex-shrink-0 ">
                        <p className="p-2">{current?.provider}</p>
                      </div>
                      <div className="w-[80px]  flex-shrink-0">
                        {!current.visible ? (
                          <p className="px-2 py-1 font-semibold bg-red-500 rounded-md text-white text-[.8rem] flex justify-center text-center">
                            Not published
                          </p>
                        ) : (
                          <p className="px-2 py-1 font-semibold bg-green-500 rounded-md text-white text-[.8rem] flex justify-center text-center">
                            Published
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <section className="flex m-2 text-white text-[.95rem] font-semibold justify-between">
              <p>Showing 1 to 10 of 155 entries</p>
              <div className="flex">
                <p className="border border-gray-500 px-2 py-1">Previous</p>
                <p className="border border-gray-500 px-2 py-1">1</p>
                <p className="border border-gray-500 px-2 py-1">2</p>
                <p className="border border-gray-500 px-2 py-1">3</p>
                <p className="border border-gray-500 px-2 py-1">.......</p>
                <p className="border border-gray-500 px-2 py-1">Next</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllAds;
