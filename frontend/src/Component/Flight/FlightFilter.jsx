import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { createPortal } from "react-dom";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import styles from "../../Style/Flight/FlightFilter.module.css";

const COMMON_AIRPORTS = [
  { code: "CAI", name: "Cairo" }, { code: "CDG", name: "Paris" },
  { code: "DXB", name: "Dubai" }, { code: "JFK", name: "New York" },
  { code: "LHR", name: "London" }, { code: "IST", name: "Istanbul" },
  { code: "FRA", name: "Frankfurt" }, { code: "MAD", name: "Madrid" },
  { code: "FCO", name: "Rome" }, { code: "AMS", name: "Amsterdam" },
  { code: "NRT", name: "Tokyo" }, { code: "DEL", name: "Delhi" },
  { code: "PEK", name: "Beijing" }, { code: "GRU", name: "São Paulo" },
  { code: "JNB", name: "Johannesburg" }, { code: "NBO", name: "Nairobi" },
  { code: "CMN", name: "Casablanca" }, { code: "RUH", name: "Riyadh" },
  { code: "DOH", name: "Doha" }, { code: "BKK", name: "Bangkok" },
  { code: "ICN", name: "Seoul" }, { code: "SIN", name: "Singapore" },
  { code: "HKG", name: "Hong Kong" }, { code: "KUL", name: "Kuala Lumpur" },
  { code: "YYZ", name: "Toronto" }, { code: "MEX", name: "Mexico City" },
  { code: "SCL", name: "Santiago" }, { code: "LIM", name: "Lima" },
  { code: "ZRH", name: "Zurich" }, { code: "GVA", name: "Geneva" },
  { code: "OSL", name: "Oslo" }, { code: "ARN", name: "Stockholm" },
  { code: "LIS", name: "Lisbon" }, { code: "WAW", name: "Warsaw" },
  { code: "SVO", name: "Moscow" }, { code: "MNL", name: "Manila" },
  { code: "SYD", name: "Sydney" }, { code: "CPT", name: "Cape Town" },
  { code: "TUN", name: "Tunis" }, { code: "ACC", name: "Accra" },
];

// Dropdown rendered via portal — always on top of everything
const DropdownPortal = ({ items, onSelect, inputRef }) => {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, [inputRef]);

  if (items.length === 0) return null;

  return createPortal(
    <ul
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        zIndex: 999999,
        background: "#fff",
        border: "1px solid #dde",
        borderRadius: "10px",
        listStyle: "none",
        padding: "4px 0",
        margin: 0,
        maxHeight: 220,
        overflowY: "auto",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}
    >
      {items.map(a => (
        <li
          key={a.code}
          onMouseDown={() => onSelect(a.code)}
          style={{
            padding: "9px 16px",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#222",
            transition: "background 0.12s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f0f4ff")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <span>{a.name}</span>
          <span style={{ fontFamily: "monospace", color: "#5a7", fontWeight: 700, fontSize: "13px" }}>
            {a.code}
          </span>
        </li>
      ))}
    </ul>,
    document.body
  );
};

const AirportInput = ({ label, icon: Icon, value, onChange, heroMode = false }) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const filtered = COMMON_AIRPORTS.filter(
    a =>
      a.name.toLowerCase().includes(value.toLowerCase()) ||
      a.code.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 8);

  return (
    <div style={{ position: "relative" }}>
      <Form.Label
        className={`d-flex align-items-center gap-2 mb-1 ${heroMode ? styles.heroModeLabel : ''}`}
        style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "13px" }}
      >
        <Icon size={13} /> {label}
      </Form.Label>
      <Form.Control
        ref={inputRef}
        value={value}
        onChange={e => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        placeholder={"e.g. " + (label === "From" ? "CAI" : "CDG")}
        className={heroMode ? styles.heroModeInput : undefined}
        style={{ borderRadius: "10px", fontSize: "15px", fontWeight: 600, letterSpacing: "0.5px", width: "100%" }}
      />
      {open && value.length > 0 && (
        <DropdownPortal
          items={filtered}
          onSelect={code => { onChange(code); setOpen(false); }}
          inputRef={inputRef}
        />
      )}
    </div>
  );
};

