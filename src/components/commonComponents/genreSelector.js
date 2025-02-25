import React, { useEffect, useState } from "react";
import { Box, Checkbox, Chip, MenuItem, FormControl, Select } from "@mui/material";
import axios from "axios";

const GenreSelector = (props) => {
  const [genres, setGenres] = useState([]); // All fetched genres
  const [selectedGenres, setSelectedGenres] = useState([]); // Selected genre IDs
  const connectionString = process.env.REACT_APP_API_URL;

  // Fetch genres from the server
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${connectionString}/admin/allGenres`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setGenres(response.data.allGenres);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, [connectionString]);

  // Initialize selectedGenres with props.editGenres when provided
  useEffect(() => {
    if (props.editGenres) {
      const selectedIds = props.editGenres.map((genre) => genre._id);
      setSelectedGenres(selectedIds);
    }
  }, [props.editGenres]);

  // Handle selection and deselection
  const handleMultiple = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedGenres(value); // Update the state with selected IDs
  };

  // Notify parent of selected genres whenever the selection changes
  useEffect(() => {
    const selectedItems = genres.filter((genre) => selectedGenres.includes(genre._id));
    props.selectedGenre(selectedItems); // Send selected genre objects to the parent
  }, [selectedGenres, genres, props]);

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="standard" size="large" sx={{ m: 1, width: "100%" }}>
        <Select
          multiple
          value={selectedGenres}
          onChange={handleMultiple}
          sx={{
            borderBottom: "2px solid white",
            "&:before": { borderBottom: "none" },
            "&:after": { borderBottom: "none" },
            "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
            "&.Mui-focused:after": { borderBottom: "none" },
          }}
          renderValue={(selectedIds) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedIds.map((id) => {
                const selectedGenre = genres.find((genre) => genre._id === id);
                return selectedGenre ? (
                  <Chip key={id} color="info" label={selectedGenre.name} />
                ) : null;
              })}
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
