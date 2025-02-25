import React from "react";
import { useSelector } from "react-redux";
import DoughnutData from "../commonComponents/doughnutData";
import { Skeleton } from "@mui/material";

const ViewsComparisonGraph = ({ contentViews }) => {
  const selectedTheme = useSelector((state) => state.theme.SelectedTheme);
  return (
    <>
      {Object.values(contentViews).length != 0 ? (
        <div
          className={`w-[100%] md:w-[40%]  ${
            selectedTheme === "modern reeloid"
              ? "bg-black/40 backdrop-blur-lg "
              : "bg-[#2A3042]"
          } `}
        >
          <p
            className={`p-4 text-lg font-semibold ${
              selectedTheme === "Yellow Majestic"
                ? "text-[#FEBD59] "
                : "text-white"
            }`}
          >
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
    </>
  );
};

export default ViewsComparisonGraph;
