═══════════════════════════════════════
QUESTION 1: AUTHENTICATION METHOD
═══════════════════════════════════════
- Package found: laravel/sanctum ^4.1
- Auth guard driver: Not found
- Middleware used: Not found
- Token generation method: $token = $user->createToken('auth_token')->plainTextToken;

═══════════════════════════════════════
QUESTION 2: FRONTEND STATE MANAGEMENT
═══════════════════════════════════════
- package.json dependencies:
  "@emotion/react": "^11.14.0"
  "@emotion/styled": "^11.14.0"
  "@mui/base": "^5.0.0-beta.69"
  "@mui/icons-material": "^6.3.0"
  "@mui/material": "^6.3.0"
  "@reduxjs/toolkit": "^2.8.2"
  "@tailwindcss/vite": "^4.1.18"
  "@tanstack/react-query": "^5.81.2"
  "axios": "^1.10.0"
  "bootstrap": "^5.3.8"
  "cra-template": "1.2.0"
  "framer-motion": "^12.18.1"
  "git-filter-repo": "^0.0.30"
  "i18next": "^24.2.0"
  "i18next-browser-languagedetector": "^8.0.2"
  "lucide-react": "^0.516.0"
  "mdb-react-ui-kit": "^9.0.0"
  "react": "^18.2.0"
  "react-beautiful-dnd": "^13.1.1"
  "react-bootstrap": "^2.10.10"
  "react-dom": "^18.2.0"
  "react-fast-marquee": "^1.6.5"
  "react-helmet-async": "^2.0.5"
  "react-hot-toast": "^2.6.0"
  "react-i18next": "^15.2.0"
  "react-icons": "^5.5.0"
  "react-lazy-load-image-component": "^1.6.3"
  "react-paginate": "^8.2.0"
  "react-redux": "^9.2.0"
  "react-router-dom": "^7.1.1"
  "react-spring": "^9.6.1"
  "react-toastify": "^11.0.5"
  "redux": "^5.0.1"
  "redux-thunk": "^3.1.0"
  "styled-components": "^6.1.13"
  "tailwindcss": "^4.1.18"
  "@vitejs/plugin-react": "^5.1.2"
  "ajv": "^6.12.6"
  "ajv-keywords": "^3.5.2"
  "typescript": "^5.4.5"
  "vite": "^7.3.1"
- Redux/State management package: redux (^5.0.1)
- UI Library: tailwindcss (^4.1.18)
- Store folder exists: no

═══════════════════════════════════════
QUESTION 3: DATABASE — COMPLETE TABLE LIST
═══════════════════════════════════════
0001_01_01_000000_create_users_table.php -> users:
- id: id (none)
- name: string (none)
- email: string (->unique())
- email_verified_at: timestamp (->nullable())
- password: string (none)
- rememberToken: rememberToken (none)
- timestamps: timestamps (none)
- email: string (->primary())
- token: string (none)
- created_at: timestamp (->nullable())

2025_06_08_180906_create_trips_table.php -> trips:
- id: id (none)
- name_en: string (none)
- name_ar: string (none)
- description_en: text (->nullable())
- description_ar: text (->nullable())
- location: string (none)
- guide_id: unsignedBigInteger (none)
- guide_id: foreign (->references('id')->on('users')->onDelete('cascade')->nullable()->change())
- duration: string (->nullable())
- continent: string (->nullable())
- timestamps: timestamps (none)

2025_06_09_140918_create_personal_access_tokens_table.php -> personal_access_tokens:
- id: id (none)
- tokenable: morphs (none)
- name: string (none)
- abilities: text (->nullable())
- last_used_at: timestamp (->nullable())
- expires_at: timestamp (->nullable())
- timestamps: timestamps (none)

2025_06_09_144844_create_hotels_table.php -> hotels:
- id: id (none)
- name_en: string (none)
- name_ar: string (->nullable())
- description_en: text (->nullable())
- description_ar: text (->nullable())
- class: string (->nullable())
- style: string (->nullable())
- amenities: json (->nullable())
- location: string (->nullable())
- booking_link: string (->nullable())
- timestamps: timestamps (none)

