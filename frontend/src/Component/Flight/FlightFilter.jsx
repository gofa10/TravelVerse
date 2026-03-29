import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

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

const DropdownPortal = ({ items, onSelect, inputRef }) => {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
      width: Math.max(rect.width, 240),
    });
  }, [inputRef]);

  if (items.length === 0) return null;

  return createPortal(
    <ul
      className="absolute bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl py-2 z-[999999] max-h-60 overflow-y-auto"
      style={{
        top: pos.top,
        left: pos.left,
        width: pos.width,
        minWidth: '240px'
      }}
    >
      {items.map(a => (
        <li
          key={a.code}
          onMouseDown={() => onSelect(a.code)}
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
        >
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{a.name}</span>
          <span className="font-mono text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded-md group-hover:bg-red-500 group-hover:text-white transition-all">
            {a.code}
          </span>
        </li>
      ))}
    </ul>,
    document.body
  );
};

const AirportInput = ({ label, icon: Icon, value, onChange, id }) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const filtered = COMMON_AIRPORTS.filter(
    a =>
      a.name.toLowerCase().includes(value.toLowerCase()) ||
      a.code.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-[11px] uppercase font-bold text-gray-400 dark:text-slate-500 mb-1.5 tracking-wider px-1">
        {label}
      </label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors pointer-events-none" size={16} />
        <input
          ref={inputRef}
          id={id}
          name={id}
          value={value}
          onChange={e => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder={label === "From" ? "Origin" : "Destination"}
          className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white font-bold transition-all focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none placeholder:font-normal placeholder:text-gray-400"
        />
      </div>
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
  const { t } = useTranslation();
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
    if (!filters.from || filters.from.length < 3) errs.from = "Required";
    if (!filters.to || filters.to.length < 3) errs.to = "Required";
    if (!filters.date) errs.date = "Pick a date";
    if (filters.from.toUpperCase() === filters.to.toUpperCase()) errs.to = "Mismatch!";
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

  return (
    <div className={`mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12 transform ${heroMode ? 'translate-y-8' : ''}`}>
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] p-8 lg:p-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center gap-4 mb-8 px-2">
          <div className="bg-red-50 dark:bg-red-500/10 p-3 rounded-2xl">
            <FaPlaneDeparture className="text-red-600 dark:text-red-500" size={24} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
            Search Flights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6 items-end">
          {/* FROM */}
          <div className="w-full">
            <AirportInput
              id="flight-from"
              label="From"
              icon={FaPlaneDeparture}
              value={filters.from}
              onChange={v => handleChange("from", v)}
            />
            {errors.from && <span className="text-[10px] text-red-500 font-bold mt-1 px-1">{errors.from}</span>}
          </div>

          {/* TO */}
          <div className="w-full">
            <AirportInput
              id="flight-to"
              label="To"
              icon={FaPlaneArrival}
              value={filters.to}
              onChange={v => handleChange("to", v)}
            />
            {errors.to && <span className="text-[10px] text-red-500 font-bold mt-1 px-1">{errors.to}</span>}
          </div>

          {/* DEPART */}
          <div className="w-full min-w-[150px]">
            <label htmlFor="flight-depart-date" className="block text-[11px] uppercase font-bold text-gray-400 dark:text-slate-500 mb-2 px-1 tracking-widest">
              Depart
            </label>
            <div className="relative group">
              <FaCalendarAlt size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 pointer-events-none transition-colors" />
              <input
                id="flight-depart-date"
                name="date"
                type="date"
                value={filters.date}
                min={todayStr}
                onChange={e => handleChange("date", e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white font-bold transition-all focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none"
              />
            </div>
            {errors.date && <span className="text-[10px] text-red-500 font-bold mt-1 px-1">{errors.date}</span>}
          </div>

          {/* RETURN */}
          <div className="w-full min-w-[150px]">
            <label htmlFor="flight-return-date" className="block text-[11px] uppercase font-bold text-gray-400 dark:text-slate-500 mb-2 px-1 tracking-widest">
              Return <span className="opacity-40">(opt.)</span>
            </label>
            <div className="relative group">
              <FaCalendarAlt size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 pointer-events-none transition-colors" />
              <input
                id="flight-return-date"
                name="return_date"
                type="date"
                value={filters.return_date}
                min={filters.date || todayStr}
                onChange={e => handleChange("return_date", e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white font-bold transition-all focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none"
              />
            </div>
          </div>

          {/* TRAVELERS */}
          <div className="w-full">
            <label htmlFor="flight-adults" className="block text-[11px] uppercase font-bold text-gray-400 dark:text-slate-500 mb-2 px-1 tracking-widest">
              Travelers
            </label>
            <div className="relative group">
              <FaUserFriends size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 pointer-events-none transition-colors" />
              <select
                id="flight-adults"
                name="adults"
                value={filters.adults}
                onChange={e => handleChange("adults", +e.target.value)}
                className="w-full h-14 pl-12 pr-8 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white font-bold transition-all focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 8].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <div className="w-full">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full h-14 bg-[#c4714a] hover:bg-[#b06542] disabled:bg-slate-400 text-white font-black !rounded-[1.5rem] transition-all shadow-[0_10px_25px_-5px_rgba(196,113,74,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(196,113,74,0.5)] flex items-center justify-center gap-3 group uppercase tracking-widest text-sm"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FaSearch className="transition-transform group-hover:rotate-12" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightFilter;


