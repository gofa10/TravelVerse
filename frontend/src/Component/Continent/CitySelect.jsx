import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CitySelect = ({ cities = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navDestName, setNavDestName] = useState('');

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const requestedService = searchParams.get('service');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const triggerNavigation = (city) => {
    setNavDestName(city);
    setIsNavigating(true);
    // Wait for the animation before actually routing
    setTimeout(() => {
      const encodedCity = encodeURIComponent(city);

      if (requestedService === 'cars') {
        navigate(`/car/${encodedCity}`);
        return;
      }

      if (requestedService === 'cruises') {
        navigate(`/cruises/${encodedCity}`);
        return;
      }

      navigate(`/city/${encodedCity}`);
    }, 1500);
  };

  const handleSelectCity = (city) => {
    setSelectedDestination(city);
    setSearchTerm(city);
    setIsDropdownOpen(false);
    triggerNavigation(city);
  };

  const handleBookNow = () => {
    let dest = selectedDestination;

    if (!dest) {
      const match = cities.find(c => c.toLowerCase() === searchTerm.toLowerCase());
      if (match) {
        dest = match;
      } else if (filteredCities.length > 0 && searchTerm.trim() !== "") {
        dest = filteredCities[0];
      }
    }

    if (dest) {
      triggerNavigation(dest);
    } else {
      // visual feedback could go here
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsDropdownOpen(false);
      handleBookNow();
    }
  };

  // Inline styles for elements that need simple dynamic interaction
  const stylesObj = {
    icon: {
      color: '#1a73e8',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '16px'
    },
    input: {
      flex: 1,
      backgroundColor: 'transparent',
      padding: '16px 16px 16px 12px',
      border: 'none',
      outline: 'none',
      fontSize: '18px',
      color: '#333',
      width: '100%'
    },
    dropdown: {
      position: 'absolute',
      top: 'calc(100% + 12px)',
      left: '0',
      right: '0',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
      maxHeight: '300px',
      overflowY: 'auto',
      zIndex: 1000,
      padding: '8px 0'
    },
    dropdownItem: {
      padding: '14px 24px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#333',
      fontSize: '16px',
      textAlign: 'left'
    },
    dropdownEmpty: {
      padding: '14px 24px',
      color: '#888',
      textAlign: 'center',
      fontSize: '16px'
    },
    button: {
      backgroundColor: '#1a73e8',
      color: '#ffffff',
      fontWeight: '600',
      borderRadius: '50px',
      padding: '12px 32px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '16px',
      whiteSpace: 'nowrap',
      margin: '6px 6px 6px 0',
      boxShadow: '0 4px 15px rgba(26, 115, 232, 0.4)'
    }
  };

  return (
    <>
      <style>{`
        .search-pill-container {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border-radius: 50px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          width: 600px;
          max-width: 90vw;
          margin: 0 auto;
          position: relative;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .search-pill-container:focus-within {
          border: 2px solid rgba(26, 115, 232, 0.5);
          box-shadow: 0 8px 32px rgba(26, 115, 232, 0.2);
        }

        @media (max-width: 768px) {
          .search-pill-container {
            width: 90vw;
            flex-direction: column;
            border-radius: 20px;
            padding: 8px;
            background: rgba(255,255,255,0.95);
          }
          .hero-search-wrapper .icon-wrap {
            display: none !important;
          }
          .hero-search-wrapper input {
            text-align: center;
            padding: 16px !important;
          }
          .hero-search-wrapper button {
            width: 100%;
            margin: 0 !important;
            padding: 16px !important;
          }
        }

        /* Navigation Animation Overlay */
        .flight-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          animation: fadeOverlayIn 0.3s forwards;
        }

        @keyframes fadeOverlayIn {
          to { opacity: 1; }
        }

        .plane-emoji {
          font-size: 80px;
          animation: flyAcross 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          margin-bottom: 30px;
        }

        @keyframes flyAcross {
          0% {
            transform: translate(-100vw, 150px) rotate(10deg) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translate(-30vw, 50px) rotate(15deg) scale(0.8);
          }
          70% {
            opacity: 1;
            transform: translate(30vw, -50px) rotate(15deg) scale(1.2);
          }
          100% {
            transform: translate(100vw, -150px) rotate(15deg) scale(1.5);
            opacity: 0;
          }
        }

        .dest-text {
          font-size: 32px;
          font-weight: 800;
          color: #1a73e8;
          text-align: center;
          background: linear-gradient(90deg, #1a73e8, #FF8C00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pulseText 1s infinite alternate;
        }

        @keyframes pulseText {
          from { transform: scale(1); opacity: 0.8; }
          to { transform: scale(1.05); opacity: 1; }
        }
      `}</style>

      {isNavigating && (
        <div className="flight-overlay">
          <div className="plane-emoji">✈️</div>
          <div className="dest-text" dir="auto">
            Heading to {navDestName}...
          </div>
        </div>
      )}

      <div className="hero-search-wrapper" ref={dropdownRef}>
        <div className="search-pill-container">
          <div className="icon-wrap" style={stylesObj.icon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <input
            type="text"
            placeholder="Where do you want to go?"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedDestination(null);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onKeyDown={handleKeyDown}
            style={stylesObj.input}
          />

          <button
            onClick={handleBookNow}
            style={stylesObj.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1557b0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#1a73e8'}
          >
            Search
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div style={stylesObj.dropdown}>
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectCity(city)}
                    style={stylesObj.dropdownItem}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <span>📍</span>
                    <span>{city}</span>
                  </div>
                ))
              ) : (
                <div style={stylesObj.dropdownEmpty}>
                  No destinations found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CitySelect;
