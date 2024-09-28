import { set } from "mongoose";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import welldone from "../assests/well-done-well-done-team.gif"
import sad from "../assests/sad.gif"
const QuestionModal = (props) => {
  console.log(props.questionArray);
  const [answerGenerator, setAnswerGenerator] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const answerArray = [];
  const answerSelector = (questionNo, selectedAns) => {
    answerArray[questionNo] = selectedAns;
    console.log(answerArray);
  };

  const generateResult = () => {
    setAnswerGenerator(true);
    console.log(answerArray.length);
    props.questionArray.forEach((currentQuestion, index) => {
      console.log(currentQuestion.answer === answerArray[index]);
      if (currentQuestion.answer === answerArray[index]) {
        setCorrectAnswer((prev) => prev + 1);
      }
    });
  };
  console.log(correctAnswer);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={props.closeModal} // Close modal when clicking outside the modal content
    >
      <div
        className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[700px] max-w-md p-6 h-[80%] "
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
          onClick={props.closeModal}
        >
          <IoMdClose className="w-[20px] h-[20px]" />
        </button>
        {!answerGenerator && (
          <>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 border-b-2 text-center">
              AI generated Questions
            </h3>
            <div className="p-4 md:p-5 text-center max-h-[85%] overflow-y-scroll">
              {props.questionArray.map((current, index) => (
                <div className="flex flex-col items-start py-4  border-b-2">
                  <div className="flex  font-semibold w-[100%] justify-start py-2">
                    <p className="me-2  w-[80px] flex flex-start">{`Que-${
                      index + 1
                    }:`}</p>
                    <p className="flex justify-start text-start flex-1">
                      {current.description}
                    </p>
                  </div>
                  <div>
                    {current.options.map((currentOption, ansIndex) => (
                      <div className="flex">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          onClick={() => {
                            answerSelector(index, currentOption);
                          }}
                        ></input>
                        <p>{currentOption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="my-2 text-center">
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={generateResult}
              >
                Submit
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={props.closeModal}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        {answerGenerator && (
          <div className="text-center flex justify-center flex-col">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 border-b-2 text-center">
              AI QUESTIONS RESULT
            </h3>
            {correctAnswer>3&&<img src={welldone} className="h-[260px]"></img>}
            {correctAnswer<=3&&<img src={sad} className="h-[260px]"></img>}
            <h3 className="font-bold my-4">Correct Answer :  {correctAnswer}</h3>
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => {
                setAnswerGenerator(false);
                setCorrectAnswer(0);
              }}
            >
              reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;
