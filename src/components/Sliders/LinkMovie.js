import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const LinkMovie = ({ allMovies, selectedMovies }) => {
  const handleMoviesSelection = (event, value) => {
    selectedMovies(value);
  };
  return (
    <div className="p-4 font-semibold w-[100%]">
      <p>
        Link Movie and thier shorts to this Slide{" "}
        <span className="text-red-500"> *</span>
      </p>
      <Autocomplete
        onChange={handleMoviesSelection}
        disablePortal
        options={allMovies}
        isOptionEqualToValue={(option, value) => option._id === value?._id}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Movies list"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              ...params.InputProps,
              sx: {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                color: "white",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
        )}
        sx={{ py: 2 }}
      />
    </div>
  );
};

export default LinkMovie;
