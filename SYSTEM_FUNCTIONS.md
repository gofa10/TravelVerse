# TravelVerse System Function Audit

This document summarizes the verified system functions existing in the TravelVerse project.

## Summary Table

| Function | Status | Frontend Path | Backend Controller |
| :--- | :--- | :--- | :--- |
| **1. Search & Filter** | ✅ EXISTS | `frontend/src/Pages/SearchResults.jsx` | `SearchController.php` |
| **2. Booking / Reservation** | ✅ EXISTS | `frontend/src/Pages/BookTrip/BookTrip.jsx` | `ReservationController.php` |
| **3. Favorites / Watchlist** | ✅ EXISTS | `frontend/src/Pages/User/MyFavorites.jsx` | `FavoriteController.php` |
| **4. Reviews & Ratings** | ✅ EXISTS | `frontend/src/Pages/User/MyReviews.jsx` | `ReviewController.php` |
| **5. Trip Management (Guide)** | ✅ EXISTS | `frontend/src/Pages/Guide/GuideDashboard.jsx` | `TripController.php` |
| **6. Admin Management** | ✅ EXISTS | `frontend/src/Pages/Admin/Main.jsx` | Various (AdminDashboardController, etc.) |
| **7. User Account Management**| ✅ EXISTS | `frontend/src/Pages/User/ProfileSettings.jsx` | `AuthController.php` |
| **8. Multi-language Support** | ✅ EXISTS | `frontend/src/App.jsx` | (Frontend-led via i18next) |
| **9. Currency Conversion** | ✅ EXISTS | `frontend/src/Hooks/useTransCurrency.js` | (Frontend-led via Redux) |

---

## Detailed Function Descriptions

### FUNCTION 1 — Search & Filter
- **STATUS**: ✅ EXISTS
- **INPUT**: `q` (query string), `category`, `location`, `min_price`, `max_price`, `full` (boolean).
- **OUTPUT**: Array of objects with `id`, `type`, `title`, `image`, `location`, `price`.
- **Frontend file**: `frontend/src/Pages/SearchResults.jsx`
- **Backend route + Controller method**: `GET /api/search` → `SearchController@index`
- **Important Notes**: Supports categories: `trip`, `hotel`, `restaurant`, `activity`, `cruise`, `car`, `flight`. Searches names in both English (`name_en`) and Arabic (`name_ar`).

### FUNCTION 2 — Booking / Reservation
- **STATUS**: ✅ EXISTS
- **INPUT**: `reservable_type`, `reservable_id`, `date`, `people`.
- **OUTPUT**: Reservation object including the `reservable` details and status.
- **Frontend file**: `frontend/src/Utility/Cards/DetialtripCard.jsx`, `frontend/src/Pages/BookTrip/BookTrip.jsx`
- **Backend route + Controller method**: `POST /api/reservations` → `ReservationController@store`
- **Important Notes**: Statuses include: `saved`, `redirect_pending`, `booking_claimed`, `booking_declined`, `left_without_booking`, `cancelled`. Supports all main service types.

### FUNCTION 3 — Favorites / Watchlist
- **STATUS**: ✅ EXISTS
- **INPUT**: `favoritable_id` (Item ID), `favoritable_type` (Model class).
- **OUTPUT**: JSON with favorite record and item details.
- **Frontend file**: `frontend/src/Pages/User/MyFavorites.jsx`, `WatchlistButton.jsx`
- **Backend route + Controller method**: `POST /api/favorites` → `FavoriteController@store`
- **Important Notes**: Supports Trip, Hotel, Restaurant, Activity, Car, Cruise, and Flight.

