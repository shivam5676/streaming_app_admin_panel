import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Checkbox, Chip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const GenreSelector = (props) => {
  const [genres, setGenres] = useState([]); // To hold all fetched genres
  const [selectedGenres, setSelectedGenres] = useState([]); // To hold selected genres
  const connectionString = process.env.REACT_APP_API_URL;

  // Fetch genres from the server
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(`${connectionString}/admin/allGenres`);
        setGenres(response.data.allGenres);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGenres();
  }, []);

  // Initialize state with props.editGenres if available
  useEffect(() => {
    if (props.editGenres) {
      setSelectedGenres(props.editGenres.map(genre => genre._id)); // Only store IDs
    }
  }, [props.editGenres]);

  // Handle changes to the selection
  const handleMultiple = (event) => {
    const { target: { value } } = event;
    setSelectedGenres(value); // Value should be an array of IDs
  };

  // Notify parent component of selection changes
  useEffect(() => {
    const selectedItems = genres.filter(genre => selectedGenres.includes(genre._id));
    props.selectedGenre(selectedItems); // Send selected genres to the parent
  }, [selectedGenres, genres]);

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="standard" size="large" sx={{ m: 1, width: "100%" }}>
        <Select
          multiple
          value={selectedGenres}
          onChange={handleMultiple}
          sx={{
            borderBottom: "2px solid white", // Custom white bottom border
            "&:before": { borderBottom: "none" }, // Remove default underline
            "&:after": { borderBottom: "none" }, // Remove the blue focus underline
            "&:hover:not(.Mui-disabled):before": { borderBottom: "none" }, // Ensure no underline on hover
            "&.Mui-focused:after": { borderBottom: "none" }, // Remove focus underline (blue)
          }}
          renderValue={(selectedIds) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {genres.filter(genre => selectedIds.includes(genre._id)).map((selected) => (
                <Chip key={selected._id} color="info" label={selected.name} />
              ))}
            </Box>
          )}
        >
          {genres.map((genre) => (
            <MenuItem key={genre._id} value={genre._id}>
              <Checkbox checked={selectedGenres.includes(genre._id)} />
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GenreSelector;