2025_06_09_150442_create_trip_translations_table.php -> trip_translations:
- id: id (none)
- trip_id: foreignId (->constrained('trips')->onDelete('cascade'))
- title: string (none)
- description: text (none)
- timestamps: timestamps (none)

2025_06_09_151220_create_images_table.php -> images:
- id: id (none)
- url: string (none)
- imageable: morphs (none)
- timestamps: timestamps (none)

2025_06_09_152021_create_restaurants_table.php -> restaurants:
- id: id (none)
- name_en: string (none)
- name_ar: string (none)
- description_en: text (->nullable())
- description_ar: text (->nullable())
- location: string (none)
- booking_link: string (->nullable())
- property_type: string (->nullable())
- cuisine: string (->nullable())
- features: json (->nullable())
- timestamps: timestamps (none)

2025_06_09_152408_create_activities_table.php -> activities:
- id: id (none)
- name_en: string (none)
- name_ar: string (none)
- description_en: text (->nullable())
- description_ar: text (->nullable())
- location: string (none)
- booking_link: string (->nullable())
- duration: string (->nullable())
- type: string (->nullable())
- start_time: json (->nullable())
- live_guide: boolean (->default(false))
- guide_languages: json (->nullable())
- timestamps: timestamps (none)

2025_06_09_152429_create_cruises_table.php -> cruises:
- id: id (none)
- name_en: string (none)
- name_ar: string (none)
- description_en: text (->nullable())
- description_ar: text (->nullable())
- location: string (none)
- booking_link: string (->nullable())
- from: string (->nullable())
- to: string (->nullable())
- depart_time: time (->nullable())
- return_time: time (->nullable())
- property_type: string (->nullable())
- style: string (->nullable())
- amenities: text (->nullable())
- timestamps: timestamps (none)

2025_06_09_152447_create_favorites_table.php -> favorites:
- id: id (none)
- user_id: foreignId (->constrained()->onDelete('cascade'))
- favoritable: morphs (none)
- timestamps: timestamps (none)

2025_06_09_152528_create_carts_table.php -> carts:
- id: id (none)
- user_id: foreignId (->constrained()->onDelete('cascade'))
- cartable: morphs (none)
- quantity: integer (->default(1))
- timestamps: timestamps (none)

2025_06_09_182152_create_cache_table.php -> cache:
- key: string (->primary())
- value: mediumText (none)
- expiration: integer (none)
- key: string (->primary())
- owner: string (none)
- expiration: integer (none)

2025_06_12_132101_create_cars_table.php -> cars:
- id: id (none)
- brand: string (none)
- model: string (none)
- type: string (none)
- year: integer (none)
- location: string (none)
- seats: integer (->nullable())
- large_bag: integer (->nullable())
- small_bag: integer (->nullable())
- car_specification: text (->nullable())
- supplier: string (->nullable())
- description_en: text (->nullable())
- description_ar: text (->nullable())
- booking_link: string (->nullable())
- timestamps: timestamps (none)

2025_06_12_150527_create_reviews_table.php -> reviews:
- id: id (none)
- user_id: unsignedBigInteger (none)
- rate: unsignedTinyInteger (none)
- comment: text (->nullable())
- reviewable_id: unsignedBigInteger (none)
- reviewable_type: string (none)
- timestamps: timestamps (none)
- user_id: foreign (->references('id')->on('users')->onDelete('cascade'))

2025_06_12_150842_create_reservations_table.php -> reservations:
- id: id (none)
- user_id: foreignId (->constrained()->onDelete('cascade'))
- reservable: morphs (none)
- is_paid: boolean (->default(false))
- timestamps: timestamps (none)

2025_06_22_000000_create_sessions_table.php -> sessions:
- id: string (->primary())
- user_id: foreignId (->nullable()->index())
- user_agent: text (->nullable())
- payload: text (none)
- last_activity: integer (->index())

