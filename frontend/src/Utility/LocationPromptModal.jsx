import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { continents } from './Navbar/continentsData';

const PLANE_ANIMATION_MS = 1400;
const NAVIGATION_DELAY_MS = 1210;

/**
 * LocationPromptModal - A modal that prompts users to choose a destination continent
 * before continuing the Cars/Cruises flow.
 * 
 * @param {boolean} open - Controls modal visibility
 * @param {function} onClose - Callback when modal is closed
 * @param {function} onContinue - Callback with selected continent link when user clicks Continue
 * @param {string} serviceType - The service being accessed ('cars' or 'cruises')
 */
const LocationPromptModal = ({ open, onClose, onContinue, serviceType }) => {
    const { t } = useTranslation();
    const [selectedContinentLink, setSelectedContinentLink] = useState('');
    const [error, setError] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);
    const [navDestName, setNavDestName] = useState('');

    // Reset state whenever modal opens
    useEffect(() => {
        if (open) {
            setSelectedContinentLink('');
            setError('');
            setIsNavigating(false);
            setNavDestName('');
        }
    }, [open]);

    // Handle continue button click
    const handleContinue = () => {
        if (!selectedContinentLink) {
            setError(t('locationRequired') || 'Please select a destination');
            return;
        }

        const selectedContinent = continents.find((c) => c.link === selectedContinentLink);
        setNavDestName(selectedContinent ? t(selectedContinent.name) : t('destination'));
        setIsNavigating(true);

        setTimeout(() => {
            onContinue(selectedContinentLink);
            onClose();
        }, NAVIGATION_DELAY_MS);
    };

    // Handle select change and clear error
    const handleSelectChange = (e) => {
        setSelectedContinentLink(e.target.value);
        if (error) setError('');
    };

    if (!open) return null;

    // Determine service name for display
    const serviceName = serviceType === 'cars' ? (t('cars') || 'Cars') : (t('cruises') || 'Cruises');

    return createPortal(
        <>
            {/* Animation styles */}
            <style>{`
                @keyframes popIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to   { opacity: 1; transform: scale(1); }
                }
                .location-modal-card {
                    animation: popIn 200ms ease-out forwards;
                }
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
                .plane-emoji {
                    font-size: 80px;
                    animation: flyAcross ${PLANE_ANIMATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    margin-bottom: 30px;
                }
                .dest-text {
                    font-size: 32px;
                    font-weight: 800;
                    text-align: center;
                    background: linear-gradient(90deg, #1a73e8, #FF8C00);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: pulseText 1s infinite alternate;
                }
                @keyframes fadeOverlayIn {
                    to { opacity: 1; }
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
                @keyframes pulseText {
                    from { transform: scale(1); opacity: 0.8; }
                    to { transform: scale(1.05); opacity: 1; }
                }
            `}</style>

            {isNavigating && (
                <div className="flight-overlay">
                    <div className="plane-emoji">✈️</div>
                    <div className="dest-text" dir="auto">
                        {`Heading to ${navDestName}...`}
                    </div>
                </div>
            )}

            {!isNavigating && (
                /* Backdrop */
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 dark:bg-black/60 z-[9999999] flex items-center justify-center p-5 backdrop-blur-[1px]"
                >
                    {/* Modal Card */}
                    <div
                        className="location-modal-card bg-white dark:bg-gray-900 rounded-[22px] p-8 max-w-[420px] w-full text-center shadow-2xl border border-gray-100 dark:border-gray-800"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-5 text-2xl shadow-sm">
                            <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400 text-2xl" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('whereTraveling') || 'Where are you traveling?'}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-[14px] text-gray-500 dark:text-gray-400 mx-auto mb-6 max-w-[300px] leading-relaxed">
                            {t('locationPromptSubtitle') || `Choose your destination to find the best ${serviceName} options`}
                        </p>

                        {/* Destination Dropdown */}
                        <div className="relative mb-4">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaMapMarkerAlt className="text-lg" />
                            </div>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                            <select
                                value={selectedContinentLink}
                                onChange={handleSelectChange}
                                className="w-full h-12 pl-12 pr-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-[15px] font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none shadow-sm hover:border-blue-300 dark:hover:border-blue-500"
                                autoFocus
                            >
                                <option value="">{t('selectDestination') || 'Select destination'}</option>
                                {continents.map((continent) => (
                                    <option key={continent.name} value={continent.link}>
                                        {t(continent.name)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 text-sm mb-4 -mt-2">
                                {error}
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 mt-5">
                            <button
                                onClick={handleContinue}
                                disabled={isNavigating}
                                className="w-full h-12 bg-[#1a1a2e] dark:bg-blue-600 text-white rounded-xl text-[15px] font-semibold transition-all hover:bg-[#0f3460] dark:hover:bg-blue-700 active:scale-[0.98]"
                            >
                                {t('continue') || 'Continue'}
                            </button>

                            <button
                                onClick={onClose}
                                disabled={isNavigating}
                                className="w-full h-11 bg-transparent text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98]"
                            >
                                {t('cancel') || 'Cancel'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>,
        document.body
    );
};

export default LocationPromptModal;
