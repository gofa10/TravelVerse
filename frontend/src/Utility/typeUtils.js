/**
 * Type mapping utilities for consistent singular to plural conversion across the app
 */

export const typeToPlural = {
  trip: 'trips',
  hotel: 'hotels',
  restaurant: 'restaurants',
  activity: 'activities',
  activitie: 'activities',
  car: 'cars',
  cruise: 'cruises',
  flight: 'flights',
};

export const normalizeType = (type = '') => {
  const value = String(type).toLowerCase().trim();
  if (value === 'activitie') return 'activity';
  return value;
};

export const getApiEndpoint = (type) => {
  const normalizedType = normalizeType(type);
  return typeToPlural[normalizedType] || normalizedType;
};
