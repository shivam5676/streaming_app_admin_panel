import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

const ToolTip = ({ content, ParaHeading, tipsContent }) => {
  return (
    <div className="relative group inline-block z-[1000000000]">
      <FaRegQuestionCircle className="text-white" />
      {/* Tooltip content */}
      <div className=" w-[200px] font-normal absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-3 py-2 text-sm  text-white bg-gray-900 rounded-lg shadow-lg dark:bg-gray-700">
        <p className="font-semibold w-[140px]">{ParaHeading}</p>{" "}
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
        {tipsContent && (
          <p className="font-semibold text-[.8rem] text-yellow-500">
            <span>Tips -</span> <span>{tipsContent}</span>
          </p>
        )}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default ToolTip;
