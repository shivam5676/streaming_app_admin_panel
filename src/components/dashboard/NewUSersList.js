import { CleanHands } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const NewUSersList = ({ latestUsers }) => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  // const connectionString = process.env.REACT_APP_API_URL;
  return (
    <section
      className={`w-[100%]  bg-[#2A3042]  py-2 my-2 ${
        selectedTheme === "modern reeloid"
          ? "bg-black/40 backdrop-blur-lg "
          : "bg-[#2A3042]"
      }`}
    >
      {" "}
      {latestUsers?.length > 0 ? (
        <div
          className={`p-4 text-lg font-semibold ${
            selectedTheme === "Yellow Majestic"
              ? "text-[#FEBD59] "
              : "text-white"
          }`}
        >
          New Users
        </div>
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
        <div className="font-semibold flex border-b pb-2 text-gray-200 border-gray-500 px-2">
          <div className="w-[50px] flex-shrink-0">
            {latestUsers?.length > 0 ? (
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
            {latestUsers?.length > 0 ? (
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
            {latestUsers?.length > 0 ? (
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
            {latestUsers?.length > 0 ? (
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
            {latestUsers?.length > 0 ? (
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

        {latestUsers?.length > 0 &&
          latestUsers.map((current, index) => (
            <div className="font-normal flex my-2 text-gray-200 border-b border-gray-500 px-2 shadow-lg hover:scale-95 hover:shadow-xl transition-transform duration-200">
              <div className="w-[50px] p-2  flex-shrink-0">
                <p className="p-2">{index + 1}</p>
              </div>
              <div className="min-w-[120px] w-[100%]  flex-shrink-1">
                <p className="p-2">{current.name}</p>
              </div>
              <div className="w-[100%] min-w-[100px] flex-shrink-1">
                <p className="p-2 break-words">{current.email}</p>
              </div>{" "}
              <div className="w-[100%] min-w-[100px] flex-shrink-1">
                <p className="p-2 break-words">{current.mobile}</p>
              </div>
              <div
                className="w-[80px]  flex-shrink-0 cursor-pointer"
                onClick={() => {
                  navigate(`/userDetails/${current._id}`);
                }}
              >
                <p className="p-2 px-3 font-semibold  border border-white hover:border-yellow-600 hover:bg-yellow-600 rounded-md text-white text-[.9rem] flex justify-center text-center ">
                  view
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default NewUSersList;