2025_06_24_072635_create_flights_table.php -> flights:
- id: id (none)
- style: string (->nullable())
- from_location: string (none)
- departure_time: dateTime (none)
- to_location: string (none)
- arrival_time: dateTime (none)
- return_from: string (->nullable())
- return_departure_time: dateTime (->nullable())
- return_to: string (->nullable())
- return_arrival_time: dateTime (->nullable())
- stops_count: integer (->default(0))
- stop_locations: json (->nullable())
- booking_link: string (->nullable())
- timestamps: timestamps (none)

═══════════════════════════════════════
QUESTION 4: ALL MODELS (EXACT FIELDS)
═══════════════════════════════════════
Model: Activity
Fillable: name_en, name_ar, description_en, description_ar, price, rate, duration, type, location, booking_link, live_guide, guide_languages, start_time
Hidden: none
Casts: 'start_time' => 'array', 'guide_languages' => 'array', 'live_guide' => 'boolean'
Relationships:
- images(): [morphMany] -> [Image::class]
- favorites(): [morphMany] -> [Favorite::class]
- carts(): [morphMany] -> [Cart::class]
- reviews(): [morphMany] -> [Review::class]
- reservations(): [morphMany] -> [Reservation::class]

Model: Car
Fillable: brand, model, type, year, price, location, description_en, description_ar, rate, booking_link, seats, large_bag, small_bag, car_specification, supplier
Hidden: none
Casts: none
Relationships:
- images(): [morphMany] -> [Image::class]
- favorites(): [morphMany] -> [Favorite::class]
- carts(): [morphMany] -> [Cart::class]
- reviews(): [morphMany] -> [Review::class]
- reservations(): [morphMany] -> [Reservation::class]

Model: Cart
Fillable: none
Hidden: none
Casts: none
Relationships:
- cartable(): [morphTo] -> []
- carts(): [morphMany] -> [Cart::class]
- reviews(): [morphMany] -> [Review::class]
- reservations(): [morphMany] -> [Reservation::class]
- images(): [morphMany] -> [Image::class]

Model: Cruise
Fillable: name_en, name_ar, description_en, description_ar, location, price, booking_link, rate, from, to, depart_time, return_time, property_type, style, amenities
Hidden: none
Casts: none
Relationships:
- images(): [morphMany] -> [Image::class]
- favorites(): [morphMany] -> [Favorite::class]
- carts(): [morphMany] -> [Cart::class]
- reviews(): [morphMany] -> [Review::class]
- reservations(): [morphMany] -> [Reservation::class]

Model: Favorite
Fillable: user_id, favoritable_id, favoritable_type
Hidden: none
Casts: none
Relationships:
- favoritable(): [morphTo] -> []
- user(): [belongsTo] -> [User::class]

Model: Flight
Fillable: style, from_location, departure_time, to_location, arrival_time, return_from, return_departure_time, return_to, return_arrival_time, stops_count, stop_locations, duration, price, rate, booking_link
Hidden: none
Casts: 'stop_locations' => 'array', 'departure_time' => 'datetime', 'arrival_time' => 'datetime', 'return_departure_time' => 'datetime', 'return_arrival_time' => 'datetime'
Relationships:
- images(): [morphMany] -> [Image::class]
- favorites(): [morphMany] -> [Favorite::class]
- reservations(): [morphMany] -> [Reservation::class]

Model: Hotel
Fillable: name_en, name_ar, description_en, description_ar, rate, price, old_price, location, booking_link, class, style, amenities, // الجديد
Hidden: none
Casts: 'amenities' => 'array'
Relationships:
- images(): [morphMany] -> [Image::class]
- favorites(): [morphMany] -> [Favorite::class]
- carts(): [morphMany] -> [Cart::class]
- reviews(): [morphMany] -> [Review::class]
- reservations(): [morphMany] -> [Reservation::class]

Model: Image
Fillable: url, imageable_id, imageable_type
Hidden: none
Casts: none
Relationships:
- imageable(): [morphTo] -> []

