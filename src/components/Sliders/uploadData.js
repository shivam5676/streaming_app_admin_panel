import React, { useRef, useState } from "react";

const UploadData = ({
  promotionalContentType,
  setContentType,
  promotionalImage,
  promotionalUrl,
}) => {
  const promotionalImageRef = useRef();
  const promotionalImageURLRef = useRef();
  // const [promotionalContentType,setpromotionalContentType]=useState("Image-upload")
  const handlePromotionalContentType = (e) => {
    // setpromotionalContentType(e.target.value);
    setContentType(e.target.value);
  };
  const promotionalImageHandler = (e) => {
    console.log(e.target.files[0], "hehhe");
    promotionalImage(e.target.files[0])
  };
  const promotionalUrlHandler = (e) => {
    console.log(e.target.value);
    promotionalUrl(e.target.value);
  };
  return (
    <div className="p-4 font-semibold w-[100%] ">
      <p>
        Link Promotional Content :<span className="text-red-500"> *</span>
        <select
          className="bg-transparent mx-4 outline-none border-2 rounded px-2 py-1"
          onChange={handlePromotionalContentType}
        >
          <option className="px-2 bg-[#2E3648]" value="Image-upload">
            By Image Upload:
          </option>
          <option className="px-2 bg-[#2E3648]" value="URL">
            By URL (pre uploaded Image) :
          </option>
        </select>
      </p>
      <div className="my-4">
        {" "}
        {promotionalContentType === "Image-upload" && (
          <input
            className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
            ref={promotionalImageRef}
            type="file"
            onChange={(e) => {
              promotionalImageHandler(e);
            }}
          ></input>
        )}{" "}
        {promotionalContentType === "URL" && (
          <input
            className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
            ref={promotionalImageURLRef}
            onChange={(e) => {
              promotionalUrlHandler(e);
            }}
            // type="file"
            placeholder="Enter the Url address of Image eg...(https://reeloid.com/image.jpg"
          ></input>
        )}
      </div>{" "}
      {/* if promotional content type will be url then we will show url input box else we will show file input box with thier given key property*/}
    </div>
  );
};

export default UploadData;
