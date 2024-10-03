import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { TbRecordMail } from "react-icons/tb";

const UserDetails = () => {
  return (
    <>
      <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll px-4 py-2">
        <div className="text-white px-2 py-4 ">
          <p className="text-lg font-bold">Edit Movie</p>
          <p className="text-[.95rem] font-semibold">
            <span>Reelisis</span> <span className="mx-2"> &gt; </span>
            <span>Users section</span>
            <span className="mx-2"> &gt; </span>
            <span>User Details</span>
          </p>
        </div>
        <div class="md:w-[100%] py-4 px-4 ">
          <div class=" ">
            <div>
              <div class="bg-[#2E3648] relative shadow p-2 rounded-lg text-gray-800 hover:shadow-lg">
                <div class="right-0 mt-4 rounded-l-full absolute text-center font-bold text-xs text-white px-2 py-1 bg-orange-500">
                  PREMIUM
                </div>
                <img
                  src="https://images.unsplash.com/photo-1564497717650-489eb99e8d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1963&q=80"
                  class="h-32 rounded-lg w-full object-cover"
                />
                <div class="flex justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    class="rounded-full -mt-6 border-4 object-center object-cover border-white mr-2 h-16 w-16"
                  />
                </div>
                <div class="py-2 px-2 text-white">
                  <div class=" font-bold font-title  justify-center flex">
                    <p className="text-wrap mx-2 ">Shivam Singh</p>
                    <FaRegEdit className="cursor-pointer" />
                  </div>
                  <div className="flex font-semibold justify-center  max-sm:flex-col">
                    {" "}
                    <div class="text-sm flex text-wrap text-center items-center my-2 px-2 border-e-2">
                      <MdMarkEmailUnread className="w-[20px] h-[20px] text-blue-400 " />{" "}
                      <p className="text-wrap w-[100%] mx-2 ">
                        shivam.handler@gmail.com
                      </p>
                      <FaRegEdit className="cursor-pointer" />
                    </div>{" "}
                    <div class="text-sm flex text-center items-center  my-2 px-2">
                      <IoCall className="w-[20px] h-[20px] text-blue-400" />{" "}
                      <p className="text-wrap mw-[100%]  mx-2">
                        +91 9559923286
                      </p>
                      <FaRegEdit className="cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-center items-center text-sm  font-semibold ">
                    <p>Password :</p>
                    <p className="border-b-2 flex items-center px-4 mx-2 h-10">
                      ***********
                    </p>
                    <p className="text-[.75rem] bg-red-400 text-white px-2 py-1 rounded cursor-pointer">
                      Change password
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="   sm:columns-3 px-4 rounded-sm">
          <div className="bg-[#2E3648] w-[100%] h-[300px] overflow-y-auto ">
            <p className="text-white font-bold text-center p-3">
              Daily Check-In Report
            </p>
            <table className="table-fixed w-[100%]">
              <thead className="text-yellow-500">
                <tr>
                  <th>Date</th>
                  <th>Rewards</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                <tr className="mx-6 border-b  text-blue-500">
                  <td className="text-center">12/05/2004</td>
                  <td className="text-center">5000</td>
                  <td className="text-center">1975</td>
                </tr>
                <tr className="mx-6 border-b  text-blue-500">
                  <td className="text-center">12/05/2004</td>
                  <td className="text-center">5000</td>
                  <td className="text-center">1975</td>
                </tr>
                <tr className="mx-6 border-b  text-blue-500">
                  <td className="text-center">12/05/2004</td>
                  <td className="text-center">5000</td>
                  <td className="text-center">1975</td>
                </tr>
                <tr className="mx-6 border-b  text-blue-500">
                  <td className="text-center">12/05/2004</td>
                  <td className="text-center">5000</td>
                  <td className="text-center">1975</td>
                </tr>
                <tr className="mx-6 border-b  text-blue-500">
                  <td className="text-center">12/05/2004</td>
                  <td className="text-center">5000</td>
                  <td className="text-center">1975</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-[#2E3648] w-[100%] h-20 "></div>{" "}
          <div className="bg-[#2E3648] w-[100%] h-20 "></div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
