import React from "react";

const Pagination = () => {
  return (
    <section className="flex m-2 text-white text-[.95rem] font-semibold justify-between">
      <p>Showing 1 to 10 of 155 entries</p>
      <div className="flex">
        <p className="border border-gray-500 px-2 py-1">Previous</p>
        <p className="border border-gray-500 px-2 py-1">1</p>
        <p className="border border-gray-500 px-2 py-1">2</p>
        <p className="border border-gray-500 px-2 py-1">3</p>
        <p className="border border-gray-500 px-2 py-1">.......</p>
        <p className="border border-gray-500 px-2 py-1">Next</p>
      </div>
    </section>
  );
};

export default Pagination;
