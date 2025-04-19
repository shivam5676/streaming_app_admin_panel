import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sliderSliceACtion } from "../../store/sliderSlice";

// import CreateAdmin from "./CreateAdmin";
import RoutesInfoDiv from "../commonComponents/RoutesInfoDiv";
import Pagination from "../commonComponents/pagination";
import SearchAndSort from "../commonComponents/searchAndSort";

const AllSubscriptionPlan = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const connectionString = process.env.REACT_APP_API_URL;
  const [allPackages, setAllPackages] = useState([]);
  const [openCreateAdmin, setOpenCreateAdmin] = useState(false);
  const dispatch = useDispatch();
  //   const allSliders = useSelector((state) => state.sliderData);
  const [pageMetaData, setPageMetaData] = useState({
    totalPages: 0,
    current: 0,
    limit: 0,
  });
  const [limit, setlimit] = useState(10);
  const [start, setStart] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${connectionString}/admin/allSubscriptionPlan?start=${start}&limit=${limit}&searched=${searchValue}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(res.data);
        if (res.data) {
          setAllPackages(res.data.subscriptionPlans);
          setPageMetaData({
            totalPages: res.data.totalPages,
            current: start,
            limit: limit,
            totalData: res.data.totalData,
          });
          console.log(pageMetaData);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch, limit, start, searchValue]);

  const handleSelectChange = (id, event) => {
    const action = event.target.value;
    console.log(action);
    // Reset the select value after handling the event to ensure proper re-rendering
    event.target.value = ""; // Reset the value to ensure change is recognized next time

    if (action === "DELETE") {
      deleteSliderHandler(id);
    } else if (action === "EDIT") {
      // navigate(`/allLayout/${id}`);
    }
  };
  const limitHandler = (data) => {
    setlimit(data);
    setStart(0);
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="flex justify-between items-center">
        <RoutesInfoDiv
          mainHeading={"All Packages"}
          websiteName={"Reeloid"}
          sectionName={"Users section"}
          currentDir={"All Packages"}
        ></RoutesInfoDiv>
      </div>

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
        ></SearchAndSort>{" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div
            className={`max-[690px]:overflow-auto ${
              selectedTheme === "modern reeloid"
                ? "bg-black/40 backdrop-blur-lg "
                : "bg-[#2A3042] "
            } flex-1  rounded-md text-gray-200 max-md:overflow-auto py-2`}
          >
            <div className="m-4 font-normal text-[.9rem] min-w-[640px]">
              <div className="font-semibold flex border-b pb-2 border-gray-500">
                <div className="w-[50px] flex-shrink-0">
                  <p className="p-2">sr</p>
                </div>
                <div className="w-[90px]  flex-shrink-0">
                  <p className="p-2">action</p>
                </div>

                <div className="w-[100%]  min-w-[120px] flex-shrink-1">
                  <p className="p-2">Price (Inr)</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Mints</p>
                </div>
              </div>
              {/* items */}
              {allPackages.length > 0 &&
                allPackages.map((current, index) => (
                  <div className="font-normal flex my-2  border-b border-gray-500">
                    <div className="w-[50px] p-2  flex-shrink-0">
                      <p className="p-2">{index + 1}</p>
                    </div>
                    <div className="w-[90px] text-white font-semibold flex-shrink-0">
                      <select
                        className="bg-[#3C445A] rounded-sm p-2"
                        onChange={(event) =>
                          handleSelectChange(current._id, event)
                        }
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
                    <div className="w-[100%]   min-w-[120px] flex-shrink-1">
                      <p className="p-2">{current.Price}</p>
                    </div>
                    <div className="w-[100%] min-w-[100px] flex-shrink-1">
                      <p className="p-2 break-words">{current.Quantity} </p>
                    </div>{" "}
                  </div>
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
      {/* {openCreateAdmin && <CreateAdmin />} */}
    </div>
  );
};

export default AllSubscriptionPlan;
