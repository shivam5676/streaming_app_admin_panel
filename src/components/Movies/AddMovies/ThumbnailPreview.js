import React from "react";

const ThumbnailPreview = ({
  thumbnailUrlPreview,
  removeThumbnailPreview,
}) => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="w-[150px] h-[220px] rounded-md">
        <img
          src={thumbnailUrlPreview}
          className="border w-[100%] h-[100%] rounded-md"
        ></img>
        <div
          className="flex justify-center text-[.9rem] text-yellow-500 underline cursor-pointer font-semibold pt-1"
          onClick={() => {
            //   setThumbNailUrlPreview(null);
            removeThumbnailPreview();
          }}
        >
          remove Image
        </div>
      </div>
    </div>
  );
};

export default ThumbnailPreview;
