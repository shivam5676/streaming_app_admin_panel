import { useState } from "react";
import BigScreenSideBar from "./components/BigScreenSideBar";
import IconScreenSideBar from "./components/iconScreenSideBar";
import Navbar from "./components/Navbar";

function App() {
  const [smallSideBarActivated, setSmallSideBarActivated] = useState(false);
  return (
    <div className="bg-[#222736] w-[100vw] h-[100vh]">
      <Navbar
        handleSmallSideBar={() => {
          setSmallSideBarActivated(!smallSideBarActivated);
        }}
      
      ></Navbar>
      <div className="flex h-[calc(100vh-70px)]">
        {!smallSideBarActivated ? <BigScreenSideBar /> : <IconScreenSideBar />}
      </div>
    </div>
  );
}

export default App;