### FUNCTION 4 — Reviews & Ratings
- **STATUS**: ✅ EXISTS
- **INPUT**: `rating` (rate field in DB, 1-5), `comment`, `reviewable_type`, `reviewable_id`.
- **OUTPUT**: Review object.
- **Frontend file**: `frontend/src/Component/Reviews/ReviewForm.jsx`, `frontend/src/Pages/User/MyReviews.jsx`
- **Backend route + Controller method**: `POST /api/reviews` → `ReviewController@store`
- **Important Notes**: Users can delete their own reviews. Admins can delete any. Guides can reply to reviews on their trips via `ReviewController@reply`.

### FUNCTION 5 — Trip Management (Guide)
- **STATUS**: ✅ EXISTS
- **INPUT**: `name_en/ar`, `description_en/ar`, `location`, `price`, `duration`, `continent`, `difficulty`, `booking_link`, `images`.
- **OUTPUT**: Status of operation, trip objects, reservation lists.
- **Frontend file**: `frontend/src/Pages/Guide/GuideMyTrips.jsx`, `frontend/src/Pages/Guide/GuideDashboard.jsx`
- **Backend route + Controller method**: Various under `prefix('guide')` in `api.php`.
- **Important Notes**: Guides have a dedicated dashboard to manage their trips, view reservations, mark attendance (`updateAttendance`), and respond to reviews.

### FUNCTION 6 — Admin Management
- **STATUS**: ✅ EXISTS
- **INPUT**: All CRUD fields for all entities.
- **OUTPUT**: Dashboard statistics, entity lists.
- **Frontend file**: `frontend/src/Pages/Admin/Main.jsx`
- **Backend route + Controller method**: Multiple (e.g., `UserController@index`, `HotelController@store`, etc.).
- **Operations**: CRUD for Users, Trips, Hotels, Restaurants, Activities, Cars, Cruises, Flights, Reviews, and Images.

### FUNCTION 7 — User Account Management
- **STATUS**: ✅ EXISTS
- **INPUT**: `name`, `email`, `password`, `avatar`.
- **OUTPUT**: User object, access tokens.
- **Frontend file**: `frontend/src/Pages/User/ProfileSettings.jsx`
- **Backend route + Controller method**: `AuthController.php`, `UserController.php`
- **Important Notes**: Uses Laravel Sanctum for tokens. Supports three user types: `user`, `admin`, `tour_guide`.

### FUNCTION 8 — Multi-language Support
- **STATUS**: ✅ EXISTS
- **INPUT**: `Accept-Language` header OR locale selection in UI.
- **OUTPUT**: Translated strings.
- **Frontend file**: `frontend/src/App.jsx` (Setup), `src/Lang/` (Locale files).
- **Backend route + Controller method**: Integrated in `SearchController` and `HomeController` to return localized names.
- **Languages**: Confirmed support for **English (en)** and **Arabic (ar)**.

### FUNCTION 9 — Currency Conversion
- **STATUS**: ✅ EXISTS
- **INPUT**: Price in USD (default in DB).
- **OUTPUT**: Formatted price string (e.g., "$ 100.00", "E£ 4800.00").
- **Frontend file**: `frontend/src/Hooks/useTransCurrency.js`, `frontend/src/Radux/Slices/currencySlice.js`
- **Backend route + Controller method**: N/A (Frontend-only calculation).
- **Supported Currencies**: USD, Dollar, RUB, EGP, Pound. Rates are currently hardcoded in the `useTransCurrency` hook.

---

## Extra Functions Not Previously Mentioned

1.  **Trip Builder / Planner**:
    - **Backend**: `TripPlanController.php`
    - **Description**: Users can create multi-day trip plans and add Trips, Hotels, or Restaurants to specific days with notes.
2.  **Google Flights Search Integration**:
    - **Backend**: `FlightSearchController.php`
    - **Description**: Uses SerpAPI to search for live flights, with a mock fallback.
3.  **Shopping Cart**:
    - **Backend**: `CartController.php`
    - **Description**: Allows users to stage items in a cart before booking.
4.  **Admin Image Management**:
    - **Backend**: `ImageController.php`
    - **Description**: Centralized image management for polymorphic entities (Trip, User, etc.).
