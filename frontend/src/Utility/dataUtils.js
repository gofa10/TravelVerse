/**
 * Data field access utilities for consistent data handling across the app
 */

export const getItemRating = (item) => {
  // Priority: rate > rating > average_rating
  if (item?.rate != null) return Number(item.rate);
  if (item?.rating != null) return Number(item.rating);
  if (item?.average_rating != null) return Number(item.average_rating);
  return null;
};

export const getItemPrice = (item) => {
  // Priority: price > price_per_day > price_per_night
  if (item?.price != null) return Number(item.price);
  if (item?.price_per_day != null) return Number(item.price_per_day);
  if (item?.price_per_night != null) return Number(item.price_per_night);
  return null;
};

export const getItemTitle = (item) => {
  return item?.title ||
    item?.name ||
    item?.name_en ||
    item?.name_ar ||
    (item?.brand && item?.model ? `${item.brand} ${item.model}` : null) ||
    (item?.from_location && item?.to_location ? `${item.from_location} → ${item.to_location}` : null) ||
    '';
};

export const getItemImage = (item) => {
  if (Array.isArray(item?.images) && item.images.length > 0) {
    const img = item.images[0];
    return typeof img === 'string' ? img : img?.url || img?.image || img?.path;
  }
  return item?.image || item?.thumbnail || item?.cover || null;
};
