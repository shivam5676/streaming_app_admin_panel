import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { movieSliceACtion } from "../../../store/movieSlice";
import RoutesInfoDiv from "../../commonComponents/RoutesInfoDiv";
import SearchAndSort from "../../commonComponents/searchAndSort";
import Pagination from "../../commonComponents/pagination";
import AllMoviesPrint from "./AllMoviesPrint";

const AllMovies = () => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  const connectionString = process.env.REACT_APP_API_URL;
  const [limit, setlimit] = useState(10);
  const [start, setStart] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageMetaData, setPageMetaData] = useState({
    totalPages: 0,
    current: 0,
    limit: 0,
  });
  const navigate = useNavigate();
  // const [allMovies, setAllMovies] = useState([]);
  const dispatch = useDispatch();
  const allMovies = useSelector((state) => state.movieData);

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get(
          `${connectionString}/admin/allMovies?start=${start}&limit=${limit}&searched=${searchValue}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        // setAllMovies(res.data.allMovies);
        if (res.data.allMovies) {
          dispatch(
            movieSliceACtion.addMovie(Object.values(res.data.allMovies))
          );
        }
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
  }, [dispatch, limit, start, searchValue]);
  const deleteMovieHandler = async (id) => {
    console.log(id);
    return;
    try {
      const response = await axios.delete(
        `${connectionString}/admin/deleteMovie/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch(movieSliceACtion.deleteMovie(id));
      toast.success("movie deleted successfully");
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
      navigate(`/allMovies/${id}`);
    }
  };
  const limitHandler = (data) => {
    setlimit(data);
    setStart(0);
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-auto customScrollbar px-4 py-2">
      <RoutesInfoDiv
        mainHeading={"All Movies"}
        websiteName={"Reelies"}
        sectionName={"Movies section"}
        currentDir={"All Movies"}
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
                <div className="w-[100px]  flex-shrink-0">
                  <p className="p-2">Thumbnail</p>
                </div>
                <div className="w-[120px]  flex-shrink-0">
                  <p className="p-2">Name</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Genre</p>
                </div>
                <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                  <p className="p-2">Layouts</p>
                </div>
                <div className="w-[80px]  flex-shrink-0">
                  <p className="p-2">status</p>
                </div>
              </div>
              {/* items */}
              <AllMoviesPrint
                allMovies={allMovies}
                handleSelectChange={handleSelectChange}
              ></AllMoviesPrint>
              
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

export default AllMovies;
