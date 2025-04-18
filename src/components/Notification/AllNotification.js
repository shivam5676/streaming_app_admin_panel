import React, { useEffect, useState } from "react";
import RoutesInfoDiv from "../commonComponents/RoutesInfoDiv";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import SearchAndSort from "../commonComponents/searchAndSort";
import Pagination from "../commonComponents/pagination";

const AllNotification = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const [moreDetails, setMoreDetails] = useState(null);
  const connectionString = process.env.REACT_APP_API_URL;
  const [allNotifications, setAllNotifications] = useState([]);
  const [limit, setlimit] = useState(10);
  const [start, setStart] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageMetaData, setPageMetaData] = useState({
    totalPages: 0,
    current: 0,
    limit: 0,
  });
  useEffect(() => {
    // getAllNotifications
    async function fetchAllNotifications() {
      try {
        const res = await axios.get(
          `${connectionString}/admin/getAllNotifications?start=${start}&limit=${limit}&searched=${searchValue}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (res?.data?.notificationTasks) {
          setAllNotifications(res.data.notificationTasks);
        }
        if (res.data.totalPages) {
          setPageMetaData({
            totalPages: res.data.totalPages,
            current: start,
            limit: limit,
            totalData: res.data.totalData,
          });
        }
      } catch (err) {
        console.log(err);
     
      }
    }
    fetchAllNotifications();
  }, [limit, start, searchValue]);
  const terminateJob = async (id) => {
    try {
      const res = await axios.get(
        `${connectionString}/admin/terminateJob?taskId=${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("job terminated successfully...");
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error("something went wrong while terminating the job ");
      }
    }
  };
  const limitHandler = (data) => {
    setlimit(data);
    setStart(0);
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll customScrollbar px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"All Notification"}
        websiteName={"Reelies"}
        sectionName={"Notification section"}
        currentDir={"All Notification"}
      ></RoutesInfoDiv>
      <section
        className={`w-[100%] ${
          selectedTheme === "modern reeloid"
            ? "bg-black/40 backdrop-blur-lg "
            : "bg-[#2A3042] "
        } py-2  rounded-md`}
      >
        {" "}
        <SearchAndSort
          limit={limitHandler}
          searchedQuery={(data) => {
            setSearchValue(data);
            setStart(0);
          }}
        ></SearchAndSort>
        <div className="flex gap-6 flex-col xl:flex-row">
          <div
            className={`max-[690px]:overflow-auto ${
              selectedTheme === "modern reeloid"
                ? "bg-black/40 backdrop-blur-lg "
                : "bg-[#2A3042] "
            } flex-1  rounded-md text-gray-200 max-md:overflow-auto py-2`}
          >
            <div className="mx-4 font-normal text-[.9rem] min-w-[768px]">
              <div className="font-semibold flex border-b pb-2 border-gray-500 w-[100%]">
                <div className="w-[50px] flex-shrink-0">
                  <p className="p-2">sr</p>
                </div>{" "}
                <div className="w-[90px]  flex-shrink-0">
                  <p className="p-2">Status</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Title</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Description</p>
                </div>
                <div className="w-[140px]  flex-shrink-0">
                  <p className="p-2">Start</p>
                </div>
                <div className="w-[140px]  flex-shrink-0">
                  <p className="p-2">End</p>
                </div>
                <div className="w-[80px]  flex-shrink-0">
                  <p className="p-2">Action</p>
                </div>
              </div>
              {/* items */}
              {allNotifications.length > 0 &&
                allNotifications.map((current, index) => (
                  <>
                    <div className="font-normal text-[.9rem] flex m-2  border-b border-gray-500 bg-gray-500 text-black items-center ">
                      <div className="w-[50px] p-2  flex-shrink-0">
                        <p className="p-2">{index + 1}</p>
                      </div>
                      <div className="w-[90px] text-white font-semibold flex-shrink-0">
                        <p className="border-yellow-500 border rounded-sm p-2 border-red">
                          {current.status}
                        </p>
                      </div>
                      <div className="w-[100%] min-w-[100px] flex-shrink-1">
                        <p className="p-2 break-words">{current.title}</p>
                      </div>{" "}
                      <div className="w-[100%] min-w-[100px] flex-shrink-1">
                        <p className="p-2 break-words">{current.description}</p>
                      </div>{" "}
                      <div className="w-[140px] flex-shrink-0">
                        {current.startTimeUnix}
                      </div>
                      <div className="w-[140px] flex-shrink-0">
                        {current.endTimeUnix}
                      </div>
                      <div className="w-[80px]  flex-shrink-0 px-1">
                        {moreDetails != index ? (
                          <p
                            className="px-2 py-1 font-semibold bg-red-500 rounded-md text-white text-[.8rem] flex justify-center text-center cursor-pointer"
                            onClick={() => {
                              setMoreDetails(index);
                            }}
                          >
                            View More
                          </p>
                        ) : (
                          <p
                            className="px-2 py-1 font-semibold bg-red-500 rounded-md text-white text-[.8rem] flex justify-center text-center cursor-pointer"
                            onClick={() => {
                              setMoreDetails(null);
                            }}
                          >
                            View Less
                          </p>
                        )}
                      </div>
                    </div>
                    {moreDetails == index && (
                      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-2 text-[.8rem]">
                        <div className="flex">
                          <p className="bg-yellow-600 h-fit p-1 rounded-md">
                            Next Task Execution
                          </p>
                          <span className="px-2">{current.nextTaskLaunch}</span>
                        </div>
                        <div className="flex">
                          <p className="bg-blue-600 h-fit p-1 rounded-md">
                            Last Task Execution
                          </p>
                          <span className="px-2">{current.lastTaskLaunch}</span>
                        </div>{" "}
                        <div className="flex">
                          <p className="bg-green-600 h-fit p-1 rounded-md ">
                            Last Success Message
                          </p>
                          <span className="px-2">
                            {current.lastSuccessMessage}
                          </span>
                        </div>
                        <div className="flex">
                          <p className="bg-red-600 h-fit p-1 rounded-md ">
                            Last Error Message
                          </p>
                          <span className="px-2">
                            {current.lastErrorMessage}
                          </span>
                        </div>{" "}
                        {current.status !== "completed" && (
                          <div
                            className="bg-sky-600 border w-fit p-1 cursor-pointer"
                            onClick={() => {
                              terminateJob(current._id);
                            }}
                          >
                            <p>Terminate Job</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
        </div>
        <Pagination
          metaData={pageMetaData}
          jumpToPage={(data) => {
            setStart(data);
          }}
        />
      </section>
    </div>
  );
};

export default AllNotification;
