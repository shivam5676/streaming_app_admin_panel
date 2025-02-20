import React from "react";

const Pagination = ({ metaData }) => {
  console.log(metaData);
  // const { totalPages, current, limit } = metadata;
  // console.log(totalPages, current, limit);

  return (
    <section className="flex mx-4 my-2 text-white text-[.85rem] font-semibold justify-between max-sm:flex-col max-sm:items-center max-sm:gap-2 hover:cursor-pointer">
      <p>
        Showing {metaData.current} to 10 of{" "}
        {metaData.totalPages * metaData.limit} entries
      </p>
      <div className="flex">
        <p className="border border-gray-500 px-2 py-1">Previous</p>
        {Array(metaData.totalPages)
          .fill()
          .map((current, index) => {
            return (
              <p className="border border-gray-500 px-2 py-1">{index + 1}</p>
            );
          })}
        <p className="border border-gray-500 px-2 py-1">.......</p>
        <p className="border border-gray-500 px-2 py-1">Next</p>
      </div>
    </section>
  );
};

export default Pagination;
