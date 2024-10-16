import { Unpublished } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaArrowUp,
} from "react-icons/fa";

const ProductReportCard = ({
  published,
  UnPublished,
  name,
  cardIcon,
  loading,
}) => {
  const total = (+published || 0) + (+UnPublished || 0);
  console.log(loading);
  return (
    <div className="bg-[#626ED4] h-[156px] flex flex-col p-4 rounded">
      <div className="flex">
        {!loading ? (
          <div className="p-2 bg-[#7984DA] h-fit rounded-md">
            <img src={cardIcon} className="h-[50px] w-[50px]"></img>
          </div>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={"50px"}
            height={"50px"}
            sx={{ bgcolor: "purple.600" }}
          />
        )}
        <div className="p-2 text-xl font-semibold text-gray-300">
          {!loading ? (
            <p className="">{name}</p>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"140px"}
              height={"20px"}
              sx={{ bgcolor: "purple.600" }}
            />
          )}
          <div className="text-white flex">
            {!loading ? (
              <p>
                <CountUp end={total} duration={3}></CountUp>
              </p>
            ) : (
              <p className="mt-2">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={"80px"}
                  height={"20px"}
                  sx={{ bgcolor: "purple.600" }}
                />
              </p>
            )}
            {total > 0 && (
              <div className="flex items-center px-2">
                <FaArrowUp className="text-green-500" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" h-[100px]">
        <div className="flex text-[.9rem] font-semibold justify-between py-1">
          {loading ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"100px"}
              height={"40px"}
              sx={{ bgcolor: "purple.600" }}
            />
          ) : (
            <div className="flex items-center">
              <FaArrowAltCircleUp className="text-green-400" />
              <div className="px-2 flex flex-col items-center">
                <p>Published</p>
                <p>{published || 0}</p>
              </div>
            </div>
          )}
          {loading ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"100px"}
              height={"40px"}
              sx={{ bgcolor: "purple.600" }}
            />
          ) : (
            <div className="flex items-center">
              <FaArrowAltCircleDown className="text-red-400" />
              <div className="px-2 flex flex-col items-center">
                <p>Unpublished</p>
                <p>{UnPublished || 0}</p>
              </div>
            </div>
          )}
        </div>{" "}
      </div>
      {/* <p className="text-[.8rem] text-gray-300 font-semibold">This Month Data</p> */}
    </div>
  );
};

export default ProductReportCard;
