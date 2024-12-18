import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

const TimeSelector = ({ timeSelector, fetchingType }) => {
  const handleSelectChange = (e) => {
    timeSelector(e.target.value);
  };
  return (
    <div className="border-2">
      {" "}
      <FormControl fullWidth>
        <Select
          value={fetchingType}
          onChange={handleSelectChange}
          inputProps={{
            name: "age",
            id: "controlled-native",
          }}
          sx={{
            // Styles for the select element
            fontSize: "0.875rem", // Small text size
            color: "white", // Text color
            backgroundColor: "transparent", // Background color for the select
            height: "32px", // Reduce height of the select
            "& .MuiSelect-select": {
              border: "none", // Remove border
              backgroundColor: "transparent", // Background color for selected option
              padding: "4px 10px", // Adjust padding to control height
              outline: "none", // Remove outline on focus

              "&:focus": {
                outline: "none", // Remove outline on focus
              },
            },
            // Styles for the dropdown options
            "& .MuiMenuItem-root": {
              backgroundColor: "gray", // Background color for dropdown options
              "&:hover": {
                backgroundColor: "darkgray", // Background color on hover
              },
            },
          }}
        >
          <MenuItem value={"Month"}>Current Month</MenuItem>
          <MenuItem value={"Year"}>Current Year</MenuItem>
          <MenuItem value={"All"}>All Time</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TimeSelector;
