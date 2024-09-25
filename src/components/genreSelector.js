import React, { useEffect } from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Checkbox, Chip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

// const language = ["Comedy", "Action", "Thriller", "Romance", "Adventure"];
const GenreSelector = (props) => {
  const [state, setState] = useState([]);
  // console.log(state)
  const connectionString = process.env.REACT_APP_API_URL;
  const [genre, setGenres] = useState([]);
  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get(`${connectionString}/admin/allGenres`);
        console.log(res.data);
        setGenres(res.data.allGenres);
        // setAllMovies(res.data.Layout);
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    if (props.editGenres) {
      const allGenre = props.editGenres.split(",");
      setState(allGenre);
    }
  }, [props.editGenres]);
  const handleMultiple = (e) => {
    const {
      target: { value },
    } = e;
    setState(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    if (state.length > 0) {
      props.selectedGenre(state);
    }
  }, [state]);
  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="standard" size="large" sx={{ m: 1, width: "100%" }}>
        <Select
          multiple
          value={state}
          onChange={handleMultiple}
          sx={{
            borderBottom: "2px solid white", // Custom white bottom border
            "&:before": {
              borderBottom: "none", // Remove default underline
            },
            "&:after": {
              borderBottom: "none", // Remove the blue focus underline
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "none", // Ensure no underline on hover
            },
            "&.Mui-focused:after": {
              borderBottom: "none", // Remove focus underline (blue)
            },
          }}
          renderValue={(selLang) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selLang.map((lang) => (
                <Chip key={lang._id} color="info" label={lang.name} />
              ))}
            </Box>
          )}
        >
          {genre.map((lang) => (
            <MenuItem key={lang._id} value={lang}>
              <Checkbox checked={state.some((s) => s._id === lang._id)} />
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GenreSelector;
