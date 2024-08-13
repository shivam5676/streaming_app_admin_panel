import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Chip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const language = ["Java", "Python", "C++", "JavaScript", "SQL"];
const LayoutSelector = () => {
  const [state, setState] = useState([]);

  const handleMultiple = (e) => {
    const {
      target: { value },
    } = e;
    setState(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Box sx={{ }}>
      <FormControl variant="standard" size="large" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select" label="Lang">
          Select
        </InputLabel>
        <Select
          multiple
          value={state}
          onChange={handleMultiple}
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
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LayoutSelector;