Model: Reservation
Fillable: user_id, reservable_type, reservable_id, status, date, people, cancelled_at
Hidden: none
Casts: 'cancelled_at' => 'datetime'
Relationships:
- user(): [belongsTo] -> [User::class]
- reservable(): [morphTo] -> []
- trip(): [morphTo] -> ['reservable')->where('reservable_type']

Model: Restaurant
Fillable: name_en, name_ar, description_en, description_ar, location, booking_link, rate, property_type, cuisine, features, price
Hidden: none
Casts: 'price' => 'decimal:2', 'features' => 'array'
Relationships:
- images(): [morphMany] -> [Image::class]
- favorites(): [morphMany] -> [Favorite::class]
- carts(): [morphMany] -> [Cart::class]
- reviews(): [morphMany] -> [Review::class]
- reservations(): [morphMany] -> [Reservation::class]

Model: Review
Fillable: user_id, rate, comment, reply, reviewable_id, reviewable_type
Hidden: none
Casts: 'rate' => 'integer'
Relationships:
- user(): [belongsTo] -> [User::class]
- trip(): [morphTo] -> ['reviewable')->where('reviewable_type']

Model: Trip
Fillable: name_en, name_ar, price, location, start_date, end_date, guide_id, booking_link, rate, description_en, description_ar, duration, continent, difficulty
Hidden: none
Casts: none
Relationships:
- guide(): [belongsTo] -> [User::class]
- images(): [morphMany] -> [Image::class]
- favorites(): [morphMany] -> [Favorite::class]
- user(): [belongsTo] -> [User::class]
- carts(): [morphMany] -> [Cart::class]
- reviews(): [morphMany] -> [Review::class]
- reservations(): [morphMany] -> [Reservation::class]
- reviewsCount(): [reviews] -> [)->count(]

Model: TripTranslation
Fillable: trip_id, locale, title, description
Hidden: none
Casts: none
Relationships:
- trip(): [belongsTo] -> [Trip::class]

Model: User
Fillable: name, email, password
Hidden: password, remember_token
Casts: none
Relationships:
- favorites(): [hasMany] -> [Favorite::class]
- carts(): [hasMany] -> [Cart::class]
- reviews(): [hasMany] -> [Review::class]
- reservations(): [hasMany] -> [Reservation::class]
- image(): [morphOne] -> [\App\Models\Image::class]

═══════════════════════════════════════
QUESTION 5: ALL ROUTES (EXACT LIST)
═══════════════════════════════════════
<?php

// use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
// use App\Http\Controllers\UserController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\FlightSearchController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\HomeController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    ImageController,
    TripController,
    ActivityController,
    CruiseController,
    FavoriteController,
    CartController,
    HotelController,
    RestaurantController,
    CarController,
    ReviewController,
    ReservationController,
    SearchController,
// UserController
};
use App\Notifications\WelcomeUser;


// 1. المسارات المتاحة للضيوف فقط (Guest Only)
Route::middleware(['guest.only'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::post('/reset-password', [ResetPasswordController::class, 'reset']);


});

// 2. المسارات المتاحة للجميع (عرض بيانات فقط)
Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{hotel}', [HotelController::class, 'show']);

Route::get('/trips', [TripController::class, 'index']);
Route::get('/trips/{trip}', [TripController::class, 'show']);

Route::get('/activities', [ActivityController::class, 'index']);
Route::get('/activities/{activity}', [ActivityController::class, 'show']);

Route::get('/cruises', [CruiseController::class, 'index']);
Route::get('/cruises/{cruise}', [CruiseController::class, 'show']);

Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{restaurant}', [RestaurantController::class, 'show']);

Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{car}', [CarController::class, 'show']);

Route::get('/flights', [FlightController::class, 'index']);
Route::get('/flights/{flight}', [FlightController::class, 'show']);

// Google Flights search via SerpAPI (with mock fallback)
Route::get('/google-flights', [FlightSearchController::class, 'search']);

Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/reviews/{review}', [ReviewController::class, 'show']);

