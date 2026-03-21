import React from "react";
import styled from "styled-components";
import {
  MDBCheckbox,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { Drawer, IconButton, Box, List, ListItem } from "@mui/material";

const Head = ({ title, options = [], selected, onChange }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleSelect = (option) => {
  if (selected === option) {
    onChange(null); // إلغاء التحديد لو ضغطت على نفس العنصر
  } else {
    onChange(option); // تحديد عنصر جديد
  }
  setDrawerOpen(false); // ✅ غلق الـ Drawer بعد الاختيار
};


  return (
    <StyledDropdown>
      {/* موبايل */}
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
          {selected ? `${title} (${selected})` : title}
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              {options.map((option, index) => (
                <ListItem button key={index} onClick={() => handleSelect(option)}>
                  <MDBCheckbox
                    name={`check${index}`}
                    id={`check${index}`}
                    label={option}
                    checked={selected === option}
                    onClick={(e) => e.stopPropagation()}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>

      {/* ديسكتوب */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <MDBDropdown>
          <MDBDropdownToggle tag="a" className="btn btn-primary">
            {selected ? `${title}: ${selected}` : title}
          </MDBDropdownToggle>

          <MDBDropdownMenu>
            {options.length === 0 ? (
              <MDBDropdownItem link>No results found.</MDBDropdownItem>
            ) : (
              options.map((option, index) => (
                <MDBDropdownItem key={index} onClick={() => handleSelect(option)}>
                  <MDBCheckbox
                    name={`check${index}`}
                    id={`check${index}`}
                    label={option}
                    checked={selected === option}
                    onClick={(e) => e.stopPropagation()}
                  />
                </MDBDropdownItem>
              ))
            )}
          </MDBDropdownMenu>
        </MDBDropdown>
      </Box>
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

export default Head;
