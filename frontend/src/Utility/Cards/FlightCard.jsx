import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Radux/axios";
import useTransCurrency from "../../Hooks/useTransCurrency";
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn,
} from "mdb-react-ui-kit";
import LoginPromptModal from "../LoginPromptModal";
import WatchlistButton from "../Buttons/WatchlistButton";
import { useToggleWatchlist } from "../../Hooks/useWatchlist";
import useImageFallback from "../../Components/Common/useImageFallback.jsx";

// ─── Helpers ────────────────────────────────────────────────────────────────
const StopsTag = ({ stops }) => {
  const colors = { 0: "var(--color-success)", 1: "var(--color-warning)" };
  const labels = { 0: "Direct ✓", 1: "1 Stop" };
  const color = colors[stops] ?? "var(--color-error)";
  const label = labels[stops] ?? `${stops} Stops`;
  return <span style={{ color, fontWeight: 700, fontSize: "12px" }}>{label}</span>;
};

const fmtTime = (dt) => {
  if (!dt) return "—";
  try {
    const d = new Date(dt);
    if (isNaN(d)) {
      const p = String(dt).split(" ");
      return p.length > 1 ? p[1] : dt;
    }
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  } catch { return String(dt); }
};

const fmtDate = (dt) => {
  if (!dt) return "";
  try {
    const d = new Date(dt);
    if (isNaN(d)) return String(dt).split(" ")[0] ?? dt;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch { return ""; }
};

const fmtDuration = (raw, hrs) => {
  const mins = raw || Math.round((hrs || 0) * 60);
  if (!mins) return "—";
  const h = Math.floor(mins / 60), m = mins % 60;
  return `${h}h${m > 0 ? " " + m + "m" : ""}`;
};

const formatFlightPrice = (value) => {
  const amount = Number.parseFloat(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    return 'Price on request';
  }
  return `$${Math.round(amount)}/person`;
};

// ─── Flight Details Modal ────────────────────────────────────────────────────
const FlightDetailModal = ({ data, onClose }) => {
  if (!data) return null;
  const priceLabel = formatFlightPrice(data.price_per_person || data.price);
  const { src: safeAirlineLogoSrc, onError: handleAirlineLogoError } = useImageFallback(data.airline_logo);

  const getDepDate = () =>
    data.departure_time ? String(data.departure_time).split(" ")[0].split("T")[0] : "";

  const handleBookOnGoogle = () => {
    const depDate = getDepDate();
    const from = (data.from_code || "").toUpperCase();
    const to = (data.to_code || "").toUpperCase();
    if (!from || !to || !depDate) {
      window.open("https://www.google.com/travel/flights", "_blank");
      return;
    }
    const dateObj = new Date(depDate);
    const dateStr = !isNaN(dateObj)
      ? dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      : depDate;
    const q = `flights from ${from} to ${to} ${dateStr} ${data.travel_class || "Economy"} ${data.airline || ""} ${data.flight_number || ""}`.trim();
    window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}&hl=en`, "_blank");
  };

  const handleBookOnSkyscanner = () => {
    const depDate = getDepDate().replace(/-/g, "");
    const from = (data.from_code || "").toLowerCase();
    const to = (data.to_code || "").toLowerCase();
    const cls = (data.travel_class || "economy").toLowerCase().replace(" ", "_");
    const url = `https://www.skyscanner.com/transport/flights/${from}/${to}/${depDate}/?adults=1&cabinclass=${cls}&rtn=0`;
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "color-mix(in srgb, var(--surface-strong) 74%, transparent)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg-secondary)",
          borderRadius: "20px",
          maxWidth: "620px",
          width: "100%",
          boxShadow: "var(--shadow-xl)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, var(--color-primary-800), var(--color-primary-600))",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div className="d-flex align-items-center gap-3">
            <img
              src={safeAirlineLogoSrc}
              alt={data.airline ?? 'Airline logo'}
              onError={handleAirlineLogoError}
              loading="lazy"
              style={{ width: 44, height: 44, objectFit: "contain", borderRadius: "8px", background: "#fff", padding: "4px" }}
            />
            <div>
              <h5 style={{ color: "var(--text-inverse)", margin: 0, fontWeight: 700 }}>{data.airline}</h5>
              <small style={{ color: "color-mix(in srgb, var(--text-inverse) 70%, transparent)" }}>
                {data.flight_number} · {data.travel_class || "Economy"}
              </small>
            </div>
          </div>
          <button onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--text-inverse)", fontSize: "24px", cursor: "pointer", lineHeight: 1 }}>
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {/* Route */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="text-center">
              <div style={{ fontSize: "36px", fontWeight: 800, lineHeight: 1, color: "var(--text-primary)" }}>
                {fmtTime(data.departure_time)}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{fmtDate(data.departure_time)}</div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-primary-700)", marginTop: "6px" }}>{data.from_code}</div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", maxWidth: "120px", textAlign: "center" }}>{data.from_airport}</div>
            </div>

            <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
                {fmtDuration(data.duration_raw, data.duration)}
              </div>
              <div style={{ position: "relative", borderTop: "2px dashed color-mix(in srgb, var(--text-muted) 45%, transparent)" }}>
                <span style={{
                  position: "absolute", top: "-12px", left: "50%",
                  transform: "translateX(-50%)", fontSize: "20px",
                  background: "var(--bg-secondary)", lineHeight: "1",
                }}>✈️</span>
              </div>
              <div style={{ marginTop: "12px" }}>
                <StopsTag stops={data.stops ?? 0} />
              </div>
              {data.stop_names?.length > 0 && (
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                  via {data.stop_names.join(", ")}
                </div>
              )}
            </div>

            <div className="text-center">
              <div style={{ fontSize: "36px", fontWeight: 800, lineHeight: 1, color: "var(--text-primary)" }}>
                {fmtTime(data.arrival_time)}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{fmtDate(data.arrival_time)}</div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-primary-700)", marginTop: "6px" }}>{data.to_code}</div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", maxWidth: "120px", textAlign: "center" }}>{data.to_airport}</div>
            </div>
          </div>

          {/* Info Grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px", marginBottom: "24px",
          }}>
            {[
              { label: "Duration", value: fmtDuration(data.duration_raw, data.duration) },
              { label: "Stops", value: data.stops === 0 ? "Non-stop" : `${data.stops} stop${data.stops > 1 ? "s" : ""}` },
              { label: "Class", value: data.travel_class || "Economy" },
            ].map(item => (
              <div key={item.label} style={{
                background: "var(--bg-tertiary)", borderRadius: "12px",
                padding: "14px", textAlign: "center",
              }}>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>{item.label}</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>{item.value}</div>
              </div>
            ))}
          </div>

          {data.carbon_emissions && (
            <div style={{
              background: "color-mix(in srgb, var(--color-success) 14%, var(--bg-secondary))",
              border: "1px solid color-mix(in srgb, var(--color-success) 30%, var(--border-color))",
              borderRadius: "10px", padding: "10px 14px",
              fontSize: "13px", color: "var(--text-primary)", marginBottom: "20px",
            }}>
              🌿 Estimated CO₂: <strong>{Math.round(data.carbon_emissions / 1000)} kg</strong> per passenger
            </div>
          )}

          {/* Price + CTAs */}
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "var(--accent-primary)" }}>
                {priceLabel}
              </div>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button
                onClick={handleBookOnGoogle}
                style={{
                  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover))",
                  color: "var(--text-inverse)", border: "none", borderRadius: "12px",
                  padding: "12px 18px", fontWeight: 700, fontSize: "13px",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Search on Google
              </button>
              <button
                onClick={handleBookOnSkyscanner}
                style={{
                  background: "linear-gradient(135deg, var(--color-primary-700), var(--color-primary-500))",
                  color: "var(--text-inverse)", border: "none", borderRadius: "12px",
                  padding: "12px 18px", fontWeight: 700, fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                ✈️ Book on Skyscanner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── FlightCard ──────────────────────────────────────────────────────────────
const FlightCard = ({ data, currency = "USD" }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const { isFavorited, toggle } = useToggleWatchlist("flight", data?.id);
  const itemName = `${data?.airline} ${data?.flight_number}`;

  const convertedPrice = useTransCurrency(data?.price_per_person || data?.price || 0);
  const convertedOldPrice = useTransCurrency((+(data?.price_per_person || data?.price || 0)) + 60);
  const priceLabel = formatFlightPrice(data?.price_per_person || data?.price);
  const { src: safeAirlineLogoSrc, onError: handleAirlineLogoError } = useImageFallback(data?.airline_logo);

  const handleShowDetails = () => {
    const token = localStorage.getItem("token");
    const isAuthenticated = token && token !== 'undefined' && token !== 'null';

    if (!isAuthenticated) {
      setShowPrompt(true);
      return;
    }
    setShowModal(true);
  };

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("token");
    const isAuthenticated = token && token !== 'undefined' && token !== 'null';

    if (!isAuthenticated) {
      setShowPrompt(true);
      return;
    }
    await toggle(itemName);
  };

  if (!data) return null;

  return (
    <>
      {showPrompt && (
        <LoginPromptModal
          open={showPrompt}
          onClose={() => setShowPrompt(false)}
          onGoLogin={() => { setShowPrompt(false); navigate("/login"); }}
          type="flight"
        />
      )}
      {showModal && (
        <FlightDetailModal data={data} onClose={() => setShowModal(false)} />
      )}

      <MDBContainer fluid className="mb-3">
        <MDBRow className="justify-content-center">
          <MDBCol md="12" xl="11">
            <MDBCard style={{
              borderRadius: "16px",
              boxShadow: "var(--shadow-md)",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              overflow: "hidden",
              transition: "box-shadow 0.2s, transform 0.2s",
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
                <WatchlistButton type="flight" id={data.id} title={`${data.airline} ${data.flight_number}`} />
              </div>
              <MDBCardBody style={{ padding: "18px 22px" }}>
                <MDBRow className="align-items-center g-3">

                  {/* Airline */}
                  <MDBCol xs={12} sm={2} className="d-flex align-items-center gap-2">
                    <img
                      src={safeAirlineLogoSrc}
                      alt={data.airline ?? 'Airline logo'}
                      onError={handleAirlineLogoError}
                      loading="lazy"
                      style={{ width: 38, height: 38, objectFit: "contain", borderRadius: "8px", background: '#fff', padding: '2px' }}
                    />
                    <div>
                      <div className="fw-bold dark:text-white!" style={{ fontSize: "13px", color: 'var(--text-primary)' }}>
                        {data.airline || "Airline"}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{data.flight_number}</div>
                    </div>
                  </MDBCol>

                  {/* Route */}
                  <MDBCol xs={12} sm={5} className="d-flex align-items-center">
                    <div className="text-center">
                      <div className="fw-bold dark:text-white!" style={{ fontSize: "22px", lineHeight: 1 }}>
                        {fmtTime(data.departure_time)}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{fmtDate(data.departure_time)}</div>
                      <div className="fw-semibold dark:text-white/70!" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                        {data.from_code}
                      </div>
                    </div>

                    <div className="flex-grow-1 text-center mx-3">
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>
                        {fmtDuration(data.duration_raw, data.duration)}
                      </div>
                      <div style={{ borderTop: "2px dashed color-mix(in srgb, var(--text-muted) 45%, transparent)", position: "relative" }}>
                        <span style={{
                          position: "absolute", top: "-10px", left: "50%",
                          transform: "translateX(-50%)", fontSize: "16px",
                          background: "var(--bg-secondary)", lineHeight: 1,
                        }} className="dark:bg-transparent!">✈️</span>
                      </div>
                      <div style={{ marginTop: "8px" }}>
                        <StopsTag stops={data.stops ?? 0} />
                      </div>
                      {data.stop_names?.length > 0 && (
                        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          via {data.stop_names.join(", ")}
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <div className="fw-bold dark:text-white!" style={{ fontSize: "22px", lineHeight: 1 }}>
                        {fmtTime(data.arrival_time)}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{fmtDate(data.arrival_time)}</div>
                      <div className="fw-semibold dark:text-white/70!" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                        {data.to_code}
                      </div>
                    </div>
                  </MDBCol>

                  {/* Class */}
                  <MDBCol xs={6} sm={2} className="text-center">
                    <span style={{
                      background: data.travel_class === "Business"
                        ? "color-mix(in srgb, var(--color-warning) 18%, var(--bg-secondary))"
                        : "color-mix(in srgb, var(--color-success) 16%, var(--bg-secondary))",
                      color: data.travel_class === "Business" ? "var(--color-warning)" : "var(--color-success)",
                      borderRadius: "6px", padding: "4px 10px",
                      fontSize: "12px", fontWeight: 700, display: "inline-block",
                    }}>{data.travel_class || "Economy"}</span>
                    {data.carbon_emissions && (
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>
                        🌿 {Math.round(data.carbon_emissions / 1000)} kg CO₂
                      </div>
                    )}
                  </MDBCol>

                  {/* Price + Buttons */}
                  <MDBCol xs={6} sm={3} className="text-center border-start">
                    <div className="d-flex align-items-baseline justify-content-center gap-2 mb-1">
                      <span className="dark:text-yellow-400!" style={{ fontSize: "22px", fontWeight: 800, color: "var(--accent-primary)" }}>
                        {priceLabel}
                      </span>
                      {priceLabel !== 'Price on request' ? (
                        <span style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "line-through" }}>
                          {convertedOldPrice}
                        </span>
                      ) : null}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "10px" }}>per person</div>

                    <div className="d-flex flex-column gap-2">
                      <MDBBtn
                        color="primary"
                        size="sm"
                        onClick={handleShowDetails}
                        style={{
                          borderRadius: "8px",
                          fontWeight: 600,
                          background: "linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover))",
                          borderColor: "var(--accent-primary)",
                          color: "var(--text-inverse)",
                        }}
                      >
                        {t("detailsBtn") || "Details"}
                      </MDBBtn>
                      <MDBBtn
                        outline
                        color={isFavorited ? "success" : "primary"}
                        size="sm"
                        onClick={handleAddToWishlist}
                        style={{
                          borderRadius: "8px",
                          fontWeight: 600,
                          borderColor: "var(--color-primary-500)",
                          color: "var(--color-primary-700)",
                        }}
                      >
                        {isFavorited ? "✓ Saved" : (t("addToWishListBtn") || "Add to Favorite")}
                      </MDBBtn>
                    </div>
                  </MDBCol>

                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default React.memo(FlightCard);
