import React, { useEffect, useState } from "react";
import { Box, Checkbox, Chip, MenuItem, FormControl, Select } from "@mui/material";
import axios from "axios";

const LanguageSelector = (props) => {
  const connectionString = process.env.REACT_APP_API_URL;
  const [language, setLanguage] = useState([]); // Available languages from the API
  const [state, setState] = useState([]); // Selected language IDs

  // Fetch languages from the API
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get(`${connectionString}/admin/allLanguages`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setLanguage(res.data.Languages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLanguages();
  }, [connectionString]);

  // Initialize `state` with IDs from `props.editLanguages` when component mounts or updates
  useEffect(() => {
    if (props.editLanguages) {
      const selectedIds = props.editLanguages.map((lang) => lang._id);
      setState(selectedIds);
    }
  }, [props.editLanguages]);

  // Handle selection and deselection of items
  const handleMultiple = (e) => {
    const { value } = e.target; // The selected language IDs
    setState(value); // Update the selected IDs
  };

  // Send selected languages back to the parent component
  useEffect(() => {
    const selectedLanguages = language.filter((lang) => state.includes(lang._id));
    props.selectedLanguage(selectedLanguages);
  }, [state, language, props]);

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="standard" size="large" sx={{ m: 1, width: "100%" }}>
        <Select
          multiple
          value={state} // Pass selected IDs to `value`
          onChange={handleMultiple}
          sx={{
            borderBottom: "2px solid white",
            "&:before, &:after, &:hover:not(.Mui-disabled):before, &.Mui-focused:after": {
              borderBottom: "none", // Remove underline styles
            },
          }}
          renderValue={(selectedIds) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedIds.map((id) => {
                const selectedLang = language.find((lang) => lang._id === id);
                return selectedLang ? (
                  <Chip key={id} color="info" label={selectedLang.name} />
                ) : null;
              })}
            </Box>
          )}
        >
          {language.map((lang) => (
            <MenuItem key={lang._id} value={lang._id}>
              <Checkbox checked={state.includes(lang._id)} />
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
