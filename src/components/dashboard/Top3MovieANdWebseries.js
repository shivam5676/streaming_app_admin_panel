import { Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import firstPlace from "../../assests/1-1.png";
import secondPlace from "../../assests/2nd-prize.png";
import thirdPlace from "../../assests/3rd-prize.png";
const Top3MovieANdWebseries = ({top3data}) => {
    const connectionString = process.env.REACT_APP_API_URL;
    const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  return (
    <>
      {top3data ? (
        <div
          className={`   md:w-[60%]  ${
            selectedTheme === "modern reeloid"
              ? "bg-black/40 backdrop-blur-lg "
              : "bg-[#2A3042]"
          } `}
        >
          {" "}
          <p
            className={`p-4 text-lg font-semibold flex ${
              selectedTheme === "Yellow Majestic"
                ? "text-[#FEBD59] "
                : "text-white"
            }`}
          >
            Top
            <label class="flex items-center relative w-24 cursor-pointer select-none mx-2">
              <input
                type="checkbox"
                class={`appearance-none transition-colors cursor-pointer w-24 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 ${
                  selectedTheme === "Yellow Majestic"
                    ? "bg-[#996e2d] "
                    : "bg-red-500"
                } peer`}
              />
              <span class="absolute font-medium text-xs uppercase left-8 text-white peer-checked:hidden">
                Movies
              </span>
              <span class="absolute font-medium text-xs uppercase right-8 text-white  peer-checked:block hidden">
                Shows
              </span>
              <span
                class={`w-7 h-7 left-0 absolute rounded-full transform transition-transform bg-gray-200 peer-checked:translate-x-[68px] text-center ${
                  selectedTheme === "Yellow Majestic"
                    ? "text-[#996e2d] "
                    : "text-red-500"
                }`}
              >
                3
              </span>
            </label>
            <span>(All Time)</span>
          </p>
          <div className="m-4 font-normal text-[.9rem] text-gray-200  overflow-x-auto">
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
                <div className="font-normal flex my-2 text-gray-200 border-b border-gray-500  shadow-lg hover:scale-95 hover:shadow-xl transition-transform duration-200">
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
                  <div
                    className="w-[80px]  flex-shrink-0 flex  items-center justify-center cursor-pointer"
                    onClick={() => {
                      navigate(`/allMovies/${current._id}`);
                    }}
                  >
                    <p className="p-2 px-3 font-semibold  border border-white hover:border-yellow-600 hover:bg-yellow-600 rounded-md text-white text-[.9rem] flex justify-center text-center ">
                      view
                    </p>
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
    </>
  );
};

export default Top3MovieANdWebseries;
