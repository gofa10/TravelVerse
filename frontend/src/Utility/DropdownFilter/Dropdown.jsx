import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

export default function DropdownSelect({ title, onChange }) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChange) onChange(event.target.value); // إرسال القيمة للأب
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }}>
      <InputLabel id={`select-label-${title}`}><FmdGoodIcon /> {title}</InputLabel>
      <Select
        labelId={`select-label-${title}`}
        id={`select-${title}`}
        value={value}
        onChange={handleChange}
        autoWidth
        label={title}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        <MenuItem value="Cairo">Cairo</MenuItem>
        <MenuItem value="Dubai">Dubai</MenuItem>
        <MenuItem value="Paris">Paris</MenuItem>
      </Select>
    </FormControl>
  );
}
