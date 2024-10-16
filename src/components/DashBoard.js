import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React, { useEffect, useRef, useState } from "react";
import movieIcon from "../assests/movie-animate.gif";
import webseriesIcon from "../assests/webseriesIcon-animate.gif";
import layoutIcon from "../assests/layout-animate.gif";
import sliderIcon from "../assests/slider-card-animate.gif";

import ProductReportCard from "./dashboard/ProductReportCard";
import DoughnutData from "./doughnutData";
import axios from "axios";
import firstPlace from "../assests/1-1.png";
import secondPlace from "../assests/2nd-prize.png";
import thirdPlace from "../assests/3rd-prize.png";

const DashBoard = () => {
  const connectionString = process.env.REACT_APP_API_URL;
  const [cardsData, setCardsData] = useState({});
  const [contentViews, setContentViews] = useState({});
  const [fetchingType, setFetchingType] = useState("All");
  const [top3data, setTop3data] = useState();
  const [latestUsers, setLatestUsers] = useState([]);
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get(
          `${connectionString}/admin/getDashboard/${fetchingType}` //all,year,month
        );
        console.log(response, "cards....>");
        setCardsData(response.data);
      } catch (error) {}
    }
    fetchDashboardData();
  }, []);
  useEffect(() => {
    async function fetchTopContentData() {
      try {
        const response = await axios.get(
          `${connectionString}/admin/fetchTopMovies/${fetchingType}` //all,year,month
        );
        console.log(response.data.movies, "top3");
        if (response.data.movies) {
          setTop3data(response.data.movies);
        }

        // setTop3data
      } catch (error) {}
    }
    fetchTopContentData();
  }, []);
  useEffect(() => {
    async function fetchContentViews() {
      try {
        const response = await axios.get(
          `${connectionString}/admin/getContentViews/${fetchingType}` //all,year,month
        );
        console.log(response.data.users);
        if (response.data) {
          setContentViews(response.data);
        }
      } catch (error) {}
    }
    fetchContentViews();
  }, []);
  useEffect(() => {
    async function fetchLAtestUSers() {
      try {
        const response = await axios.get(
          `${connectionString}/admin/fetchLatestUsers/${fetchingType}` //all,year,month
        );
        console.log(response);
        setLatestUsers(response.data.users);
        // setContentViews(response.data);
      } catch (error) {}
    }
    fetchLAtestUSers();
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
  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setFetchingType(event.target.value);
  };
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll customScrollbar px-4 py-2">
      <div className="text-white px-2 py-2 ">
        <div className="text-[.9rem] font-bold flex justify-between items-center">
          <p className="text-[1rem] font-semibold">DashBoard</p>
          <div className="border-2">
            {" "}
            <FormControl fullWidth>
              <Select
                value={fetchingType}
                onChange={handleSelectChange}
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
                <MenuItem value={"Month"}>Current Month</MenuItem>
                <MenuItem value={"Year"}>Current Year</MenuItem>
                <MenuItem value={"All"}>All Time</MenuItem>
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
            published={cardsData?.movies?.visibleTrueCount || "0"}
            UnPublished={cardsData?.movies?.visibleFalseCount || "0"}
            loading={Object.values(cardsData).length == 0}
          />

          <ProductReportCard
            name={"WebSeries"}
            cardIcon={webseriesIcon}
            published={cardsData?.webSeries?.visibleTrueCount || "0"}
            UnPublished={cardsData?.webSeries?.visibleFalseCount || "0"}
            loading={Object.values(cardsData).length == 0}
          />
          <ProductReportCard
            name={"Layouts"}
            cardIcon={layoutIcon}
            published={cardsData?.layouts?.visibleTrueCount || "0"}
            UnPublished={cardsData?.layouts?.visibleFalseCount || "0"}
            loading={Object.values(cardsData).length == 0}
          />
          <ProductReportCard
            name={"Sliders"}
            cardIcon={sliderIcon}
            published={cardsData?.sliders?.visibleTrueCount || "0"}
            UnPublished={cardsData?.sliders?.visibleFalseCount || "0"}
            loading={Object.values(cardsData).length == 0}
          />
        </section>
        <section className="w-[100%]   py-2 ">
          {/* <div className=""> */}
          <div className="gap-4 w-[100%] flex flex-col md:flex-row  ">
            {Object.values(contentViews).length != 0 ? (
              <div className="w-[100%] md:w-[40%]  bg-[#2A3042]">
                <p className="p-4 text-lg font-semibold">
                  Content Views <span>(All Time)</span>
                </p>
                <div className="  h-[300px] w-[100%] min-w-[250px] overflow-x-hidden">
                  <DoughnutData views={contentViews} />
                </div>
              </div>
            ) : (
              <Skeleton
                variant="rounded"
                animation="wave"
                height={"300px"}
                sx={{
                  // bgcolor: "grey.800",
                  width: {
                    xs: "100%", // 100% width for extra-small screens (mobile)
                    md: "40%", // 40% width for medium and larger screens
                  },
                  minWidth: "250px", // Set minimum width to 250px
                }}
              ></Skeleton>
            )}

            {top3data ? (
              <div className="   md:w-[60%]  bg-[#2A3042]">
                {" "}
                <p className="p-4 text-lg font-semibold flex">
                  Top
                  <label class="flex items-center relative w-24 cursor-pointer select-none mx-2">
                    <input
                      type="checkbox"
                      class="appearance-none transition-colors cursor-pointer w-24 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500 peer"
                    />
                    <span class="absolute font-medium text-xs uppercase left-8 text-white peer-checked:hidden">
                      Movies
                    </span>
                    <span class="absolute font-medium text-xs uppercase right-8 text-white peer-checked:block hidden">
                      Shows
                    </span>
                    <span class="w-7 h-7 left-0 absolute rounded-full transform transition-transform bg-gray-200 peer-checked:translate-x-[68px] text-center text-red-500">
                      3
                    </span>
                  </label>
                  <span>(All Time)</span>
                </p>
                <div className="m-4 font-normal text-[.9rem] text-[#A8B2BC]  overflow-x-auto">
                  <div className="font-semibold flex border-b pb-2 border-gray-500 ">
                    <div className="w-[100px] flex flex-shrink-0 items-center">
                      <p className="px-4">Position</p>
                    </div>

                    <div className="w-[100%] flex flex-shrink-1 min-w-[100px] mx-8">
                      <p className="p-2">Name</p>
                    </div>
                    <div className="w-[100px] flex flex-shrink-0 items-center">
                      <p className="px-4">Thumbnail</p>
                    </div>
                    <div className="w-[150px] flex flex-shrink-0">
                      <p className="p-2">Views</p>
                    </div>
                    <div className="w-[80px] flex flex-shrink-0">
                      <p className="p-2">status</p>
                    </div>
                  </div>
                  {/* items */}
                  {top3data?.length > 0 &&
                    top3data.map((current, index) => (
                      <div className="font-normal flex my-2  border-b border-gray-500">
                        <div className="w-[100px] px-2  flex-shrink-0">
                          {/* <p className="p-2">{index + 1}</p> */}
                          <img
                            src={
                              index == 0
                                ? firstPlace
                                : index == 1
                                ? secondPlace
                                : index == 2
                                ? thirdPlace
                                : ""
                            }
                            className={`w-[80px] h-[80px] ${
                              index === 0 ? "img-animate" : "img-flip-pause"
                            }`}
                          ></img>
                        </div>
                        <div className="w-[100%]  flex-shrink-1 min-w-[100px] flex  items-center mx-8">
                          <p className="p-2">{current.name}</p>
                        </div>{" "}
                        <div className="w-[100px] px-2  flex-shrink-0">
                          {/* <p className="p-2">{index + 1}</p> */}
                          <img
                            src={`${connectionString}/thumbnails${current?.fileLocation.replace(
                              "uploads/thumbnail",
                              ""
                            )}`}
                            className="w-[80px] h-[70px] "
                          ></img>
                        </div>
                        <div className="w-[150px] flex flex-shrink-0">
                          <p className="p-2 text-wrap whitespace-normal break-words w-[100%]">
                            {current.views}
                          </p>
                        </div>
                        <div className="w-[80px]  flex-shrink-0 flex  items-center">
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
            ) : (
              <Skeleton
                variant="rounded"
                animation="wave"
                height={"300px"}
                sx={{
                  bgcolor: "purple.600",
                  width: {
                    xs: "100%", // 100% width for extra-small screens (mobile)
                    md: "60%", // 40% width for medium and larger screens
                  },
                }}
              ></Skeleton>
            )}
          </div>
          {/* </div> */}
        </section>
        {/* new users */}
        <section className="w-[100%]  bg-[#2A3042]  py-2 ">
          {" "}
          {latestUsers.length > 0 ? (
            <div className="p-4 text-lg font-semibold">New Users</div>
          ) : (
            <div className="p-2">
              <Skeleton
                variant="rounded"
                animation="wave"
                height={"30px"}
                width={"100%"}
                sx={{
                  bgcolor: "purple.600",
                }}
              ></Skeleton>
            </div>
          )}
          <div className="my-4 font-normal text-[.9rem]  overflow-x-auto">
            <div className="font-semibold flex border-b pb-2 text-[#A8B2BC] border-gray-500 px-2">
              <div className="w-[50px] flex-shrink-0">
                {latestUsers.length > 0 ? (
                  <p className="p-2">sr</p>
                ) : (
                  <div className="p-2">
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      height={"30px"}
                      width={"100%"}
                      sx={{
                        bgcolor: "purple.600",
                      }}
                    ></Skeleton>
                  </div>
                )}
              </div>

              <div className="min-w-[120px] w-[100%]  flex-shrink-1">
                {latestUsers.length > 0 ? (
                  <p className="p-2">Name</p>
                ) : (
                  <div className="p-2">
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      height={"30px"}
                      width={"100%"}
                      sx={{
                        bgcolor: "purple.600",
                      }}
                    ></Skeleton>
                  </div>
                )}
              </div>
              <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                {latestUsers.length > 0 ? (
                  <p className="p-2">Email</p>
                ) : (
                  <div className="p-2">
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      height={"30px"}
                      width={"100%"}
                      sx={{
                        bgcolor: "purple.600",
                      }}
                    ></Skeleton>
                  </div>
                )}
              </div>
              <div className="w-[100%] min-w-[100px]  flex-shrink-1">
                {latestUsers.length > 0 ? (
                  <p className="p-2">Mobile</p>
                ) : (
                  <div className="p-2">
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      height={"30px"}
                      width={"100%"}
                      sx={{
                        bgcolor: "purple.600",
                      }}
                    ></Skeleton>
                  </div>
                )}
              </div>
              <div className="w-[80px]  flex-shrink-0">
                {latestUsers.length > 0 ? (
                  <p className="p-2">status</p>
                ) : (
                  <div className="p-2">
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      height={"30px"}
                      width={"100%"}
                      sx={{
                        bgcolor: "purple.600",
                      }}
                    ></Skeleton>
                  </div>
                )}
              </div>
            </div>

            {latestUsers.length > 0 &&
              latestUsers.map((current, index) => (
                <div className="font-normal flex my-2 text-[#A8B2BC] border-b border-gray-500 px-2">
                  <div className="w-[50px] p-2  flex-shrink-0">
                    <p className="p-2">{index + 1}</p>
                  </div>
                  {/* <div className="w-[90px] text-white font-semibold flex-shrink-0">
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
                  </div> */}
                  {/* <div className="w-[100px] flex-shrink-0">
                    <img
                      // src={`${connectionString}/thumbnails${current.fileLocation.replace(
                      //   "uploads/thumbnail",
                      //   ""
                      // )}`}
                      className=" h-[120px] w-[100px] p-2"
                    ></img>
                  </div> */}
                  <div className="min-w-[120px] w-[100%]  flex-shrink-1">
                    <p className="p-2">{current.name}</p>
                  </div>
                  <div className="w-[100%] min-w-[100px] flex-shrink-1">
                    <p className="p-2 break-words">{current.email}</p>
                  </div>{" "}
                  <div className="w-[100%] min-w-[100px] flex-shrink-1">
                    <p className="p-2 break-words">{current.mobile}</p>
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
