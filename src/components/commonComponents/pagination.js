import React from "react";
import { LiaBackwardSolid, LiaForwardSolid } from "react-icons/lia";
import { toast } from "react-toastify";

const Pagination = ({ metaData, jumpToPage }) => {
  console.log(metaData);
  // const { totalPages, current, limit } = metadata;
  // console.log(totalPages, current, limit);
  // let current = +metaData.current;
  const pageJumpHandler = (pageNo) => {
    jumpToPage(pageNo);
  };

  return (
    <section className="flex mx-4 my-2 text-white text-[.85rem] font-semibold justify-between max-sm:flex-col max-sm:items-center max-sm:gap-2">
      <p>
        Showing {metaData.current * metaData.limit} to{" "}
        {+metaData.limit + +metaData.current * metaData.limit} of{" "}
        {metaData.totalData} entries
      </p>
      <div className="flex  hover:cursor-pointer">
        <p
          className={`border border-gray-500 h-full px-2 py-1  ${
            metaData.current == 0 ? "text-gray-400" : "hover:text-yellow-500"
          }`}
          onClick={() => {
            if (metaData.current <= 0) {
              toast.error("you can not go previous");
            } else {
              pageJumpHandler(--metaData.current);
            }
          }}
        >
          <LiaBackwardSolid className="h-[20px] " />
        </p>
        {+metaData.totalPages >=1 && (
          <p
            className={`border border-gray-500 h-full px-2 py-1  ${
              metaData.current == 0
                ? "text-black bg-[#FEBD59] "
                : "hover:text-yellow-500"
            }`}
            onClick={() => {
              pageJumpHandler(0);
            }}
          >
            1
          </p>
        )}
        {metaData.totalPages >= 2 && (
          <p
            className={`border border-gray-500 h-full px-2 py-1  ${
              metaData.current == 1
                ? "text-black bg-[#FEBD59] "
                : "hover:text-yellow-500"
            }`}
            onClick={() => {
              pageJumpHandler(1);
            }}
          >
            2
          </p>
        )}
        {metaData.totalPages >= 3 && (
          <p
            className={`border border-gray-500 h-full px-2 py-1  ${
              metaData.current >= 2 && "text-black bg-[#FEBD59] "
            }`}
          >
            {metaData.current <3 ? 3 : metaData.current+1}
          </p>
        )}

        <p className="border border-gray-500 px-2 py-1">.......</p>
        <p
          className="border border-gray-500 px-2 py-1"
          onClick={() => {
            pageJumpHandler(metaData.totalPages - 1);
          }}
        >
          {metaData.totalPages}
        </p>
        <p
          className={`border border-gray-500 h-full px-2 py-1  ${
            metaData.current == metaData.totalPages - 1
              ? "text-gray-400"
              : "hover:text-yellow-500"
          }`}
          onClick={() => {
            if (metaData.current == metaData.totalPages - 1) {
              toast.error("you can not go next");
            } else {
              pageJumpHandler(++metaData.current);
            }
          }}
        >
          {<LiaForwardSolid className="h-[20px] " />}
        </p>
      </div>
    </section>
  );
};

export default Pagination;
