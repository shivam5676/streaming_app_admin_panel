import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import movieIcon from "../assests/movie-animate.gif";
import webseriesIcon from "../assests/webseriesIcon-animate.gif";
import layoutIcon from "../assests/layout-animate.gif";
import sliderIcon from "../assests/slider-card-animate.gif";
import arrowAnimate from "../assests/upward_arrow-animate.gif";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaArrowUp,
} from "react-icons/fa";
import PyramidGraph from "./PyramidGraph";
import { VictoryPie } from "./../../node_modules/victory-pie/es/victory-pie";
import ProductReportCard from "./dashboard/ProductReportCard";
import DoughnutData from "./doughnutData";
import axios from "axios";
const DashBoard = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get(
          `${connectionString}/admin/getDashboard/year` //all,year,month
        );
        console.log(response);
      } catch (error) {}
    }
    fetchDashboardData();
  }, []);
  const allLanguages = [
    {
      _id: "66fa322b141165d54e7d2239",
      name: "english",
      __v: 0,
    },
    {
      _id: "66fa3231141165d54e7d223b",
      name: "Hindi",
      __v: 0,
    },
    {
      _id: "66fa3237141165d54e7d223d",
      name: "Sanskrit",
      __v: 0,
    },
  ];
  const allMovies = [
    {
      _id: "6704c9a3bc9132b974ccedb6",
      name: "trollerz",
      genre: [
        {
          _id: "66fa3269141165d54e7d2241",
          name: "Action",
        },
        {
          _id: "66fa3284141165d54e7d2243",
          name: "Mythological",
        },
        {
          _id: "66fa890e05ed98c8b4e1db34",
          name: "Comedy",
        },
        {
          _id: "66fbaf3875c7dcc4c65f9510",
          name: "Thriller",
        },
      ],
      freeVideos: 0,
      visible: true,
      fileLocation: "uploads/thumbnail/trollerz-thumbnail_1728367011895.jpeg",
      shorts: [
        "6704c9a3bc9132b974ccedb8",
        "6704c9a3bc9132b974ccedb9",
        "6704c9a3bc9132b974ccedba",
      ],
      layouts: [
        {
          _id: "670660b78bf3e3def3649c89",
          name: "Latest Movies",
        },
      ],
      language: [
        "66fa322b141165d54e7d2239",
        "66fa3231141165d54e7d223b",
        "66fa3237141165d54e7d223d",
      ],
      trailerUrl:
        "https://1326678901.vod-qcloud.com/941b074bvodtranssgp1326678901/fbee42ae1397757891053795120/v.f101303.mp4",
      parts: 3,
      views: 4,
      __v: 3,
    },
    {
      _id: "67051f25bf18ddd8b52aa608",
      name: "inception",
      genre: [
        {
          _id: "66fa3269141165d54e7d2241",
          name: "Action",
        },
        {
          _id: "66fa3284141165d54e7d2243",
          name: "Mythological",
        },
        {
          _id: "66fa890e05ed98c8b4e1db34",
          name: "Comedy",
        },
      ],
      freeVideos: 0,
      visible: true,
      fileLocation: "uploads/thumbnail/inception-thumbnail_1728388901826.jpeg",
      shorts: [
        "67051f25bf18ddd8b52aa60e",
        "67051f25bf18ddd8b52aa60f",
        "67051f26bf18ddd8b52aa610",
      ],
      layouts: [],
      language: [
        "66fa322b141165d54e7d2239",
        "66fa3231141165d54e7d223b",
        "66fa3237141165d54e7d223d",
      ],
      trailerUrl:
        "https://1326678901.vod-qcloud.com/e4004eb4vodtranshk1326678901/fbb7fd531397757891053765218/v.f101302.mp4",
      parts: 3,
      views: 7,
      __v: 1,
    },
    {
      _id: "67052210f4aeae2b11cfc15a",
      name: "ChildrenStory 3",
      genre: [],
      freeVideos: 0,
      visible: true,
      fileLocation:
        "uploads/thumbnail/ChildrenStory 3-thumbnail_1728389648582.jpeg",
      shorts: ["67052210f4aeae2b11cfc15e", "67052210f4aeae2b11cfc15f"],
      layouts: [],
      language: ["66fa3231141165d54e7d223b"],
      trailerUrl:
        "https://1326678901.vod-qcloud.com/941b074bvodtranssgp1326678901/fbee42ae1397757891053795120/v.f101303.mp4",
      parts: 2,
      views: 4,
      __v: 1,
    },
  ];
  const handleSelectChange = () => {};
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll customScrollbar px-4 py-2">
      <div className="text-white px-2 py-2 ">
        <div className="text-[.9rem] font-bold flex justify-between items-center">
          <p className="text-[1rem] font-semibold">DashBoard</p>
          <div className="border-2">
            {" "}
            <FormControl fullWidth>
              <Select
                defaultValue={30}
                inputProps={{
                  name: "age",
                  id: "controlled-native",
                }}
                sx={{
                  // Styles for the select element
                  fontSize: "0.875rem", // Small text size
                  color: "white", // Text color
                  backgroundColor: "transparent", // Background color for the select
                  height: "32px", // Reduce height of the select
                  "& .MuiSelect-select": {
                    border: "none", // Remove border
                    backgroundColor: "transparent", // Background color for selected option
                    padding: "4px 10px", // Adjust padding to control height
                    outline: "none", // Remove outline on focus

                    "&:focus": {
                      outline: "none", // Remove outline on focus
                    },
                  },
                  // Styles for the dropdown options
                  "& .MuiMenuItem-root": {
                    backgroundColor: "gray", // Background color for dropdown options
                    "&:hover": {
                      backgroundColor: "darkgray", // Background color on hover
                    },
                  },
                }}
              >
                <MenuItem value={10}>Current Month</MenuItem>
                <MenuItem value={20}>Current Year</MenuItem>
                <MenuItem value={30}>All Time</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <p className="text-[.9rem] font-semibold text-gray-400">
          <span>Welcome to Reelies Dashboard</span>
        </p>
        <section className="w-[100%]  grid xl:grid-cols-4 sm:grid-cols-2  gap-4 py-2">
          <ProductReportCard
            name={"Movie"}
            cardIcon={movieIcon}
            published={"590"}
            UnPublished={"90"}
          />
          <ProductReportCard
            name={"WebSeries"}
            cardIcon={webseriesIcon}
            published={"190"}
            UnPublished={"20"}
          />
          <ProductReportCard
            name={"Layouts"}
            cardIcon={layoutIcon}
            published={"5"}
            UnPublished={"9"}
          />
          <ProductReportCard
            name={"Sliders"}
            cardIcon={sliderIcon}
            published={"9"}
            // UnPublished={"0"}
          />
        </section>
        <section className="w-[100%]   py-2 ">
          {/* <div className=""> */}
          <div className="gap-4 w-[100%] flex flex-col md:flex-row  ">
            <div className="w-[100%] md:w-[40%]  bg-[#2A3042]">
              <p className="p-4 text-[.9rem] font-semibold">
                Content Views <span>(All Time)</span>
              </p>
              <div className="  h-[300px] w-[100%] min-w-[250px] overflow-x-hidden">
                <DoughnutData />
              </div>
            </div>

            <div className="   md:w-[60%]  bg-[#2A3042]">
              {" "}
              <p className="p-4 text-[.9rem] font-semibold">
                Top Movies & shows <span>(All Time)</span>
              </p>
              <div className="m-4 font-normal text-[.9rem] text-[#A8B2BC]  overflow-x-auto">
                <div className="font-semibold flex border-b pb-2 border-gray-500">
                  <div className="w-[50px] flex-shrink-0">
                    <p className="p-2">sr</p>
                  </div>
                  <div className="w-[90px]  flex-shrink-0">
                    <p className="p-2">action</p>
                  </div>
                  {/* <div className=" h-[120px] w-[100px] p-2"></div> */}
                  <div className="w-[100%] flex-shrink-1 min-w-[100px] mx-8">
                    <p className="p-2">Name</p>
                  </div>

                  <div className="w-[80px]  flex-shrink-0">
                    <p className="p-2">status</p>
                  </div>
                </div>
                {/* items */}
                {allLanguages?.length > 0 &&
                  allLanguages.map((current, index) => (
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
                          <option
                            value="DELETE"
                            onClick={() => {
                              // deleteGenresHandler(current._id)
                            }}
                          >
                            DELETE
                          </option>
                        </select>
                      </div>
                      {/* <img
                      src={`${connectionString}/genreeIcon/${current.icon.replace(
                        "uploads/thumbnail",
                        ""
                      )}`}
                      className=" h-[120px] w-[100px] p-2"
                    ></img> */}
                      <div className="w-[100%]  flex-shrink-1 min-w-[100px] mx-8">
                        <p className="p-2">{current.name}</p>
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
            </div>
          </div>
          {/* </div> */}
        </section>
        {/* new users */}
        <section className="w-[100%]  bg-[#2A3042]  py-2 ">
          {" "}
          <div className="p-4 text-[.9rem] font-semibold">New Users</div>
          <div className="my-4 font-normal text-[.9rem]  overflow-x-auto">
            <div className="font-semibold flex border-b pb-2 text-[#A8B2BC] border-gray-500 px-2">
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
            {allMovies.length > 0 &&
              allMovies.map((current, index) => (
                <div className="font-normal flex my-2 text-[#A8B2BC] border-b border-gray-500 px-2">
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
                  <div className="w-[120px]  flex-shrink-0">
                    <p className="p-2">{current.name}</p>
                  </div>
                  <div className="w-[100%] min-w-[100px] flex-shrink-1">
                    <p className="p-2 break-words">
                      {" "}
                      {current.genre.map((currentIndex) => {
                        return <span>{`${currentIndex.name} | `}</span>;
                      })}
                    </p>
                  </div>{" "}
                  <div className="w-[100%] min-w-[100px] flex-shrink-1">
                    <p className="p-2 break-words">
                      {current.layouts.map((currentIndex) => {
                        return <span>{currentIndex.name}</span>;
                      })}
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
        </section>
      </div>
    </div>
  );
};

export default DashBoard;
