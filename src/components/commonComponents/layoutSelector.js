import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Checkbox, Chip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const LayoutSelector = (props) => {
  console.log(props,"ppp")
  const [layouts, setLayouts] = useState([]);
  const [selectedLayouts, setSelectedLayouts] = useState([]);
  const connectionString =  process.env.REACT_APP_API_URL

  // Fetch layouts from the server
  useEffect(() => {
    async function fetchLayouts() {
      try {
        const response = await axios.get(`${connectionString}/admin/allLayouts`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setLayouts(response.data.Layout);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLayouts();
  }, []);

  // Initialize state with props.editLayouts if available
  useEffect(() => {
    if (props.editLayouts) {
      setSelectedLayouts(props.editLayouts.map(layout => layout._id)); // Only store IDs
    }
  }, [props.editLayouts]);

  // Handle changes to the selection
  const handleMultiple = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedLayouts(value); // Value should be an array of IDs
  };

  // Notify parent component of selection changes
  useEffect(() => {
    const selectedItems = layouts.filter(layout => selectedLayouts.includes(layout._id));
    console.log(selectedItems)
    props.selectedArray(selectedItems);
  }, [selectedLayouts, layouts]);

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="standard" size="large" sx={{ m: 1, width: "100%" }}>
        <Select
          multiple
          value={selectedLayouts}
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
              {layouts.filter(layout => selectedIds.includes(layout._id)).map((selected) => (
                <Chip key={selected._id} color="info" label={selected.name} />
              ))}
            </Box>
          )}
        >
          {layouts.map((layout) => (
            <MenuItem key={layout._id} value={layout._id}>
              <Checkbox checked={selectedLayouts.includes(layout._id)} />
              {layout.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LayoutSelector;