Route::get('/search', [SearchController::class, 'index']);

// ── Home page aggregated data (public) ───────────────────────────────────────
// Returns latest 8 items of every category in one request.
// GET /api/home
Route::get('/home', [HomeController::class, 'index']);
// Returns a single category only.
// GET /api/home/{category}  →  activities | trips | hotels | restaurants
Route::get('/home/{category}', [HomeController::class, 'category']);




// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'profile']);
    Route::post('/update-profile', [UserController::class, 'updateProfile']);
    Route::delete('/profile/avatar', [UserController::class, 'removeAvatar']);
    Route::post('/change-password', [UserController::class, 'changePassword']);
    Route::delete('/delete-account', [UserController::class, 'deleteAccount']);
});

// 3. المسارات التي تتطلب مصادقة
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    // رفع وحذف الصور (تم نقلها إلى middleware usertype:admin)

    // 4. المسارات الخاصة بالمستخدم العادي والمسؤول
    Route::middleware('usertype:user,admin')->group(function () {
        // Favorites و Cart
        Route::get('/favorites', [FavoriteController::class, 'index']);
        Route::post('/favorites', [FavoriteController::class, 'store']);
        Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy']);

        // Reviews - إضافة وعرض فقط للمستخدمين والمسؤولين
        Route::get('/my-reviews', [ReviewController::class, 'myReviews']);
        Route::post('/reviews', [ReviewController::class, 'store']);
    });

    // Reservations - user only
    Route::middleware('usertype:user')->group(function () {
        Route::get('/reservations', [ReservationController::class, 'index']);
        Route::post('/reservations', [ReservationController::class, 'store']);
        Route::patch('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);
        Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);
    });

    Route::middleware('usertype:tour_guide')->prefix('guide')->group(function () {
        // Trips (own trips only)
        Route::get('/trips', [TripController::class, 'guideTrips']);
        Route::post('/trips', [TripController::class, 'store']);
        Route::put('/trips/{trip}', [TripController::class, 'update']);
        Route::delete('/trips/{trip}', [TripController::class, 'destroy']);

        // Reservations (on own trips only)
        Route::get('/reservations', [ReservationController::class, 'guideReservations']);

        // Reviews (on own trips only)
        Route::get('/reviews', [ReviewController::class, 'guideReviews']);
        Route::post('/reviews/{review}/reply', [ReviewController::class, 'reply']);
    });

    // 5. المسارات الخاصة بـ Admin فقط
    Route::middleware('usertype:admin')->group(function () {
        // إدارة الصور الثقيلة للكيانات
        Route::post('/images', [ImageController::class, 'store']);
        Route::delete('/images/{id}', [ImageController::class, 'destroy']);

        // Hotels
        Route::post('/hotels', [HotelController::class, 'store']);
        Route::put('/hotels/{hotel}', [HotelController::class, 'update']);
        Route::delete('/hotels/{hotel}', [HotelController::class, 'destroy']);

        Route::get('/users/guides', [UserController::class, 'guides']);
        Route::get('/users/all', [UserController::class, 'all']);
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}/details', [UserController::class, 'details']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        // Trips
        Route::post('/trips', [TripController::class, 'store']);
        Route::put('/trips/{trip}', [TripController::class, 'update']);
        Route::delete('/trips/{trip}', [TripController::class, 'destroy']);
        Route::post('/trips/{id}/images', [TripController::class, 'uploadImages']);


        // Activities
        Route::post('/activities', [ActivityController::class, 'store']);
        Route::put('/activities/{activity}', [ActivityController::class, 'update']);
        Route::delete('/activities/{activity}', [ActivityController::class, 'destroy']);
        Route::get('/activities/types', [ActivityController::class, 'uniqueTypes']);

        // Cruises
        Route::post('/cruises', [CruiseController::class, 'store']);
        Route::put('/cruises/{cruise}', [CruiseController::class, 'update']);
        Route::delete('/cruises/{cruise}', [CruiseController::class, 'destroy']);

        // Restaurants
        Route::post('/restaurants', [RestaurantController::class, 'store']);
        Route::put('/restaurants/{restaurant}', [RestaurantController::class, 'update']);
        Route::delete('/restaurants/{restaurant}', [RestaurantController::class, 'destroy']);

        // Cars
        Route::post('/cars', [CarController::class, 'store']);
        Route::put('/cars/{car}', [CarController::class, 'update']);
        Route::delete('/cars/{car}', [CarController::class, 'destroy']);
        // داخل middleware usertype:admin
        Route::post('/flights', [FlightController::class, 'store']);
        Route::put('/flights/{flight}', [FlightController::class, 'update']);
        Route::delete('/flights/{flight}', [FlightController::class, 'destroy']);


        // Admin ممكن يحذف reviews أو يشوف reservations
        Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
        Route::get('/admin/reservations', [ReservationController::class, 'adminIndex']);
        Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);
    });
});

