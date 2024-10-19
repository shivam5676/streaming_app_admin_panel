import React, { useRef } from "react";
import logoIcon from "../assests/logo-icon.png";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaUnlockAlt } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSliceAction } from "../store/loginSlice";

const Login = (props) => {
  const connectionString = process.env.REACT_APP_API_URL;
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch=useDispatch()
  const loginHandler = async () => {
    try {
      const response = await axios.post(`${connectionString}/admin/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch(loginSliceAction.login())
      // console.log(response);
      // props.loggedIn();
      // setGenres(response.data.allGenres);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="h-[70px] w-full "></div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col max-w-[420px] min-w-[250px] w-full h-[470px] relative rounded-lg">
          <div className="h-[120px] bg-[#626ED4]  rounded-t-md w-full text-center p-4">
            <p className="text-white font-semibold">Welcome Back !</p>
            <p className="text-[.8rem] text-gray-300">
              Sign in to continue to Reelies
            </p>
          </div>
          {/* Centered Circle */}
          <div className="text-white bg-[#2A3042] border-2 rounded-full  h-[74px] w-[74px] absolute left-1/2 top-[75px] transform -translate-x-1/2 glow-animate-neon">
            <img src={logoIcon} className="p-4"></img>
          </div>
          <div className="bg-[#2A3042]  w-full h-full pt-[40px]  rounded-b-md">
            <div className="p-8">
              <div className=" text-white text-[.9rem] font-semibold flex flex-col">
                <label className="m-2">Email</label>
                <input
                  className="h-[35px] bg-[#2E3648] rounded p-2 mx-2 glow-animate-purple outline-none"
                  placeholder="testing@abc.com"
                  ref={emailRef}
                ></input>
              </div>
              <div className=" text-white text-[.9rem] font-semibold flex flex-col">
                <label className="m-2">Password</label>
                <input
                  className="h-[35px] bg-[#2E3648] rounded p-2 mx-2 glow-animate-purple outline-none"
                  ref={passwordRef}
                ></input>
              </div>
              <div className="flex justify-between w-[100%] mt-4">
                <div className="m-2 text-white  text-[.9rem] py-auto">
                  <input type="checkbox"></input>
                  <label className="mx-2 font-semibold">Remember me</label>
                </div>
                <div
                  className="cursor-pointer relative text-[.8rem] hover:shadow-md hover:shadow-yellow-300 inline-flex items-center justify-center  px-6 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#626ED4] rounded-md shadow-md group"
                  style={{ textShadow: "2px 2px 8px #facc15" }}
                  onClick={() => {
                    loginHandler();
                  }}
                >
                  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#626ED4] group-hover:translate-x-0 ease">
                    <FaArrowRightLong className="w-[25px] h-[25px]" />
                  </span>
                  <span className="absolute  flex items-center justify-center w-full h-full text-[#cbccd8] transition-all duration-300 transform group-hover:translate-x-full ease">
                    Sign In
                  </span>
                  <span className="relative invisible">Sign In</span>
                </div>
              </div>
            </div>{" "}
            <div className="flex px-8 items-center">
              <FaUnlockAlt className=" text-[#7f8bf7] font-semibold mx-2" />
              <p className="cursor-pointer text-[#7f8bf7] text-[.8rem] font-semibold">
                forgot your password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
