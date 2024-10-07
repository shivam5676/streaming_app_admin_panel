import * as React from "react";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MovieSelector(props) {
  const [allMovies, setAllMovies] = useState([]); // To hold all fetched movies
  const [selectedMovies, setSelectedMovies] = useState([]); // To hold selected movie IDs
  const connectionString = process.env.REACT_APP_API_URL;

  // Fetch movies from the server
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(`${connectionString}/admin/allMovies`);
        setAllMovies(response.data.allMovies);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovies();
  }, []);

  // Initialize state with props.selectedMovies if available
  useEffect(() => {
    if (props.selectedMovies) {
      setSelectedMovies(props.selectedMovies.map(movie => movie._id)); // Only store IDs
    }
  }, [props.selectedMovies]);

  // Handle changes to the selection
  const selectedMoviesHandler = (event, value) => {
    const selectedIds = value.map(movie => movie._id); // Get movie IDs from selected options
    setSelectedMovies(selectedIds);
    props.getSelectedMovies(value); // Pass the full movie objects to the parent
  };

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={allMovies}
      disableCloseOnSelect
      onChange={selectedMoviesHandler}
      getOptionLabel={(option) => option.name}
      value={allMovies.filter(movie => selectedMovies.includes(movie._id))} // Set value based on IDs
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        );
      }}
      style={{ width: "100%", backgroundColor: "#2E3648" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Your Movie here"
          placeholder=""
          InputLabelProps={{
            style: { color: "white" }, // Change label color to white
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Border color
              },
              "&:hover fieldset": {
                borderColor: "white", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
              color: "white", // Text color inside the input
            },
            "& .MuiInputBase-input": {
              color: "white", // Change text color in the input
            },
          }}
        />
      )}
      ChipProps={{
        sx: {
          backgroundColor: "white", // Set the background color of the selected chips
          color: "#2E3648", // Set the text color inside the chips
          borderRadius: "4px",
        },
      }}
    />
  );
}