const FlightFilter = ({ destinationCode, onSearch, isSearching, heroMode = false }) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState({
    from: "CAI",
    to: destinationCode || "",
    date: todayStr,
    return_date: "",
    adults: 1,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!filters.from || filters.from.length < 3) errs.from = "Enter airport code";
    if (!filters.to || filters.to.length < 3) errs.to = "Enter airport code";
    if (!filters.date) errs.date = "Pick a date";
    if (filters.from.toUpperCase() === filters.to.toUpperCase()) errs.to = "Same as origin!";
    return errs;
  };

  const handleSearch = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSearch({
      from: filters.from.toUpperCase(),
      to: filters.to.toUpperCase(),
      date: filters.date,
      return_date: filters.return_date || undefined,
      adults: filters.adults,
    });
  };

  const fieldBox = { background: "rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 14px" };
  const heroFieldBox = { background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "10px 12px" };
  const activeFieldBox = heroMode ? heroFieldBox : fieldBox;
  const labelStyle = heroMode
    ? { color: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: "0.8rem" }
    : { color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "13px" };
  const inputStyle = { background: "rgba(255,255,255,0.95)", borderRadius: "10px", color: "#1a1a1a", fontSize: heroMode ? "16px" : "14px" };

  return (
    <div
      className={heroMode ? styles.heroMode : undefined}
      style={{
        background: heroMode ? "rgba(255, 255, 255, 0.12)" : "linear-gradient(135deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%)",
        backdropFilter: heroMode ? "blur(12px)" : undefined,
        WebkitBackdropFilter: heroMode ? "blur(12px)" : undefined,
        border: heroMode ? "1px solid rgba(255, 255, 255, 0.25)" : undefined,
        borderRadius: heroMode ? "16px" : "0 0 24px 24px",
        padding: heroMode ? "24px 28px" : "28px 20px",
        width: heroMode ? "min(900px, 92%)" : undefined,
        margin: heroMode ? "0 auto" : undefined,
        marginTop: heroMode ? "24px" : undefined,
        marginBottom: heroMode ? "0" : "24px",
        boxShadow: heroMode ? undefined : "0 8px 32px rgba(0,0,0,0.22)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <Container>
        <p style={{ color: "rgba(255,255,255,0.92)", fontWeight: 700, marginBottom: heroMode ? "20px" : "16px", fontSize: heroMode ? "1.55rem" : "1rem" }}>
          ✈️ Search Flights
        </p>
        <Row className="g-3 align-items-end">

          {/* FROM */}
          <Col xs={12} sm={6} md={6} lg={3}>
            <div style={activeFieldBox}>
              <AirportInput
                label="From"
                icon={FaPlaneDeparture}
                value={filters.from}
                onChange={v => handleChange("from", v)}
                heroMode={heroMode}
              />
              {errors.from && <small className="text-danger">{errors.from}</small>}
            </div>
          </Col>

          {/* TO */}
          <Col xs={12} sm={6} md={6} lg={3}>
            <div style={activeFieldBox}>
              <AirportInput
                label="To"
                icon={FaPlaneArrival}
                value={filters.to}
                onChange={v => handleChange("to", v)}
                heroMode={heroMode}
              />
              {errors.to && <small className="text-danger">{errors.to}</small>}
            </div>
          </Col>

          {/* DEPART */}
          <Col xs={12} sm={6} md={4} lg={2}>
            <div style={activeFieldBox}>
              <Form.Label style={labelStyle}
                className="d-flex align-items-center gap-2 mb-1">
                <FaCalendarAlt size={13} /> Depart
              </Form.Label>
              <Form.Control type="date" value={filters.date} min={todayStr}
                onChange={e => handleChange("date", e.target.value)}
                className={heroMode ? styles.heroModeInput : undefined}
                style={{ ...inputStyle, width: "100%" }} />
              {errors.date && <small className="text-danger">{errors.date}</small>}
            </div>
          </Col>

          {/* RETURN */}
          <Col xs={12} sm={6} md={4} lg={2}>
            <div style={activeFieldBox}>
              <Form.Label style={labelStyle}
                className="d-flex align-items-center gap-2 mb-1">
                <FaCalendarAlt size={13} /> Return <span style={{ fontSize: "11px", opacity: 0.6 }}>(opt.)</span>
              </Form.Label>
              <Form.Control type="date" value={filters.return_date}
                min={filters.date || todayStr}
                onChange={e => handleChange("return_date", e.target.value)}
                className={heroMode ? styles.heroModeInput : undefined}
                style={{ ...inputStyle, width: "100%" }} />
            </div>
          </Col>

          {/* TRAVELERS */}
          <Col xs={12} sm={6} md={2} lg={1}>
            <div style={activeFieldBox}>
              <Form.Label style={labelStyle}
                className="d-flex align-items-center gap-2 mb-1">
                <FaUserFriends size={13} /> Travelers
              </Form.Label>
              <Form.Select value={filters.adults}
                onChange={e => handleChange("adults", +e.target.value)}
                className={heroMode ? styles.heroModeInput : undefined}
                style={{ ...inputStyle, width: "100%" }}>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>
                    {heroMode ? n : `${n} Adult${n > 1 ? "s" : ""}`}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Col>

          {/* SEARCH BUTTON */}
          <Col
            xs={12}
            sm={6}
            md={2}
            lg={1}
            className="d-flex align-items-end"
            style={heroMode ? { paddingLeft: "12px" } : undefined}
          >
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              style={{
                background: "linear-gradient(135deg,#e94560,#c62a47)",
                border: "none",
                borderRadius: "12px",
                padding: "14px 10px",
                fontWeight: 700,
                width: "100%",
                minHeight: heroMode ? "62px" : "50px",
                fontSize: heroMode ? "17px" : "14px",
                boxShadow: "0 4px 16px rgba(233,69,96,0.45)",
              }}
            >
              {isSearching ? <Spinner animation="border" size="sm" /> : "🔍 Search"}
            </Button>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default FlightFilter;
