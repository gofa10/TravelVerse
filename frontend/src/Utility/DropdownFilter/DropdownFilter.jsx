import React from "react";
import styled from "styled-components";
import {
  MDBCheckbox,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import ClearIcon from "@mui/icons-material/Clear";
import { Drawer, IconButton, Box, List, ListItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const DropdownFilter = ({ title, options = [], selected = [], onChange }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleSelection = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const removeOption = (option) => {
    onChange(selected.filter((item) => item !== option));
  };
   const { t } = useTranslation();

  return (
    <StyledDropdown>
      {/* الموبايل */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexWrap: "wrap",
          backgroundColor: "#007bff",
          borderRadius: "15px",
          padding: "10px",
        }}
      >
        <IconButton className="btn btn-primary" onClick={() => setDrawerOpen(true)}>
          {title}
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              {options.map((option, index) => (
                <ListItem button key={index} onClick={() => toggleSelection(option)}>
                  <MDBCheckbox
                    name={`check${index}`}
                    id={`check${index}`}
                    label={option}
                    checked={selected.includes(option)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>

      {/* الديسكتوب */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <MDBDropdown>
          <MDBDropdownToggle tag="a" className="btn btn-primary">
            {selected.length > 0 ? `${title} (${selected.length})` : title}
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {options.length === 0 ? (
              <MDBDropdownItem link>No results found.</MDBDropdownItem>
            ) : (
              options.map((option, index) => (
                <MDBDropdownItem key={index} onClick={() => toggleSelection(option)}>
                  <MDBCheckbox
                    name={`check${index}`}
                    id={`check${index}`}
                    label={option}
                    checked={selected.includes(option)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </MDBDropdownItem>
              ))
            )}
          </MDBDropdownMenu>
        </MDBDropdown>
      </Box>

      {/* العناصر المختارة */}
      <SelectedList>
        {selected.length > 0 && (
          <ul>
            {selected.map((option, index) => (
              <li key={index}>
                {option}
                <ClearIcon
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => removeOption(option)}
                />
              </li>
            ))}
          </ul>
        )}
      </SelectedList>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  .btn-primary {
    background-color: #007bff;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    text-align: center;
    min-width: 160px;
  }

  .dropdown-menu {
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 10px;
    min-width: 150px;
  }

  @media (max-width: 768px) {
    .btn-primary {
      width: 50%;
      font-size: 16px;
      color: white;
    }

    .dropdown-menu {
      width: 50%;
    }
  }
`;

const SelectedList = styled.div`
  margin-top: 15px;
  padding: 10px;
  border-radius: 8px;
  width: fit-content;

  ul {
    padding-left: 20px;
    list-style-type: none;
    margin-top: 10px;
  }

  li {
    background: #ffffff;
    padding: 8px 12px;
    margin: 5px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    border: 1px solid #ddd;
  }

  .remove-icon {
    color: red;
    cursor: pointer;
  }

  @media (max-width: 850px) {
    display: none;
  }
`;

export default DropdownFilter;
