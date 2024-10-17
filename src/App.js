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
import EditMovies from "./components/editMovie";
import AllLAyout from "./components/AllLAyout";
import EditLayout from "./components/EditLayout";
import AllSliders from "./components/AllSliders";
import AllGenreList from "./components/AllGenreList";
import LanguageList from "./components/LanguageLIst";
import EdducationQuestionGenerator from "./components/educationQuestionGenerator";
import AllUsers from "./components/AllUSers";
import UserDetails from "./components/UserDetails";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";


function App() {
  const [smallSideBarActivated, setSmallSideBarActivated] = useState(false);
  const { width, height } = useWindowSize();
  console.log(width, height);
  return (
    <div className="bg-[#222736] w-[100vw] h-[100vh]">
      {/* <Navbar
        handleSmallSideBar={() => {
          setSmallSideBarActivated(!smallSideBarActivated);
        }}
        smallSideBarActivated={smallSideBarActivated}
      ></Navbar>
      <div className="flex h-[calc(100vh-70px)]">
      
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
          <Route path="/allMovies" element={<AllMovies />}></Route>
          <Route path="/allMovies/:edit" element={<EditMovies />}></Route>
          <Route path="/allLayouts" element={<AllLAyout />}></Route>
          <Route path="/allLayout/:edit" element={<EditLayout />}></Route>
          <Route path="/allSliders" element={<AllSliders />}></Route>
          <Route path="/genreslist" element={<AllGenreList />}></Route>
          <Route path="/LanguageList" element={<LanguageList />}></Route>{" "}
          <Route
            path="/QuestionUploader"
            element={<EdducationQuestionGenerator />}
          ></Route>{" "}
          <Route path="allUsers" element={<AllUsers />}></Route>
          <Route path="/userDetails/:uid" element={<UserDetails />}></Route>
          
          <Route path="*" element={<DashBoard />}></Route>
        </Routes>
      </div> */}
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
