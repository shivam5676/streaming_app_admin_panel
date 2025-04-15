import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import Pagination from "./../commonComponents/pagination";
import SearchAndSort from "./../commonComponents/searchAndSort";
import RoutesInfoDiv from "../commonComponents/RoutesInfoDiv";

const AllUsers = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const connectionString = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [allMovies, setAllMovies] = useState([]);

  const [limit, setlimit] = useState(10);
  const [start, setStart] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageMetaData, setPageMetaData] = useState({
    totalPages: 0,
    current: 0,
    limit: 0,
  });

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get(
          `${connectionString}/admin/allUsers?start=${start}&limit=${limit}&searched=${searchValue}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setAllMovies(res.data.allUsers);
        if (res.data.totalPages) {
          setPageMetaData({
            totalPages: res.data.totalPages,
            current: start,
            limit: limit,
            totalData: res.data.totalData,
          });
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [limit, start, searchValue]);
  const deleteMovieHandler = async (id) => {
    console.log(id);
    toast.success("movie deleted successfully");
    try {
      const response = await axios.delete(
        `${connectionString}/admin/deleteMovie/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {}
  };
  const handleSelectChange = (id, event) => {
    const action = event.target.value;
    console.log(action);
    // Reset the select value after handling the event to ensure proper re-rendering
    event.target.value = ""; // Reset the value to ensure change is recognized next time

    if (action === "DELETE") {
      deleteMovieHandler(id);
    } else if (action === "EDIT") {
      navigate(`/userDetails/${id}`);
    }
  };
  const limitHandler = (data) => {
    setlimit(data);
    setStart(0);
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll customScrollbar px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"All User"}
        websiteName={"Reelies"}
        sectionName={"Users section"}
        currentDir={"All Users"}
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
            <SearchAndSort
              limit={limitHandler}
              searchedQuery={(data) => {
                setSearchValue(data);
                setStart(0);
              }}
            ></SearchAndSort>
            <div className="m-4 font-normal text-[.9rem] min-w-[640px]">
              <div className="font-semibold flex border-b pb-2 border-gray-500">
                <div className="w-[50px] flex-shrink-0">
                  <p className="p-2">sr</p>
                </div>
                <div className="w-[90px]  flex-shrink-0">
                  <p className="p-2">action</p>
                </div>
                <div className="w-[100px]  flex-shrink-0">
                  <p className="p-2">Profile Pic</p>
                </div>
                <div className="w-[100%]  min-w-[120px] flex-shrink-1">
                  <p className="p-2">Name</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Email</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Contact no</p>
                </div>
                <div className="w-[80px]  flex-shrink-0">
                  <p className="p-2">status</p>
                </div>
              </div>
              {/* items */}
              {allMovies.length > 0 &&
                allMovies.map((current, index) => (
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
                    <div className="w-[100px] flex-shrink-0">
                      <img
                        // src={`${connectionString}/thumbnails${current.fileLocation.replace(
                        //   "uploads/thumbnail",
                        //   ""
                        // )}`}
                        className=" h-[120px] w-[100px] p-2"
                      ></img>
                    </div>
                    <div className="w-[100%]   min-w-[120px] flex-shrink-1">
                      <p className="p-2">{current.name}</p>
                    </div>
                    <div className="w-[100%] min-w-[100px] flex-shrink-1">
                      {console.log(current, "cu---------")}
                      <p className="p-2 break-words">
                        {current.email}{" "}
                        {/* {current.genre.map((currentIndex) => {
                          return <span>{`${currentIndex.name} | `}</span>;
                        })} */}
                      </p>
                    </div>{" "}
                    <div className="w-[100%] min-w-[100px] flex-shrink-1">
                      <p className="p-2 break-words">
                        {current.contact}
                        {/* {current.layouts.map((currentIndex) => {
                          return <span>{currentIndex.name}</span>;
                        })} */}
                      </p>
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
                ))}
            </div>
            <Pagination
              metaData={pageMetaData}
              jumpToPage={(data) => {
                setStart(data);
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllUsers;
