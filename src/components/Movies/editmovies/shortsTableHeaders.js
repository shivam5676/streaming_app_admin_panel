import { Skeleton } from "@mui/material";
import React from "react";

const ShortsTableHeaders = ({ shortsPreviewFromBackend }) => {
  return (
    <div className="font-semibold flex border-b pb-2 text-[#A8B2BC] border-gray-500 px-2">
      <div className="w-[50px] flex-shrink-0">
        {shortsPreviewFromBackend.length > 0 ? (
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
      <div className="w-[90px] flex-shrink-0">
        {shortsPreviewFromBackend.length > 0 ? (
          <p className="p-2">Action</p>
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
        {shortsPreviewFromBackend.length > 0 ? (
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
      <div className="w-[80%] min-w-[100px]  flex-shrink-1">
        {shortsPreviewFromBackend.length > 0 ? (
          <p className="p-2">Views</p>
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
      </div>{" "}
      <div className=" min-w-[60px]  flex-shrink-1">
        {shortsPreviewFromBackend.length > 0 ? (
          <p className="p-2">Deduct</p>
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
      </div>{" "}
      <div className="w-[80%] min-w-[70px]  flex-shrink-1">
        {shortsPreviewFromBackend?.length > 0 ? (
          <p className="p-2">Visible</p>
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
      <div className="w-[80px]   flex-shrink-0">
        {shortsPreviewFromBackend?.length > 0 ? (
          <p className="p-2">Preview</p>
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
  );
};

export default ShortsTableHeaders;
