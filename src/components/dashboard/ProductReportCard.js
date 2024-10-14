import { Unpublished } from "@mui/icons-material";
import React from "react";
import CountUp from "react-countup";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaArrowUp,
} from "react-icons/fa";

const ProductReportCard = ({ published, UnPublished,name,cardIcon }) => {
  const total = (+published || 0) + (+UnPublished || 0);
  
  return (
    <div className="bg-[#626ED4] h-[156px] flex flex-col p-4 rounded">
      <div className="flex">
        <div className="p-2 bg-[#7984DA] h-fit rounded-md">
          <img src={cardIcon} className="h-[50px] w-[50px]"></img>
        </div>{" "}
        <div className="p-2 text-xl font-semibold text-gray-300">
          <p className="">{name}</p>
          <div className="text-white flex">
            <p>
              <CountUp end={total} duration={3}></CountUp>
            </p>
            {total>0 && (
              <div className="flex items-center px-2">
                <FaArrowUp className="text-green-500" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" h-[100px]">
        <div className="flex text-[.9rem] font-semibold justify-between py-1">
          <div className="flex items-center">
            <FaArrowAltCircleUp className="text-green-400" />
            <div className="px-2 flex flex-col items-center">
              <p>Published</p>
              <p>{published||0}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaArrowAltCircleDown className="text-red-400" />
            <div className="px-2 flex flex-col items-center">
              <p>Unpublished</p>
              <p>{UnPublished||0}</p>
            </div>
          </div>
        </div>{" "}
      </div>
      {/* <p className="text-[.8rem] text-gray-300 font-semibold">This Month Data</p> */}
    </div>
  );
};

export default ProductReportCard;
