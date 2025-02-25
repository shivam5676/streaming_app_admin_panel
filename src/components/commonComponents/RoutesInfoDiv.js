import React from "react";

const RoutesInfoDiv = ({mainHeading,websiteName,sectionName,currentDir}) => {
  return (
    <div className="text-white px-2 py-4 ">
      <p className="text-lg font-bold">{mainHeading}</p>
      <p className="text-[.85rem] font-semibold">
        <span>{websiteName}</span> <span className="mx-2"> &gt; </span>
        <span>{sectionName}</span>
        <span className="mx-2"> &gt; </span>
        <span className="text-[#A8B2BC]">{currentDir}</span>
      </p>
    </div>
  );
};

export default RoutesInfoDiv;
