import { useState } from "react";
import BigScreenSideBar from "./components/BigScreenSideBar";
import IconScreenSideBar from "./components/iconScreenSideBar";
import Navbar from "./components/Navbar";
import useWindowSize from "./customHooks/useWindowSize";
import { NavLink, Route, Routes } from "react-router-dom";
import DragNDropImage from "./components/DragNDropImage";
import LayoutSelector from "./components/layoutSelector";
import AddMovies from "./components/AddMovies";
import AddWebSeries from "./components/AddWebSeries";
import AddLayout from "./components/AddLayout";
import AddSlider from "./components/AddSlider";
import Maintenece from "./components/Maintenece";
import AllMovies from "./components/AllMovies";

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
          <Route path="/addMovies" element={<AddMovies />}></Route>
          <Route path="/addWebShows" element={<AddWebSeries />}></Route>
          <Route path="/addLayout" element={<AddLayout />}></Route>
          <Route path="/addSlider" element={<AddSlider />}></Route>
          <Route path="/allMovies" element={<AllMovies/>}></Route>
          <Route path="*" element={<Maintenece />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
