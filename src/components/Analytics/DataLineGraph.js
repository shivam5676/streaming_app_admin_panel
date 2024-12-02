import React, { useState } from "react";
import AnalyticsToolTip from "./AnaltyicsToolTip";

const DataLineGraph = ({data, lineData, headingName,categoryName }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

//   const Data = [
//     { type: "Action", data: { oldUser: "2400", newUser: "700" } },
//     { type: "Adventure", data: { oldUser: "500", newUser: "600" } },
//   ];

  const handleMouseEnter = (event, text,categoryType) => {
    const rect = event.target.getBoundingClientRect();
    const tooltipWidth = 200; // Approximate tooltip width
    const screenWidth = window.innerWidth;
    const tooltipHeight = 50;

    let x = rect.left + rect.width / 2;
    let y = rect.top - tooltipHeight;

    // Adjust tooltip to prevent overflow
    if (x + tooltipWidth / 2 > screenWidth) {
      x = screenWidth - tooltipWidth / 2 - 10;
    }

    if (x - tooltipWidth / 2 < 0) {
      x = tooltipWidth / 2 + 10;
    }

    if (y < 0) {
      y = rect.bottom + 10; // Position below if no space above
    }

    setTooltip({ visible: true, text, x, y ,categoryType:categoryType,categoryName:categoryName});
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: "", x: 0, y: 0, genre: ""});
  };

  return (
    <>
      <p className="w-full">{headingName}</p>
      <div className="h-full overflow-y-auto customScrollbar">
        {data?.map((current) => {
          const oldUsersViews = +current.data?.oldUser || 0;
          const newUserViews = +current.data?.newUser || 0;
          const totalViews = oldUsersViews + newUserViews;

          const oldUserPercentage = Math.round(
            (oldUsersViews * 100) / totalViews
          );
          const newUserPercentage = Math.round(
            (newUserViews * 100) / totalViews
          );

          const OldUserTooltipText = `Old User: ${oldUsersViews} (${oldUserPercentage}%)`;
          const NewUserTooltipText = `New User: ${newUserViews} (${newUserPercentage}%)`;

          return (
            <div className="flex w-full h-[50px]" key={current.genre}>
              <div className="mx-2 flex flex-col justify-center">
                <p className="w-[100px] text-[1rem] p-0 m-0 leading-none">
                  {current.type}
                </p>
                <span className="text-[.8rem] text-gray-400 p-0 m-0 leading-none">
                  {totalViews}
                </span>
              </div>

              <div className="flex flex-col w-full gap-1 justify-center">
                <p
                  style={{ width: `${oldUserPercentage}%` }}
                  className="border-4 border-red-500"
                  onMouseEnter={(e) =>
                    handleMouseEnter(e, OldUserTooltipText ,current.type)
                  }
                  onMouseLeave={handleMouseLeave}
                ></p>
                <p
                  style={{ width: `${newUserPercentage}%` }}
                  className="border-4 border-green-500"
                  onMouseEnter={(e) =>
                    handleMouseEnter(e, NewUserTooltipText, current.type)
                  }
                  onMouseLeave={handleMouseLeave}
                ></p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <AnalyticsToolTip heading={"Views"} tooltip={tooltip} />
      )}
    </>
  );
};

export default DataLineGraph;
