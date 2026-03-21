import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { createPortal } from "react-dom";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUserFriends } from "react-icons/fa";

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

const AirportInput = ({ label, icon: Icon, value, onChange }) => {
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
        className="d-flex align-items-center gap-2 mb-1"
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
        style={{ borderRadius: "10px", fontSize: "15px", fontWeight: 600, letterSpacing: "0.5px" }}
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

const FlightFilter = ({ destinationCode, onSearch, isSearching }) => {
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

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%)",
        padding: "28px 20px",
        borderRadius: "0 0 24px 24px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
        marginBottom: "24px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <Container>
        <p style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, marginBottom: "16px", fontSize: "1rem" }}>
          ✈️ Search Flights
        </p>
        <Row className="g-3 align-items-end">

          {/* FROM */}
          <Col xs={12} sm={6} md={3}>
            <div style={fieldBox}>
              <AirportInput label="From" icon={FaPlaneDeparture} value={filters.from} onChange={v => handleChange("from", v)} />
              {errors.from && <small className="text-danger">{errors.from}</small>}
            </div>
          </Col>

          {/* TO */}
          <Col xs={12} sm={6} md={3}>
            <div style={fieldBox}>
              <AirportInput label="To" icon={FaPlaneArrival} value={filters.to} onChange={v => handleChange("to", v)} />
              {errors.to && <small className="text-danger">{errors.to}</small>}
            </div>
          </Col>

          {/* DEPART */}
          <Col xs={12} sm={6} md={2}>
            <div style={fieldBox}>
              <Form.Label style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "13px" }}
                className="d-flex align-items-center gap-2 mb-1">
                <FaCalendarAlt size={13} /> Depart
              </Form.Label>
              <Form.Control type="date" value={filters.date} min={todayStr}
                onChange={e => handleChange("date", e.target.value)}
                style={{ borderRadius: "10px", fontSize: "14px" }} />
              {errors.date && <small className="text-danger">{errors.date}</small>}
            </div>
          </Col>

          {/* RETURN */}
          <Col xs={12} sm={6} md={2}>
            <div style={fieldBox}>
              <Form.Label style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "13px" }}
                className="d-flex align-items-center gap-2 mb-1">
                <FaCalendarAlt size={13} /> Return <span style={{ fontSize: "11px", opacity: 0.6 }}>(opt.)</span>
              </Form.Label>
              <Form.Control type="date" value={filters.return_date}
                min={filters.date || todayStr}
                onChange={e => handleChange("return_date", e.target.value)}
                style={{ borderRadius: "10px", fontSize: "14px" }} />
            </div>
          </Col>

          {/* TRAVELERS */}
          <Col xs={6} sm={4} md={1}>
            <div style={fieldBox}>
              <Form.Label style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "13px" }}
                className="d-flex align-items-center gap-2 mb-1">
                <FaUserFriends size={13} /> Travelers
              </Form.Label>
              <Form.Select value={filters.adults}
                onChange={e => handleChange("adults", +e.target.value)}
                style={{ borderRadius: "10px", fontSize: "14px" }}>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>
                ))}
              </Form.Select>
            </div>
          </Col>

          {/* SEARCH BUTTON */}
          <Col xs={6} sm={4} md={1} className="d-flex align-items-end">
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              style={{
                background: "linear-gradient(135deg,#e94560,#c62a47)",
                border: "none",
                borderRadius: "12px",
                padding: "14px 10px",
                fontWeight: 700,
                fontSize: "14px",
                width: "100%",
                minHeight: "50px",
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
