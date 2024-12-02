import React, { useState } from "react";

const AnalyticsToolTip = ({ tooltip, heading }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: tooltip.y+30,
        left: tooltip.x,
        transform: "translate(-50%, -100%)",
        background: "#000",
        color: "#fff",
        padding: "10px",
        borderRadius: "4px",
        fontSize: "0.8rem",
        pointerEvents: "none",
        zIndex: 1000,
        width: "200px",
        textAlign: "left",
        border: "1px solid #ccc",
      }}
    >
      <p
        style={{
          margin: 0,
          fontWeight: "bold",
          borderBottom: "1px solid #666",
          paddingBottom: "5px",
        }}
      >
        {`${tooltip.categoryName} views (${tooltip.categoryType})`}
      </p>
      <p style={{ margin: "5px 0" }}>{tooltip.text}</p>
    </div>
  );
};

export default AnalyticsToolTip;
