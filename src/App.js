import { useState } from "react";
import BigScreenSideBar from "./components/BigScreenSideBar";
import IconScreenSideBar from "./components/iconScreenSideBar";
import Navbar from "./components/Navbar";
import useWindowSize from "./customHooks/useWindowSize";
import { NavLink, Route, Routes } from "react-router-dom";
import DragNDropImage from "./components/DragNDropImage";
import LayoutSelector from "./components/layoutSelector";

function App() {
  const [smallSideBarActivated, setSmallSideBarActivated] = useState(false);
  const { width, height } = useWindowSize();
  console.log(width, height);
  return (
    <div className="bg-[#222736] w-[100vw] h-[100vh]">
      <Navbar
        handleSmallSideBar={() => {
          setSmallSideBarActivated(!smallSideBarActivated);
        }}
        smallSideBarActivated={smallSideBarActivated}
      ></Navbar>
      <div className="flex h-[calc(100vh-70px)]">
        {/* {!smallSideBarActivated ? <BigScreenSideBar /> : <IconScreenSideBar />} */}
        {width >= 992 && !smallSideBarActivated ? (
          <BigScreenSideBar />
        ) : width >= 992 && smallSideBarActivated ? (
          <IconScreenSideBar />
        ) : (
          !smallSideBarActivated && <BigScreenSideBar />
        )}
        <Routes>
          {/* <Route path="/addMovie" element={<p>hello</p>}></Route> */}
        </Routes>
        <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll mx-4 my-2">
          <div className="text-white mx-2 my-4 ">
            <p className="text-lg font-bold">Add Movie</p>
            <p className="text-[.95rem] font-semibold">
              <span>Reelisis</span> <span className="mx-2"> &gt; </span>
              <span>Movies section</span>
              <span className="mx-2"> &gt; </span>
              <span>Add Movie</span>
            </p>
          </div>
          <section className="flex gap-6 flex-col xl:flex-row">
            <div className="bg-[#2A3042] flex-1  rounded-md text-white">
              <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
                <p>Movie Info</p>
              </div>
              <div className="m-4 font-semibold">
                <p>Title</p>
                <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input>
              </div>
              <div className="m-4 font-semibold">
                <p>Select Layout</p>
                <LayoutSelector />
                {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
              </div>
            </div>
            <div className="bg-[#2A3042] flex-1  rounded-md text-white">
              <div className="m-4 text-[1rem] font-semibold border-b pb-2 border-gray-500 border-spacing-x-3">
                <p>Additional Info</p>
              </div>
              <div className="m-4 font-semibold">
                <p>Thumbnail</p>
                <div className="flex w-[100%] py-4 gap-16 ">
                  {" "}
                  <DragNDropImage></DragNDropImage>
                  <div className="w-[150px] h-[220px] rounded-md">
                    <div className="border w-[100%] h-[100%] rounded-md"></div>
                  </div>
                </div>
                {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
              </div>
              <div className="m-4 font-semibold">
                <p>Thumbnail</p>
                <div className="flex w-[100%] py-4 gap-16 ">
                  {" "}
                  <DragNDropImage></DragNDropImage>
                  <div className="w-[150px] h-[220px] rounded-md">
                    <div className="border w-[100%] h-[100%] rounded-md"></div>
                  </div>
                </div>
                {/* <input className="w-full h-[30px] bg-[#2E3648] p-4 outline-none text-[rgb(107,149,168)] rounded-md"></input> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
