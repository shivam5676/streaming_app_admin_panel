import React, { useEffect } from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Checkbox, Chip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const language = [
  "Latest Movies",
  "Action Movies",
  "Blockbuster Movies",
  "latest Movies",
];
const LayoutSelector = (props) => {
  console.log(props.editLayouts);
  const [state, setState] = useState([]);
  useEffect(() => {
    if (props.editLayouts) {
      const layOutArray = props.editLayouts.split(",");
      console.log(layOutArray);
      setState(layOutArray);
    }
  }, [props.editLayouts]);
  const handleMultiple = (e) => {
    const {
      target: { value },
    } = e;
    setState(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    if (state.length > 0) {
      props.selectedArray(state);
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
              {selLang.map((value) => (
                <Chip key={value} color="info" label={value} />
              ))}
            </Box>
          )}
        >
          {language.map((lang) => (
            <MenuItem key={lang} value={lang}>
              <Checkbox checked={state.indexOf(lang) > -1} />
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LayoutSelector;
