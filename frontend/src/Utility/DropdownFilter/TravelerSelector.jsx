import React, { useState } from "react";
import { Menu, MenuItem, Select, FormControl, IconButton, Typography, Box } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
const TravelerSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [travelClass, setTravelClass] = useState("Economy");
  const [travelers, setTravelers] = useState({
    adults: 1,
    seniors: 0,
    children: 0,
  });

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleIncrement = (type) => {
    setTravelers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type) => {
    setTravelers((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
  };

  const TravelerSelector = ({ value = { adults: 1, seniors: 0, children: 0 }, travelClass = "Economy", onChange }) => {
  const [travelers, setTravelers] = useState(value);
  const [tClass, setTClass] = useState(travelClass);

  const updateParent = (updatedTravelers = travelers, updatedClass = tClass) => {
    if (onChange) onChange(updatedTravelers, updatedClass);
  };

  const handleIncrement = (type) => {
    const updated = { ...travelers, [type]: travelers[type] + 1 };
    setTravelers(updated);
    updateParent(updated);
  };

  const handleDecrement = (type) => {
    const updated = { ...travelers, [type]: Math.max(0, travelers[type] - 1) };
    setTravelers(updated);
    updateParent(updated);
  };

  const handleClassChange = (e) => {
    setTClass(e.target.value);
    updateParent(travelers, e.target.value);
  };

  return (
    <div>
      <button onClick={openMenu} style={{ padding: "10px 20px", borderRadius: "5px", border: "1px solid #ccc" }}>
        {travelers.adults + travelers.seniors + travelers.children} Travelers, {tClass}
      </button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <Box sx={{ p: 2, width: "250px" }}>
          <FormControl fullWidth>
            <Select value={tClass} onChange={handleClassChange}>
              <MenuItem value="Economy">Economy</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="First Class">First Class</MenuItem>
            </Select>
          </FormControl>
          {[
            { label: "Adults (18-64)", type: "adults" },
            { label: "Seniors (65+)", type: "seniors" },
            { label: "Children (0-17)", type: "children" },
          ].map(({ label, type }) => (
            <Box key={type} display="flex" justifyContent="space-between" alignItems="center" my={1}>
              <Typography>{travelers[type]} {label}</Typography>
              <Box>
                <IconButton onClick={() => handleDecrement(type)} disabled={travelers[type] === 0}>
                  <RemoveCircleOutline />
                </IconButton>
                <IconButton onClick={() => handleIncrement(type)}>
                  <AddCircleOutline />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Typography sx={{ textAlign: "right", color: "blue", cursor: "pointer" }} onClick={closeMenu}>
            Close
          </Typography>
        </Box>
      </Menu>
    </div>
  );
};
}
export default TravelerSelector;
