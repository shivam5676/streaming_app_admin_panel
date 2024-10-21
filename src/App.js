import { useEffect, useState } from "react";
import BigScreenSideBar from "./components/BigScreenSideBar";
import IconScreenSideBar from "./components/iconScreenSideBar";
import Navbar from "./components/Navbar";
import useWindowSize from "./customHooks/useWindowSize";
import { NavLink, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import { routes } from "./routes/routes";
import { authRoutes } from "./routes/authRoutes";
import { useDispatch, useSelector } from "react-redux";
import { loginSliceAction } from "./store/loginSlice";

function App() {
  const isLoggedIn = useSelector((state) => state.loginData.loggedIn);
  const dispatch = useDispatch();
  // console.log(loggedIn)
  const [smallSideBarActivated, setSmallSideBarActivated] = useState(false);
  const { width, height } = useWindowSize();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(width, height);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loginSliceAction.login("user", true));
    }
  }, [isLoggedIn]);
  const handleLogin = () => {
    // setIsLoggedIn(true);
  };
  return (
    <div className="bg-[#222736] w-[100vw] h-[100vh]">
      {isLoggedIn ? (
        <>
          {" "}
          <Navbar
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
              {routes.map((current) => (
                <Route path={current.path} element={current.element}></Route>
              ))}
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          {authRoutes.map((current) => (
            <Route path={current.path} element={current.element} />
          ))}
        </Routes>
      )}
    </div>
  );
}

export default App;
