import React from "react";

const AllMovies = () => {
  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
      <div className="text-white px-2 py-4 ">
        <p className="text-lg font-bold">Add Slider</p>
        <p className="text-[.95rem] font-semibold">
          <span>Reelisis</span> <span className="mx-2"> &gt; </span>
          <span>Hero section</span>
          <span className="mx-2"> &gt; </span>
          <span>Add Slider</span>
        </p>
      </div>
      <section className="w-[100%]">
        {" "}
        <div className="flex gap-6 flex-col xl:flex-row">
          <div className="bg-[#2A3042] flex-1  rounded-md text-white">
            <div className="m-4 text-[.9rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <p>Show </p>
                  <select className="bg-[#2E3648]  mx-2 px-4 py-1">
                    <option>10</option>
                    <option>10</option>
                    <option>10</option>
                  </select>
                  <p>results </p>
                </div>
                <div className="flex items-center">
                  <p>search : </p>
                  <input
                    className="w-[150px] bg-[#2E3648] mx-2 p-2"
                    placeholder="search"
                  ></input>
                </div>
              </div>
            </div>
            {/* <div className="m-4 font-semibold">
              <p>
                Slider Name <span className="text-red-500"> *</span>
              </p>
              <input
                className="w-full h-[40px] bg-[#2E3648] py-2 px-4 outline-none text-[rgb(107,149,168)] rounded-md"
                ref={sliderNameRef}
              ></input>
            </div>
            <div className="p-4 font-semibold w-[100%]">
              <p>
                Slider Type <span className="text-red-500"> *</span>
              </p>

              <select
                className="w-full h-[40px] bg-[#2E3648]  py-2 px-4 outline-none text-white  rounded-md my-2"
                ref={sliderTypeRef}
              >
                <option value={"Promotional"}>Promotional</option>
                <option value={"Trailer"}>Trailer</option>
                <option value={"movies_shorts"}>Movies_shorts</option>
              </select>
            </div>
           
            <div className="p-4 font-semibold w-[100%]">
              <p>
                Link Movie and thier shorts to this Slide{" "}
                <span className="text-red-500"> *</span>
              </p>

              <select
                className="w-full h-[40px]  py-2 px-4 bg-[#2E3648]  outline-none text-white  rounded-md my-2"
                ref={linkedMovieIdRef}
              >
                <option value={1}>tiger 3</option>
                <option value={2}>kgf</option>
                <option value={1}>indian 2</option>
              </select>
            </div>

            <div className="p-4 font-semibold w-[100%]">
              <p>Additional Info</p>
              <div className=" p-4 flex flex-row gap-4">
                <div className=" w-[70%]">
                  <div className=" border-dashed border-2 h-[400px] flex items-center justify-center">
                    <p>Upload Thumbnail</p>
                  </div>
                </div>
                <div className=" border-2 w-[200px]">
                  <p>Thumbnail Preview</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* <div className="my-3">
        {" "}
        <div className="flex justify-end w-[100%]">
          <div
            onClick={() => {
              addSliderHandler();
            }}
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-semibold">Add Slider</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AllMovies;
