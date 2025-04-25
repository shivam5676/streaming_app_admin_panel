import React from "react";
import { FaTrash } from "react-icons/fa";

const ThumbnailPreview = ({ thumbnailUrlPreview, removeThumbnailPreview }) => {
  return (
    // <div className="w-[100%] flex justify-center">
    //   <div className="w-[150px] h-[220px] rounded-md">
    //     <img
    //       src={thumbnailUrlPreview}
    //       className="border w-[100%] h-[100%] rounded-md"
    //     ></img>
    //     <div
    //       className="flex justify-center text-[.9rem] text-purple-400 underline cursor-pointer font-semibold pt-1"
    //       onClick={() => {
    //         //   setThumbNailUrlPreview(null);
    //         removeThumbnailPreview();
    //       }}
    //     >
    //       remove Image
    //     </div>
    //   </div>
    // </div>
    <div className="w-full flex justify-center">
      <div className="w-[150px] h-[220px] rounded-md relative group overflow-hidden">
        <img
          src={thumbnailUrlPreview}
          className="border w-[100%] h-[100%] rounded-md"
          alt="Thumbnail Preview"
          type="file"
          accept=".png, .jpg, .jpeg"
        />

        {/* Hover Overlay with Delete Icon */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => {
            removeThumbnailPreview();
          }}
        >
          <FaTrash className="text-white text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ThumbnailPreview;
