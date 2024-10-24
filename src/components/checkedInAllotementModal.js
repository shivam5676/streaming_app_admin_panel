import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const CheckedInAllotementModal = (props) => {
  const startDayRef = useRef(0);
  const [pointAllocationType, setpointAllocationType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const endDayRef = useRef(null);

  const offerDetailsRef = useRef(null);
  const rewardRef = useRef();
  const connectionString = process.env.REACT_APP_API_URL;
  const increasePointRef = useRef();
  const everyDayRef = useRef();

  const addPointsHAndler = async () => {
    if (endDayRef.current.value == null || endDayRef.current.value <= 0) {
      toast.error("end day can not be null or less than 0");
      return;
    }
    //  if(!isNaN(+endDayRef.current?.value)){
    //     toast.error("end day should be number only....")
    //   }
    const obj = {
      start: startDayRef.current,
      end: endDayRef.current.value,
      title: offerDetailsRef.current?.value || null,
      allocatedPoints: rewardRef.current?.value || null,
      increaseBy: increasePointRef.current?.value || null,
      dayPattern: everyDayRef.current?.value || null,
      pointAllocationType: pointAllocationType,
    };
    try {
      const response = await axios.post(
        `${connectionString}/admin/addPointSlide`,
        obj
      );
      console.log(response.data);
      // dispatch(sliderSliceACtion.addSlider(response.data));
      // setSuccessTick("success");
      // setMessage("Slider successfully Created");
      toast.success("slider added successfully");
    } catch (err) {
      console.log(err.response.data.msg);
      //   setSuccessTick("error");
      //   if (err.response && err.response.data.msg)
      //     setMessage(err.response.data.msg);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={props.closeModal} // Close modal when clicking outside the modal content
    >
      <div
        className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
          // onClick={props.closeModal}
        >
          <IoMdClose className="w-[20px] h-[20px]" />
        </button>
        <div className="p-4 md:p-5">
          <div className="flex max-[400px]:flex-col min-[400px]:justify-between text-[.9rem] text-gray-500 font-semibold">
            {" "}
            <div className="flex max-[400px]:py-2">
              <label className="px-2">Start Day :</label>
              <input
                className="w-[70px] border border-black"
                defaultValue={startDayRef.current}
              ></input>
            </div>{" "}
            <div className="flex max-[400px]:py-2">
              <label className="px-2">End Day : </label>
              <input
                className="w-[70px] border border-black"
                ref={endDayRef}
              ></input>
            </div>
          </div>
          <div className="flex flex-col  text-[.9rem] text-gray-500 font-semibold py-2">
            <label className="px-2">Offer Title:</label>
            <textarea
              className=" border border-black mx-2 px-2"
              ref={offerDetailsRef}
            ></textarea>
          </div>
          <div className="flex   text-[.9rem] text-gray-500 font-semibold py-2">
            <label className="px-2">Reward Points:</label>
            <input
              className="w-[70px] border border-black"
              type="number"
              ref={rewardRef}
            ></input>
          </div>
          <div className="flex flex-col text-[.9rem] font-bold text-gray-500 py-2 px-2">
            <p className="">Point Allocation :</p>
            <div className="flex justify-between w-full py-2">
              <div className=" text-[.9rem] text-gray-500 font-semibold">
                <label>Equal : </label>
                <input
                  type="checkbox"
                  onChange={(e) => setpointAllocationType("Equal")}
                  checked={pointAllocationType == "Equal"}
                ></input>
              </div>
              <div className=" text-[.9rem] text-gray-500 font-semibold">
                <label>Step By : </label>
                <input
                  type="checkbox"
                  onChange={(e) => setpointAllocationType("Step")}
                  checked={pointAllocationType == "Step"}
                ></input>
              </div>
            </div>
          </div>
          {pointAllocationType == "Step" && (
            <div className="flex flex-col text-[.9rem] font-bold text-gray-500 py-2 px-2">
              <p className="">Additional Details :</p>
              <div className="flex py-2 justify-between">
                {" "}
                <div className=" text-[.9rem] text-gray-500 font-semibold">
                  <label>Increase point : </label>
                  <input
                    className="w-[50px] border border-black"
                    type="number"
                    ref={increasePointRef}
                  ></input>
                </div>
                <div className=" text-[.9rem] text-gray-500 font-semibold">
                  <label>On Every : </label>
                  <input
                    className="w-[50px] border border-black"
                    type="number"
                    ref={everyDayRef}
                  ></input>
                  <label> Days </label>
                </div>
              </div>
            </div>
          )}
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={addPointsHAndler}
          >
            Submit
          </button>
          <button
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            //   onClick={props.closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckedInAllotementModal;
