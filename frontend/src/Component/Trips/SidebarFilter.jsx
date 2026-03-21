import React, { useState } from "react";
import {
     Accordion,
     AccordionSummary,
     AccordionDetails,
     Slider,
     Box,
     Drawer,
     IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import { RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import style from "../../Style/Trips/SidebarFilter.module.css";
import { useEffect } from "react";

const SidebarFilter = ({
     filters,
     filterOptions,
     onBudgetChange,
     onDurationChange,
     onContinentsChange,
     onStylesChange,
     onClearAll
}) => {
     const { t } = useTranslation();
     const [mobileOpen, setMobileOpen] = useState(false);

     // Local state for smooth dragging
     const [localBudget, setLocalBudget] = useState(filters.budget || [filterOptions.minBudget, filterOptions.maxBudget]);
     const [localDuration, setLocalDuration] = useState(filters.duration || [filterOptions.minDuration, filterOptions.maxDuration]);

     // Sync local state when external filters reset
     useEffect(() => {
          if (filters.budget) {
               setLocalBudget(filters.budget);
          }
     }, [filters.budget]);

     useEffect(() => {
          if (filters.duration) {
               setLocalDuration(filters.duration);
          }
     }, [filters.duration]);

     // Range Slider handlers (local only for smooth drag)
     const handleBudgetChange = (event, newValue) => {
          setLocalBudget(newValue);
     };

     const handleDurationChange = (event, newValue) => {
          setLocalDuration(newValue);
     };

     // Triggers actual filtering when drag ends
     const handleBudgetChangeCommitted = (event, newValue) => {
          setLocalBudget(newValue);
          if (onBudgetChange) onBudgetChange(newValue);
     };

     const handleDurationChangeCommitted = (event, newValue) => {
          setLocalDuration(newValue);
          if (onDurationChange) onDurationChange(newValue);
     };

     // Chip togglers
     const toggleSelection = (category, option) => {
          const currentSelection = filters[category] || [];
          let newSelection;
          if (currentSelection.includes(option)) {
               newSelection = currentSelection.filter((item) => item !== option);
          } else {
               newSelection = [...currentSelection, option];
          }

          if (category === "continents" && onContinentsChange) {
               onContinentsChange(newSelection);
          } else if (category === "styles" && onStylesChange) {
               onStylesChange(newSelection);
          }
     };

     // Helper component for animated chip
     const AnimatedChip = ({ label, active, onClick }) => {
          return (
               <motion.div
                    className={`${style.chip} ${active ? style.active : ""}`}
                    onClick={onClick}
                    whileHover={{ scale: 1.05, backgroundColor: "#e2e8f0" }}
                    whileTap={{ scale: 0.95 }}
               >
                    <AnimatePresence>
                         {active && (
                              <motion.div
                                   layoutId={`chip-bg-${label}`}
                                   className={style.chipBg}
                                   initial={{ opacity: 0, scale: 0.8 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              />
                         )}
                    </AnimatePresence>
                    <span className={style.chipContent}>{label}</span>
               </motion.div>
          );
     };

     const SidebarContent = () => (
          <div className={style.sidebar}>
               <div className={style.filterHeader}>
                    <h4>
                         <FilterListIcon sx={{ fontSize: 20 }} /> {t("travelIdeasFilter")}
                    </h4>
                    <motion.button
                         whileHover={{ rotate: 180 }}
                         transition={{ duration: 0.3 }}
                         className={style.clearButton}
                         onClick={() => {
                              setLocalBudget([0, 5000]);
                              setLocalDuration([1, 30]);
                              if (onClearAll) onClearAll();
                         }}
                         title={t("clearAll")}
                    >
                         <RefreshCw size={16} />
                    </motion.button>
               </div>

               {/* Budget Accordion */}
               <Accordion
                    defaultExpanded
                    disableGutters
                    elevation={0}
                    sx={{
                         background: "transparent",
                         "&:before": { display: "none" },
                    }}
               >
                    <AccordionSummary
                         expandIcon={<ExpandMoreIcon sx={{ color: "#00b4d8" }} />}
                         className={style.accordionSummary}
                    >
                         {t("budget")}
                    </AccordionSummary>
                    <AccordionDetails>
                         <Box sx={{ px: 1, pt: 2, pb: 1, touchAction: "none" }}>
                              <Slider
                                   value={localBudget}
                                   onChange={handleBudgetChange}
                                   onChangeCommitted={handleBudgetChangeCommitted}
                                   valueLabelDisplay="auto"
                                   valueLabelFormat={(v) => `$${v}`}
                                   min={filterOptions.minBudget || 0}
                                   max={filterOptions.maxBudget || 5000}
                                   disableSwap
                                   sx={{
                                        color: "#00b4d8",
                                        height: 6,
                                        padding: "13px 0",
                                        "& .MuiSlider-rail": {
                                             backgroundColor: "#e2eaf0",
                                             opacity: 1,
                                        },
                                        "& .MuiSlider-track": {
                                             background: "linear-gradient(to right, #0077b6, #00b4d8)",
                                             border: "none",
                                             transition: "left 0.05s, width 0.05s",
                                        },
                                        "& .MuiSlider-thumb": {
                                             height: 22,
                                             width: 22,
                                             backgroundColor: "#fff",
                                             border: "2.5px solid #00b4d8",
                                             boxShadow: "0 2px 8px rgba(0,180,216,0.25)",
                                             cursor: "grab",
                                             transition: "box-shadow 0.2s ease, transform 0.15s ease",
                                             willChange: "transform",
                                             "&:active": {
                                                  cursor: "grabbing",
                                                  transform: "scale(1.2)",
                                             },
                                             "&:hover": {
                                                  boxShadow: "0 0 0 8px rgba(0, 180, 216, 0.15)",
                                             },
                                             "&.Mui-active": {
                                                  boxShadow: "0 0 0 12px rgba(0, 180, 216, 0.15)",
                                             },
                                        },
                                        "& .MuiSlider-valueLabel": {
                                             background: "linear-gradient(135deg, #0077b6, #00b4d8)",
                                             borderRadius: "8px",
                                             fontSize: "0.75rem",
                                             fontWeight: 600,
                                             padding: "3px 8px",
                                        },
                                   }}
                              />
                              <div className={style.sliderValues}>
                                   <span className={style.sliderBadge}>${localBudget[0].toLocaleString()}</span>
                                   <span className={style.sliderBadge}>${localBudget[1].toLocaleString()}</span>
                              </div>
                         </Box>
                    </AccordionDetails>
               </Accordion>

               {/* Duration Accordion */}
               <Accordion
                    defaultExpanded
                    disableGutters
                    elevation={0}
                    sx={{
                         background: "transparent",
                         "&:before": { display: "none" },
                    }}
               >
                    <AccordionSummary
                         expandIcon={<ExpandMoreIcon sx={{ color: "#00b4d8" }} />}
                         className={style.accordionSummary}
                    >
                         {t("duration")} ({t("days") || "Days"})
                    </AccordionSummary>
                    <AccordionDetails>
                         <Box sx={{ px: 1, pt: 2, pb: 1, touchAction: "none" }}>
                              <Slider
                                   value={localDuration}
                                   onChange={handleDurationChange}
                                   onChangeCommitted={handleDurationChangeCommitted}
                                   valueLabelDisplay="auto"
                                   valueLabelFormat={(v) => `${v}d`}
                                   min={filterOptions.minDuration || 1}
                                   max={filterOptions.maxDuration || 30}
                                   disableSwap
                                   sx={{
                                        color: "#00b4d8",
                                        height: 6,
                                        padding: "13px 0",
                                        "& .MuiSlider-rail": {
                                             backgroundColor: "#e2eaf0",
                                             opacity: 1,
                                        },
                                        "& .MuiSlider-track": {
                                             background: "linear-gradient(to right, #0077b6, #48cae4)",
                                             border: "none",
                                             transition: "left 0.05s, width 0.05s",
                                        },
                                        "& .MuiSlider-thumb": {
                                             height: 22,
                                             width: 22,
                                             backgroundColor: "#fff",
                                             border: "2.5px solid #00b4d8",
                                             boxShadow: "0 2px 8px rgba(0,180,216,0.25)",
                                             cursor: "grab",
                                             transition: "box-shadow 0.2s ease, transform 0.15s ease",
                                             willChange: "transform",
                                             "&:active": {
                                                  cursor: "grabbing",
                                                  transform: "scale(1.2)",
                                             },
                                             "&:hover": {
                                                  boxShadow: "0 0 0 8px rgba(0, 180, 216, 0.15)",
                                             },
                                             "&.Mui-active": {
                                                  boxShadow: "0 0 0 12px rgba(0, 180, 216, 0.15)",
                                             },
                                        },
                                        "& .MuiSlider-valueLabel": {
                                             background: "linear-gradient(135deg, #0077b6, #00b4d8)",
                                             borderRadius: "8px",
                                             fontSize: "0.75rem",
                                             fontWeight: 600,
                                             padding: "3px 8px",
                                        },
                                   }}
                              />
                              <div className={style.sliderValues}>
                                   <span className={style.sliderBadge}>{localDuration[0]} days</span>
                                   <span className={style.sliderBadge}>{localDuration[1]} days</span>
                              </div>
                         </Box>
                    </AccordionDetails>
               </Accordion>

               {/* Continent Accordion */}
               {filterOptions.continents && filterOptions.continents.length > 0 && (
                    <Accordion
                         defaultExpanded
                         disableGutters
                         elevation={0}
                         sx={{
                              background: "transparent",
                              "&:before": { display: "none" },
                         }}
                    >
                         <AccordionSummary
                              expandIcon={<ExpandMoreIcon sx={{ color: "#00b4d8" }} />}
                              className={style.accordionSummary}
                         >
                              {t("continent")}
                         </AccordionSummary>
                         <AccordionDetails>
                              <div className={style.chipContainer}>
                                   {filterOptions.continents.map((cont) => (
                                        <AnimatedChip
                                             key={cont}
                                             label={cont}
                                             active={filters.continents?.includes(cont)}
                                             onClick={() => toggleSelection("continents", cont)}
                                        />
                                   ))}
                                   {filterOptions.continents.length === 0 && (
                                        <span style={{ color: "#888", fontSize: "0.85rem" }}>
                                             No continents available.
                                        </span>
                                   )}
                              </div>
                         </AccordionDetails>
                    </Accordion>
               )}

               {/* Travel Style Accordion */}
               {filterOptions.styles && filterOptions.styles.length > 0 && filterOptions.styles.some(s => s && s.trim() !== '') && (
                    <Accordion
                         defaultExpanded
                         disableGutters
                         elevation={0}
                         sx={{ background: "transparent", "&:before": { display: "none" } }}
                    >
                         <AccordionSummary
                              expandIcon={<ExpandMoreIcon sx={{ color: "#00b4d8" }} />}
                              className={style.accordionSummary}
                         >
                              {t("travelStyle") || "Travel Style"}
                         </AccordionSummary>
                         <AccordionDetails>
                              <div className={style.chipContainer}>
                                   {filterOptions.styles.map((sty) => (
                                        <AnimatedChip
                                             key={sty}
                                             label={sty}
                                             active={filters.styles?.includes(sty)}
                                             onClick={() => toggleSelection("styles", sty)}
                                        />
                                   ))}
                                   {filterOptions.styles.length === 0 && (
                                        <span style={{ color: "#888", fontSize: "0.85rem" }}>
                                             No styles available.
                                        </span>
                                   )}
                              </div>
                         </AccordionDetails>
                    </Accordion>
               )}
          </div>
     );

     return (
          <>
               {/* Desktop view */}
               <Box sx={{ display: { xs: "none", lg: "block" }, height: "100%" }}>
                    <motion.div
                         initial={{ x: -50, opacity: 0 }}
                         animate={{ x: 0, opacity: 1 }}
                         transition={{ duration: 0.6, ease: "easeOut" }}
                         style={{ height: "100%" }}
                    >
                         <SidebarContent />
                    </motion.div>
               </Box>

               {/* Mobile view toggle */}
               <Box sx={{ display: { xs: "block", lg: "none" } }}>
                    <motion.button
                         className={style.mobileToggleBtn}
                         onClick={() => setMobileOpen(true)}
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                    >
                         <FilterListIcon />
                    </motion.button>
                    <Drawer
                         anchor="left"
                         open={mobileOpen}
                         onClose={() => setMobileOpen(false)}
                         PaperProps={{
                              sx: {
                                   width: { xs: "100%", sm: 350 },
                                   background: "transparent",
                                   boxShadow: "none",
                              },
                         }}
                    >
                         <Box sx={{ p: 2, height: "100%" }}>
                              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                                   <IconButton onClick={() => setMobileOpen(false)}>
                                        <ExpandMoreIcon sx={{ transform: "rotate(90deg)" }} />
                                   </IconButton>
                              </Box>
                              <SidebarContent />
                         </Box>
                    </Drawer>
               </Box>
          </>
     );
};

export default SidebarFilter;