// TODO: Remove this test route before production deployment
// Route::get('/test-mail', function () {
//     $user = User::find(39); // أو أي مستخدم موجود
//     $user->notify(new WelcomeUser());
//     return 'تم إرسال البريد ✉️ بنجاح!';
// });

═══════════════════════════════════════
QUESTION 6: FRONTEND PAGES (EXACT LIST)
═══════════════════════════════════════
File: frontend/src/Pages/SearchResults.jsx
Component: SearchResults
API calls: api.get(`/search?q=${encodeURIComponent(q.trim()

File: frontend/src/Pages/Guide/GuideProfile.jsx
Component: function
API calls: none found

File: frontend/src/Pages/Guide/GuideMyReservations.jsx
Component: function
API calls: api.get('/guide/reservations')

File: frontend/src/Pages/Guide/GuideMyReviews.jsx
Component: function
API calls: api.get('/guide/reviews'), api.post(`/guide/reviews/${id}/reply`, { reply })

File: frontend/src/Pages/Guide/GuideDashboard.jsx
Component: function
API calls: none found

File: frontend/src/Pages/Guide/GuideSidebar.jsx
Component: function
API calls: none found

File: frontend/src/Pages/Guide/GuideMyTrips.jsx
Component: function
API calls: api.get('/guide/trips'), api.post('/guide/trips', payload), api.post(`/guide/trips/${id}`, payload), api.delete(`/guide/trips/${id}`)

File: frontend/src/Pages/Home/Home.jsx
Component: Home
API calls: api.get(`${API_BASE}/home`)

File: frontend/src/Pages/Res/Res.jsx
Component: Restaurants
API calls: api.get(`/restaurants`)

File: frontend/src/Pages/City/City.jsx
Component: City
API calls: api.get(`/${endpoint}`)

File: frontend/src/Pages/Hotel/Hotel.jsx
Component: Hotel
API calls: api.get(`/hotels?page=${page}`)

File: frontend/src/Pages/Auth/ResetPassword.jsx
Component: ResetPassword
API calls: api.post('/reset-password', data)

File: frontend/src/Pages/Auth/ForgotPassword.jsx
Component: ForgotPassword
API calls: api.post('/forgot-password', { email })

File: frontend/src/Pages/Auth/Login.jsx
Component: Login
API calls: none found

File: frontend/src/Pages/DetialTrip/DetialTrip.jsx
Component: DetialItem
API calls: api.get(`/${endpoint}/${id}`), api.get('/reviews')

File: frontend/src/Pages/Flight/Flight.jsx
Component: Flight
API calls: api.get(`${BACKEND}/google-flights`, { params })

File: frontend/src/Pages/Admin/AdminDash.jsx
Component: AdminDash
API calls: none found

File: frontend/src/Pages/Admin/Sidebar2.jsx
Component: Sidebar
API calls: none found

File: frontend/src/Pages/Admin/Main.jsx
Component: Main
API calls: api.get('/admin/dashboard')

File: frontend/src/Pages/Admin/Navbar.jsx
Component: Navbar
API calls: none found

File: frontend/src/Pages/Admin/ReservationsMang/ReservationDetailDrawer.jsx
Component: function
API calls: none found

File: frontend/src/Pages/Admin/ReservationsMang/AdminReservations.jsx
Component: AdminReservations
API calls: api.get(`/admin/reservations?page=${page}`)

File: frontend/src/Pages/Admin/TripMang/TripManagement.jsx
Component: TripManagement
API calls: api.get('/trips'), api.post('/trips', payload), api.post(`/trips/${res.data.id}/images`, formData), api.put(`/trips/${id}`, payload), api.post(`/trips/${id}/images`, formData), api.delete(`/trips/${id}`)

File: frontend/src/Pages/Admin/TripMang/TripTable.jsx
Component: TripTable
API calls: none found

File: frontend/src/Pages/Admin/TripMang/TripModal .jsx
Component: TripModal
API calls: api.get('/users/guides', { signal: controller.signal })

File: frontend/src/Pages/Admin/ActivityMang/ActivityManagement.jsx
Component: ActivityManagement
API calls: api.get(`${API_BASE}?page=${currentPage}`), api.post(API_BASE, data), api.post(`${API_BASE}/${id}?_method=PUT`, data), api.delete(`${API_BASE}/${id}`)

File: frontend/src/Pages/Admin/ActivityMang/ActivityModal.jsx
Component: ActivityModal
API calls: none found

File: frontend/src/Pages/Admin/ActivityMang/ActivityTable.jsx
Component: ActivityTable
API calls: none found

File: frontend/src/Pages/Admin/CarMang/CarTable.jsx
Component: CarTable
API calls: none found

File: frontend/src/Pages/Admin/CarMang/CarModal.jsx
Component: CarModal
API calls: none found

File: frontend/src/Pages/Admin/CarMang/CarManagement.jsx
Component: CarManagement
API calls: api.get(`/cars?page=${page}&search=${searchTerm}`), api.delete(`/cars/${id}`)

File: frontend/src/Pages/Admin/CruiseMang/CruiseManagement.jsx
Component: CruiseManagement
API calls: api.get(`/cruises?page=${page}`), api.delete(`/cruises/${id}`)

File: frontend/src/Pages/Admin/CruiseMang/CruiseTable..jsx
Component: CruiseTable
API calls: none found

File: frontend/src/Pages/Admin/CruiseMang/CruiseModal .jsx
Component: CruiseModal
API calls: none found

File: frontend/src/Pages/Admin/UserMang/UserDetailsModal.jsx
Component: UserDetailsModal
API calls: none found

File: frontend/src/Pages/Admin/UserMang/UserTable.jsx
Component: UserTable
API calls: none found

File: frontend/src/Pages/Admin/UserMang/GuideCreateModal.jsx
Component: function
API calls: none found

File: frontend/src/Pages/Admin/UserMang/UserModal.jsx
Component: UserModal
API calls: none found

File: frontend/src/Pages/Admin/UserMang/EditGuide.jsx
Component: UserManagement
API calls: api.get(`/users?page=${page}`), api.get('/users/all'), api.post('/users', userData), api.put(`/users/${userData.id}`, userData), api.delete(`/users/${id}`), api.get(`/users/${detailsUserId}/details`)

File: frontend/src/Pages/Admin/FlightMang/FlightModal.jsx
Component: FlightModal
API calls: api.post('/flights', data), api.put(`/flights/${id}`, data)

File: frontend/src/Pages/Admin/FlightMang/FlightTable.jsx
Component: FlightTable
API calls: none found

File: frontend/src/Pages/Admin/FlightMang/FlightManagement.jsx
Component: FlightManagement
API calls: api.get(`/flights?page=${page}`), api.post('/flights', flightData), api.put(`/flights/${flightData.id}`, flightData), api.delete(`/flights/${id}`)

File: frontend/src/Pages/Admin/RestuarntMang/RestaurantTable.jsx
Component: RestaurantTable
API calls: none found

File: frontend/src/Pages/Admin/RestuarntMang/RestaurantModal.jsx
Component: RestaurantModal
API calls: none found

File: frontend/src/Pages/Admin/RestuarntMang/Restaurant Management.jsx
Component: RestaurantManagement
API calls: api.get(`${API_BASE}?page=${page}`), api.post(API_BASE, data), api.post(`${API_BASE}/${id}?_method=PUT`, data), api.delete(`${API_BASE}/${id}`)

File: frontend/src/Pages/Admin/HotelMang/HotelModal.jsx
Component: HotelModal
API calls: none found

File: frontend/src/Pages/Admin/HotelMang/HotelTable.jsx
Component: HotelTable
API calls: none found

File: frontend/src/Pages/Admin/HotelMang/EditHotels.jsx
Component: HotelManagement
API calls: none found

File: frontend/src/Pages/Admin/HotelMang/Hotel Query Setup.js
Component: useHotels
API calls: none found

File: frontend/src/Pages/ThingsToDo/ThingsToDo.jsx
Component: ThingsToDo
API calls: none found

File: frontend/src/Pages/ThingsToDo/AllThings.jsx
Component: AllThings
API calls: api.get('/activities')

File: frontend/src/Pages/User/ProfileSettings.jsx
Component: ProfileSettings
API calls: api.get('/user'), api.delete('/delete-account'), api.delete('/profile/avatar')

File: frontend/src/Pages/User/ProjectsSection.jsx
Component: UserDash
API calls: none found

File: frontend/src/Pages/User/UserDashboard .jsx
Component: UserDashboard
API calls: none found

File: frontend/src/Pages/User/MyFavorites.jsx
Component: MyFavorites
API calls: api.get('/favorites'), api.delete(`/favorites/${id}`)

File: frontend/src/Pages/User/MyReviews.jsx
Component: UserReviews
API calls: api.get('/my-reviews'), api.delete(`/reviews/${id}`)

File: frontend/src/Pages/User/Dashboard.jsx
Component: Dashboard
API calls: none found

File: frontend/src/Pages/User/UserSidebar.jsx
Component: UserSidebar
API calls: api.get('/user')

File: frontend/src/Pages/User/Overview.jsx
Component: Overview
API calls: api.get('/reservations'), api.get('/favorites'), api.get('/reviews')

File: frontend/src/Pages/User/MyReservations.jsx
Component: MyReserv
API calls: api.get('/reservations'), api.delete(`/reservations/${id}`)

File: frontend/src/Pages/User/DeleteAccount.jsx
Component: DeleteAccount
API calls: none found

File: frontend/src/Pages/Continent/continentData.js
Component: continentData
API calls: none found

File: frontend/src/Pages/Continent/Continent.jsx
Component: Continent
API calls: api.get(`/${endpoint}`)

File: frontend/src/Pages/Cars/Cars.jsx
Component: Cars
API calls: api.get('/cars')

File: frontend/src/Pages/BookTrip/BookTrip.jsx
Component: BookTrip
API calls: none found

File: frontend/src/Pages/LandingPage/LandingPage.jsx
Component: LandingPage
API calls: none found

File: frontend/src/Pages/Trips/Trips.jsx
Component: Trips
API calls: none found

File: frontend/src/Pages/Cruises/Cruises.jsx
Component: Cruises
API calls: api.get('/cruises')

═══════════════════════════════════════
QUESTION 7: ACTORS AND ROLES
═══════════════════════════════════════
- Role field type: enum ('user_type')
- Possible role values: ['user', 'tour_guide', 'admin'] (default 'user') from 0001_01_01_000000_create_users_table.php
- Role middleware files: UserType.php (assumed from routes handling `usertype`)
- How roles are applied in routes: 
  Route::middleware('usertype:user,admin')->group(function () {
  Route::middleware('usertype:user')->group(function () {
  Route::middleware('usertype:tour_guide')->prefix('guide')->group(function () {
  Route::middleware('usertype:admin')->group(function () {
