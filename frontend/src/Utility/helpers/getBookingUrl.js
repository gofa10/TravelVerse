const getBookingUrl = (item, type) => {
     // Priority 1: use stored URL from DB
     if (item?.booking_url) return item.booking_url;
     if (item?.booking_link) return item.booking_link;
     if (item?.external_url) return item.external_url;
     if (item?.link) return item.link;

     // Priority 2: auto-generate by type
     const name =
          item?.name ||
          item?.name_en ||
          item?.name_ar ||
          item?.title ||
          (item?.from_location && item?.to_location ? `${item.from_location} ${item.to_location}` : '') ||
          '';
     if (!name) return null;

     const location = item?.location || item?.city || item?.country || '';
     const rawQuery = `${name}${location ? ` ${location}` : ''}`.trim().replace(/\s+/g, ' ');
     const query = encodeURIComponent(rawQuery);

     switch (type?.toLowerCase()) {
          case 'trip':
               return `https://www.viator.com/searchResults/all?text=${query}`;
          case 'activity':
               return `https://www.viator.com/searchResults/all?text=${query}`;
          case 'hotel':
               return `https://www.booking.com/search.html?ss=${query}`;
          case 'restaurant':
               return `https://www.tripadvisor.com/Search?q=${query}&searchSessionId=restaurants`;
          case 'car':
               return `https://www.rentalcars.com/search?location=${query}`;
          case 'cruise':
               return `https://www.cruises.com/search#q=${query}`;
          default:
               return `https://www.viator.com/searchResults/all?text=${query}`;
     }
};

export default getBookingUrl;
