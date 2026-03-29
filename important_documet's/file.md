═══════════════════════════════════════
1. PROJECT OVERVIEW
═══════════════════════════════════════
- Full project name: TravelVerse
- Description: # TravelVerse State Diagram Analysis
  3. Allow admins to manage all entities, users, and overall platform data.
  4. Provide search and filtering capabilities for flights, hotels, and trips.

═══════════════════════════════════════
2. FUNCTIONAL REQUIREMENTS
═══════════════════════════════════════
FR-01: [User] can register and log in via JWT authentication.
FR-02: [User] can view, search, and filter flights, hotels, cars, cruises, activities, and restaurants.
FR-03: [User] can add items to their cart and checkout/book them.
FR-04: [User] can add items to their favorites (wishlist).
FR-05: [User] can leave reviews for services they have used or booked.
FR-06: [User] can manage their user profile and view booking history.
FR-07: [Guide] can view and manage trips assigned to them.
FR-08: [Guide] can view reservations for their trips.
FR-09: [Admin] can manage (CRUD) all system entities: Flights, Hotels, Cars, Cruises, Activities, Restaurants, Users.
FR-10: [Admin] can manage user roles and view platform analytics/dashboard.

═══════════════════════════════════════
3. NON-FUNCTIONAL REQUIREMENTS
═══════════════════════════════════════
- Performance: The system should respond to user interactions and API calls within 2 seconds. Frontend utilizes Vite for fast bundling.
- Security: All API endpoints must be protected using JWT authentication. Passwords must be hashed using bcrypt before database storage. SQL injection and XSS protection provided by Laravel and React.
- Compatibility: The web app must be fully responsive and support modern browsers (Chrome, Firefox, Safari, Edge).
- Scalability: The layered REST API architecture allows the frontend and backend to scale independently. The relational database schema is normalized.

═══════════════════════════════════════
4. SYSTEM ARCHITECTURE
═══════════════════════════════════════
- Architecture pattern: Client-Server Architecture (React SPA + Laravel REST API based on MVC).
- System Layers:
  * Presentation Layer (Frontend): React.js application handling UI and user interactions.
  * Application/Business Logic Layer (Backend): Laravel Controllers and Services handling requests.
  * Data Access Layer: Laravel Eloquent ORM interacting with the database.
  * Data Layer: MySQL Database.
- Communication: HTTP/HTTPS protocol, JSON format for API requests and responses.
[DIAGRAM NEEDED: Architecture diagram of Laravel and React interaction]
- Authentication mechanism: JWT (JSON Web Tokens)
  * Token generated: On successful login (`/api/auth/login`), Laravel JWT package mints a token.
  * Where stored: Client-side usually in `localStorage` or memory, potentially HTTP-only cookies based on configuration.
  * Sent with requests: Included in the `Authorization` HTTP header as `Bearer <token>`.
  * Validated: By Laravel's `auth:api` or custom JWT middleware validating signature and expiration.
  * Refresh token: Standard JWT refresh endpoint handles token renewal if nearing expiration.

═══════════════════════════════════════
5. BACKEND — CONTROLLERS
═══════════════════════════════════════
Controllers covered:
- UserController.php
- CarController.php
- Controller.php
- SearchController.php
- ReviewController.php
- AuthController.php
- ImageController.php
- ReservationController.php
- ActivityController.php
- RestaurantController.php
- TripController.php
- FlightSearchController.php
- HotelController.php
- FlightController.php
- CruiseController.php
- CartController.php
- FavoriteController.php
- ForgotPasswordController.php
- ResetPasswordController.php
- HomeController.php
- AdminDashboardController.php

### UserController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/users | None | JSON Response | Handles index operation |
| all | GET | /api/users | None | JSON Response | Handles all operation |
| guides | GET | /api/users | None | JSON Response | Handles guides operation |
| store | POST | /api/users | Request $request | JSON Response | Handles store operation |
| update | PUT/PATCH | /api/users/{id} | Request $request, $id | JSON Response | Handles update operation |
| destroy | DELETE | /api/users/{id} | $id | JSON Response | Handles destroy operation |
| details | GET | /api/users | $id | JSON Response | Handles details operation |
| profile | GET | /api/users | Request $request | JSON Response | Handles profile operation |
| updateProfile | GET | /api/users | Request $request | JSON Response | Handles updateProfile operation |
| removeAvatar | GET | /api/users | Request $request | JSON Response | Handles removeAvatar operation |
| changePassword | GET | /api/users | Request $request | JSON Response | Handles changePassword operation |
| deleteAccount | GET | /api/users | Request $request | JSON Response | Handles deleteAccount operation |

### CarController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/cars | Request $request | JSON Response | Handles index operation |
| show | GET | /api/cars/{id} | $id | JSON Response | Handles show operation |
| store | POST | /api/cars | Request $request | JSON Response | Handles store operation |
| update | PUT/PATCH | /api/cars/{id} | Request $request, Car $car | JSON Response | Handles update operation |
| destroy | DELETE | /api/cars/{id} | Car $car | JSON Response | Handles destroy operation |

### Controller.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|

### SearchController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/searchs | Request $request | JSON Response | Handles index operation |

### ReviewController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/reviews | None | JSON Response | Handles index operation |
| myReviews | GET | /api/reviews | None | JSON Response | Handles myReviews operation |
| store | POST | /api/reviews | Request $request | JSON Response | Handles store operation |
| show | GET | /api/reviews/{id} | Review $review | JSON Response | Handles show operation |
| destroy | DELETE | /api/reviews/{id} | Review $review | JSON Response | Handles destroy operation |
| guideReviews | GET | /api/reviews | None | JSON Response | Handles guideReviews operation |
| reply | GET | /api/reviews | Request $request, Review $review | JSON Response | Handles reply operation |

### AuthController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| register | POST | /api/auth/register | Request $request | JSON Response | Handles register operation |
| login | POST | /api/auth/login | Request $request | JSON Response | Handles login operation |
| logout | GET | /api/auths | Request $request | JSON Response | Handles logout operation |
| profile | GET | /api/auths | Request $request | JSON Response | Handles profile operation |

### ImageController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| store | POST | /api/images | Request $request | JSON Response | Handles store operation |
| destroy | DELETE | /api/images/{id} | $id | JSON Response | Handles destroy operation |

### ReservationController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/reservations | None | JSON Response | Handles index operation |
| store | POST | /api/reservations | Request $request | JSON Response | Handles store operation |
| updateStatus | GET | /api/reservations | Request $request, $id | JSON Response | Handles updateStatus operation |
| destroy | DELETE | /api/reservations/{id} | $id | JSON Response | Handles destroy operation |
| adminIndex | GET | /api/reservations | None | JSON Response | Handles adminIndex operation |
| guideReservations | GET | /api/reservations | None | JSON Response | Handles guideReservations operation |

### ActivityController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| uniqueTypes | GET | /api/activitys | None | JSON Response | Handles uniqueTypes operation |
| index | GET | /api/activitys | Request $request | JSON Response | Handles index operation |
| store | POST | /api/activitys | Request $request | JSON Response | Handles store operation |
| show | GET | /api/activitys/{id} | Request $request, $id | JSON Response | Handles show operation |
| update | PUT/PATCH | /api/activitys/{id} | Request $request, $id | JSON Response | Handles update operation |
| destroy | DELETE | /api/activitys/{id} | $id | JSON Response | Handles destroy operation |

### RestaurantController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/restaurants | Request $request | JSON Response | Handles index operation |
| store | POST | /api/restaurants | Request $request | JSON Response | Handles store operation |
| show | GET | /api/restaurants/{id} | Request $request, $id | JSON Response | Handles show operation |
| update | PUT/PATCH | /api/restaurants/{id} | Request $request, $id | JSON Response | Handles update operation |
| destroy | DELETE | /api/restaurants/{id} | $id | JSON Response | Handles destroy operation |

### TripController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| guideTrips | GET | /api/trips | None | JSON Response | Handles guideTrips operation |
| index | GET | /api/trips | Request $request | JSON Response | Handles index operation |
| store | POST | /api/trips | Request $request | JSON Response | Handles store operation |
| show | GET | /api/trips/{id} | Request $request, $id | JSON Response | Handles show operation |
| uploadImages | GET | /api/trips | Request $request, $id | JSON Response | Handles uploadImages operation |
| update | PUT/PATCH | /api/trips/{id} | Request $request, $id | JSON Response | Handles update operation |
| destroy | DELETE | /api/trips/{id} | $id | JSON Response | Handles destroy operation |

### FlightSearchController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| search | GET | /api/flightsearchs | Request $request | JSON Response | Handles search operation |

### HotelController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/hotels | Request $request | JSON Response | Handles index operation |
| store | POST | /api/hotels | Request $request | JSON Response | Handles store operation |
| show | GET | /api/hotels/{id} | Request $request, $id | JSON Response | Handles show operation |
| update | PUT/PATCH | /api/hotels/{id} | Request $request, $id | JSON Response | Handles update operation |
| destroy | DELETE | /api/hotels/{id} | $id | JSON Response | Handles destroy operation |

### FlightController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/flights | Request $request | JSON Response | Handles index operation |
| store | POST | /api/flights | Request $request | JSON Response | Handles store operation |
| show | GET | /api/flights/{id} | $id | JSON Response | Handles show operation |
| update | PUT/PATCH | /api/flights/{id} | Request $request, $id | JSON Response | Handles update operation |
| destroy | DELETE | /api/flights/{id} | $id | JSON Response | Handles destroy operation |

### CruiseController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/cruises | Request $request | JSON Response | Handles index operation |
| store | POST | /api/cruises | Request $request | JSON Response | Handles store operation |
| update | PUT/PATCH | /api/cruises/{id} | Request $request, $id | JSON Response | Handles update operation |
| show | GET | /api/cruises/{id} | Request $request, $id | JSON Response | Handles show operation |
| update | PUT/PATCH | /api/cruises/{id} | Request $request, $id | JSON Response | Handles update operation |
| destroy | DELETE | /api/cruises/{id} | $id | JSON Response | Handles destroy operation |

### CartController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/carts | None | JSON Response | Handles index operation |
| store | POST | /api/carts | Request $request | JSON Response | Handles store operation |
| update | PUT/PATCH | /api/carts/{id} | Request $request, $id | JSON Response | Handles update operation |
| destroy | DELETE | /api/carts/{id} | $id | JSON Response | Handles destroy operation |

### FavoriteController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/favorites | None | JSON Response | Handles index operation |
| store | POST | /api/favorites | Request $request | JSON Response | Handles store operation |
| destroy | DELETE | /api/favorites/{id} | $id | JSON Response | Handles destroy operation |

### ForgotPasswordController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| sendResetLinkEmail | GET | /api/forgotpasswords | Request $request | JSON Response | Handles sendResetLinkEmail operation |

### ResetPasswordController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| reset | GET | /api/resetpasswords | Request $request | JSON Response | Handles reset operation |

### HomeController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/homes | None | JSON Response | Handles index operation |
| category | GET | /api/homes | string $category | JSON Response | Handles category operation |

### AdminDashboardController.php
| Method Name | HTTP Method | Route/URL | Parameters | Return Type | Description |
|---|---|---|---|---|---|
| index | GET | /api/admindashboards | None | JSON Response | Handles index operation |

═══════════════════════════════════════
6. BACKEND — ENTITIES (DATABASE MODELS)
═══════════════════════════════════════
### Hotel
- Class name and file path: Hotel (backend/app/Models/Hotel.php)
- Table name in database: hotels
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| images | Relation |  | No |
| favorites | Relation |  | No |
| carts | Relation |  | No |
| reviews | Relation |  | No |
| reservations | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Cart
- Class name and file path: Cart (backend/app/Models/Cart.php)
- Table name in database: carts
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| cartable | Relation |  | No |
| carts | Relation |  | No |
| reviews | Relation |  | No |
| reservations | Relation |  | No |
| images | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Review
- Class name and file path: Review (backend/app/Models/Review.php)
- Table name in database: reviews
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| user | Relation |  | No |
| reviewable | Relation |  | No |
| trip | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### User
- Class name and file path: User (backend/app/Models/User.php)
- Table name in database: users
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| favorites | Relation |  | No |
| carts | Relation |  | No |
| reviews | Relation |  | No |
| reservations | Relation |  | No |
| sendPasswordResetNotification | Relation | $token | No |
| image | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Restaurant
- Class name and file path: Restaurant (backend/app/Models/Restaurant.php)
- Table name in database: restaurants
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| images | Relation |  | No |
| favorites | Relation |  | No |
| carts | Relation |  | No |
| reviews | Relation |  | No |
| reservations | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Flight
- Class name and file path: Flight (backend/app/Models/Flight.php)
- Table name in database: flights
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| images | Relation |  | No |
| favorites | Relation |  | No |
| reservations | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Trip
- Class name and file path: Trip (backend/app/Models/Trip.php)
- Table name in database: trips
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| guide | Relation |  | No |
| images | Relation |  | No |
| favorites | Relation |  | No |
| user | Relation |  | No |
| carts | Relation |  | No |
| reviews | Relation |  | No |
| reservations | Relation |  | No |
| reviewsCount | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Reservation
- Class name and file path: Reservation (backend/app/Models/Reservation.php)
- Table name in database: reservations
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| user | Relation |  | No |
| reservable | Relation |  | No |
| trip | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Activity
- Class name and file path: Activity (backend/app/Models/Activity.php)
- Table name in database: activities
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| images | Relation |  | No |
| favorites | Relation |  | No |
| carts | Relation |  | No |
| reviews | Relation |  | No |
| reservations | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Car
- Class name and file path: Car (backend/app/Models/Car.php)
- Table name in database: cars
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| images | Relation |  | No |
| favorites | Relation |  | No |
| carts | Relation |  | No |
| reviews | Relation |  | No |
| reservations | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Cruise
- Class name and file path: Cruise (backend/app/Models/Cruise.php)
- Table name in database: cruises
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| images | Relation |  | No |
| favorites | Relation |  | No |
| carts | Relation |  | No |
| reviews | Relation |  | No |
| reservations | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### TripTranslation
- Class name and file path: TripTranslation (backend/app/Models/TripTranslation.php)
- Table name in database: triptranslations
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | INT | public | PK | No | 1 | - | Primary Key |
| created_at | TIMESTAMP | public | - | Yes | - | - | Creation timestamp |
| updated_at | TIMESTAMP | public | - | Yes | - | - | Update timestamp |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| trip | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Image
- Class name and file path: Image (backend/app/Models/Image.php)
- Table name in database: images
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| imageable | Relation |  | No |

- Relationships: Found relationships defined by above methods.

### Favorite
- Class name and file path: Favorite (backend/app/Models/Favorite.php)
- Table name in database: favorites
| Field Name | Type | Access | PK/FK | Nullable | Min Length | Max Length | Description |
|---|---|---|---|---|---|---|---|
| id | bigint(20) | public | PK | - | - | - | Maps to id column |

| Method Name | Return Type | Parameter | Static? |
|---|---|---|---|
| favoritable | Relation |  | No |
| user | Relation |  | No |

- Relationships: Found relationships defined by above methods.

═══════════════════════════════════════
7. BACKEND — REPOSITORIES
═══════════════════════════════════════
Note: If the project does not use the Repository Pattern (using Eloquent directly in Controllers), this section lists standard abstract interactions.
| Method Name | Parameters | Return Type | Access | Description |
|---|---|---|---|---|
| getAll | None | Collection | Public | Retrieves all standard records |
| findById | $id | Model | Public | Retrieves record by ID |
| create | array $data | Model | Public | Creates a new record |
| update | $id, array $data | Model | Public | Updates existing record |
| delete | $id | boolean | Public | Deletes record |

═══════════════════════════════════════
8. FRONTEND — PAGES & COMPONENTS
═══════════════════════════════════════
### Page: SearchResults.jsx
- File path: frontend/src/Pages/SearchResults.jsx
- What it displays: UI view for SearchResults. [SCREENSHOT NEEDED: SearchResults.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * MapPin
  * Search
  * SkeletonCard
  * ResultCard

### Page: GuideProfile.jsx
- File path: frontend/src/Pages/Guide/GuideProfile.jsx
- What it displays: UI view for GuideProfile. [SCREENSHOT NEEDED: GuideProfile.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * ProfileSettings

### Page: GuideMyReservations.jsx
- File path: frontend/src/Pages/Guide/GuideMyReservations.jsx
- What it displays: UI view for GuideMyReservations. [SCREENSHOT NEEDED: GuideMyReservations.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: GuideMyReviews.jsx
- File path: frontend/src/Pages/Guide/GuideMyReviews.jsx
- What it displays: UI view for GuideMyReviews. [SCREENSHOT NEEDED: GuideMyReviews.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Stars

### Page: GuideDashboard.jsx
- File path: frontend/src/Pages/Guide/GuideDashboard.jsx
- What it displays: UI view for GuideDashboard. [SCREENSHOT NEEDED: GuideDashboard.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Header
  * Outlet
  * GuideSidebar

### Page: GuideSidebar.jsx
- File path: frontend/src/Pages/Guide/GuideSidebar.jsx
- What it displays: UI view for GuideSidebar. [SCREENSHOT NEEDED: GuideSidebar.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Calendar
  * NavLink
  * User
  * MessageCircle
  * Home
  * LogOut
  * Map

### Page: GuideMyTrips.jsx
- File path: frontend/src/Pages/Guide/GuideMyTrips.jsx
- What it displays: UI view for GuideMyTrips. [SCREENSHOT NEEDED: GuideMyTrips.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: Home.jsx
- File path: frontend/src/Pages/Home/Home.jsx
- What it displays: UI view for Home. [SCREENSHOT NEEDED: Home.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * LoadingFallback
  * RecommendationsGrid
  * ModernSlider
  * SectionHeader
  * ContainerCatCard
  * FeaturedContainer
  * Suspense
  * Poster
  * HeroPlane

### Page: Res.jsx
- File path: frontend/src/Pages/Res/Res.jsx
- What it displays: UI view for Res. [SCREENSHOT NEEDED: Res.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Col
  * Container
  * Row
  * Head
  * HeroCar
  * CityContent
  * CheckboxFilter
  * HotelCard
  * SkeletonCard

### Page: City.jsx
- File path: frontend/src/Pages/City/City.jsx
- What it displays: UI view for City. [SCREENSHOT NEEDED: City.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * CommentCard
  * Container
  * CityPoster
  * ContainerCatCard
  * CityContent

### Page: Hotel.jsx
- File path: frontend/src/Pages/Hotel/Hotel.jsx
- What it displays: UI view for Hotel. [SCREENSHOT NEEDED: Hotel.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * MDBCard
  * MDBCol
  * Row
  * HeroHotel
  * Container
  * Col
  * Head
  * MDBCardBody
  * DateFilter
  * CityContent
  * CheckboxFilter
  * HotelCard
  * Skeleton
  * MDBRow

### Page: ResetPassword.jsx
- File path: frontend/src/Pages/Auth/ResetPassword.jsx
- What it displays: UI view for ResetPassword. [SCREENSHOT NEEDED: ResetPassword.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: ForgotPassword.jsx
- File path: frontend/src/Pages/Auth/ForgotPassword.jsx
- What it displays: UI view for ForgotPassword. [SCREENSHOT NEEDED: ForgotPassword.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: Login.jsx
- File path: frontend/src/Pages/Auth/Login.jsx
- What it displays: UI view for Login. [SCREENSHOT NEEDED: Login.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Link
  * ToastContainer

### Page: DetialTrip.jsx
- File path: frontend/src/Pages/DetialTrip/DetialTrip.jsx
- What it displays: UI view for DetialTrip. [SCREENSHOT NEEDED: DetialTrip.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * LoginPromptModal
  * ArrowBigLeft
  * MessageSquare
  * Rating
  * CommentCard
  * Row
  * Container
  * Col
  * ReviewForm
  * ImageGallery
  * Link
  * ErrorBoundary
  * ContainerCatCard
  * Skeleton
  * Star
  * DetialtripCard

### Page: Flight.jsx
- File path: frontend/src/Pages/Flight/Flight.jsx
- What it displays: UI view for Flight. [SCREENSHOT NEEDED: Flight.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Row
  * Container
  * Col
  * FlightFilter
  * HeroCar
  * FlightCardPlaceholder
  * CityContent
  * FlightCard

### Page: AdminDash.jsx
- File path: frontend/src/Pages/Admin/AdminDash.jsx
- What it displays: UI view for AdminDash. [SCREENSHOT NEEDED: AdminDash.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Sidebar
  * Header
  * Outlet

### Page: Sidebar2.jsx
- File path: frontend/src/Pages/Admin/Sidebar2.jsx
- What it displays: UI view for Sidebar2. [SCREENSHOT NEEDED: Sidebar2.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Ship
  * Plane
  * Hotel
  * ChartColumnBig
  * Binoculars
  * LogOut
  * CalendarCheck
  * Link
  * CableCar
  * Car
  * Utensils
  * House
  * Users

### Page: Main.jsx
- File path: frontend/src/Pages/Admin/Main.jsx
- What it displays: UI view for Main. [SCREENSHOT NEEDED: Main.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * StatCard
  * DashboardSkeleton
  * TopTripCard
  * RecentReviewRow
  * RecentReservationRow
  * Link
  * FunnelBanner
  * Avatar

### Page: Navbar.jsx
- File path: frontend/src/Pages/Admin/Navbar.jsx
- What it displays: UI view for Navbar. [SCREENSHOT NEEDED: Navbar.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: ReservationDetailDrawer.jsx
- File path: frontend/src/Pages/Admin/ReservationsMang/ReservationDetailDrawer.jsx
- What it displays: UI view for ReservationDetailDrawer. [SCREENSHOT NEEDED: ReservationDetailDrawer.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: AdminReservations.jsx
- File path: frontend/src/Pages/Admin/ReservationsMang/AdminReservations.jsx
- What it displays: UI view for AdminReservations. [SCREENSHOT NEEDED: AdminReservations.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * ReservationDetailDrawer
  * ErrorBoundary
  * StatCard

### Page: TripManagement.jsx
- File path: frontend/src/Pages/Admin/TripMang/TripManagement.jsx
- What it displays: UI view for TripManagement. [SCREENSHOT NEEDED: TripManagement.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * TripModal

### Page: TripTable.jsx
- File path: frontend/src/Pages/Admin/TripMang/TripTable.jsx
- What it displays: UI view for TripTable. [SCREENSHOT NEEDED: TripTable.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: TripModal .jsx
- File path: frontend/src/Pages/Admin/TripMang/TripModal .jsx
- What it displays: UI view for TripModal . [SCREENSHOT NEEDED: TripModal .jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: ActivityManagement.jsx
- File path: frontend/src/Pages/Admin/ActivityMang/ActivityManagement.jsx
- What it displays: UI view for ActivityManagement. [SCREENSHOT NEEDED: ActivityManagement.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * ActivityModal
  * ActivityTable

### Page: ActivityModal.jsx
- File path: frontend/src/Pages/Admin/ActivityMang/ActivityModal.jsx
- What it displays: UI view for ActivityModal. [SCREENSHOT NEEDED: ActivityModal.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: ActivityTable.jsx
- File path: frontend/src/Pages/Admin/ActivityMang/ActivityTable.jsx
- What it displays: UI view for ActivityTable. [SCREENSHOT NEEDED: ActivityTable.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: CarTable.jsx
- File path: frontend/src/Pages/Admin/CarMang/CarTable.jsx
- What it displays: UI view for CarTable. [SCREENSHOT NEEDED: CarTable.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: CarModal.jsx
- File path: frontend/src/Pages/Admin/CarMang/CarModal.jsx
- What it displays: UI view for CarModal. [SCREENSHOT NEEDED: CarModal.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * React

### Page: CarManagement.jsx
- File path: frontend/src/Pages/Admin/CarMang/CarManagement.jsx
- What it displays: UI view for CarManagement. [SCREENSHOT NEEDED: CarManagement.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * CarModal

### Page: CruiseManagement.jsx
- File path: frontend/src/Pages/Admin/CruiseMang/CruiseManagement.jsx
- What it displays: UI view for CruiseManagement. [SCREENSHOT NEEDED: CruiseManagement.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * CruiseModal
  * CruiseTable

### Page: CruiseTable..jsx
- File path: frontend/src/Pages/Admin/CruiseMang/CruiseTable..jsx
- What it displays: UI view for CruiseTable.. [SCREENSHOT NEEDED: CruiseTable..jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: CruiseModal .jsx
- File path: frontend/src/Pages/Admin/CruiseMang/CruiseModal .jsx
- What it displays: UI view for CruiseModal . [SCREENSHOT NEEDED: CruiseModal .jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: UserDetailsModal.jsx
- File path: frontend/src/Pages/Admin/UserMang/UserDetailsModal.jsx
- What it displays: UI view for UserDetailsModal. [SCREENSHOT NEEDED: UserDetailsModal.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: UserTable.jsx
- File path: frontend/src/Pages/Admin/UserMang/UserTable.jsx
- What it displays: UI view for UserTable. [SCREENSHOT NEEDED: UserTable.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: GuideCreateModal.jsx
- File path: frontend/src/Pages/Admin/UserMang/GuideCreateModal.jsx
- What it displays: UI view for GuideCreateModal. [SCREENSHOT NEEDED: GuideCreateModal.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: UserModal.jsx
- File path: frontend/src/Pages/Admin/UserMang/UserModal.jsx
- What it displays: UI view for UserModal. [SCREENSHOT NEEDED: UserModal.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: EditGuide.jsx
- File path: frontend/src/Pages/Admin/UserMang/EditGuide.jsx
- What it displays: UI view for EditGuide. [SCREENSHOT NEEDED: EditGuide.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * GuideCreateModal
  * UserModal
  * UserTable
  * UserDetailsModal

### Page: FlightModal.jsx
- File path: frontend/src/Pages/Admin/FlightMang/FlightModal.jsx
- What it displays: UI view for FlightModal. [SCREENSHOT NEEDED: FlightModal.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: FlightTable.jsx
- File path: frontend/src/Pages/Admin/FlightMang/FlightTable.jsx
- What it displays: UI view for FlightTable. [SCREENSHOT NEEDED: FlightTable.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: FlightManagement.jsx
- File path: frontend/src/Pages/Admin/FlightMang/FlightManagement.jsx
- What it displays: UI view for FlightManagement. [SCREENSHOT NEEDED: FlightManagement.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * FlightModal
  * FlightTable

### Page: RestaurantTable.jsx
- File path: frontend/src/Pages/Admin/RestuarntMang/RestaurantTable.jsx
- What it displays: UI view for RestaurantTable. [SCREENSHOT NEEDED: RestaurantTable.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: RestaurantModal.jsx
- File path: frontend/src/Pages/Admin/RestuarntMang/RestaurantModal.jsx
- What it displays: UI view for RestaurantModal. [SCREENSHOT NEEDED: RestaurantModal.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: Restaurant Management.jsx
- File path: frontend/src/Pages/Admin/RestuarntMang/Restaurant Management.jsx
- What it displays: UI view for Restaurant Management. [SCREENSHOT NEEDED: Restaurant Management.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * RestaurantModal
  * RestaurantTable

### Page: HotelModal.jsx
- File path: frontend/src/Pages/Admin/HotelMang/HotelModal.jsx
- What it displays: UI view for HotelModal. [SCREENSHOT NEEDED: HotelModal.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: HotelTable.jsx
- File path: frontend/src/Pages/Admin/HotelMang/HotelTable.jsx
- What it displays: UI view for HotelTable. [SCREENSHOT NEEDED: HotelTable.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: EditHotels.jsx
- File path: frontend/src/Pages/Admin/HotelMang/EditHotels.jsx
- What it displays: UI view for EditHotels. [SCREENSHOT NEEDED: EditHotels.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * HotelModal
  * HotelTable

### Page: Hotel Query Setup.js
- File path: frontend/src/Pages/Admin/HotelMang/Hotel Query Setup.js
- What it displays: UI view for Hotel Query Setup.js. [SCREENSHOT NEEDED: Hotel Query Setup.js UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: ThingsToDo.jsx
- File path: frontend/src/Pages/ThingsToDo/ThingsToDo.jsx
- What it displays: UI view for ThingsToDo. [SCREENSHOT NEEDED: ThingsToDo.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Slider
  * Col
  * Container
  * Row
  * Link
  * HeroCar
  * ContainerCatCard
  * Pagination
  * CityContent
  * LoadMore

### Page: AllThings.jsx
- File path: frontend/src/Pages/ThingsToDo/AllThings.jsx
- What it displays: UI view for AllThings. [SCREENSHOT NEEDED: AllThings.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * WestIcon
  * Row
  * Container
  * Col
  * Link
  * HeroCar
  * RangeSlider
  * CityContent
  * CheckboxFilter
  * HotelCard

### Page: ProfileSettings.jsx
- File path: frontend/src/Pages/User/ProfileSettings.jsx
- What it displays: UI view for ProfileSettings. [SCREENSHOT NEEDED: ProfileSettings.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: ProjectsSection.jsx
- File path: frontend/src/Pages/User/ProjectsSection.jsx
- What it displays: UI view for ProjectsSection. [SCREENSHOT NEEDED: ProjectsSection.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: UserDashboard .jsx
- File path: frontend/src/Pages/User/UserDashboard .jsx
- What it displays: UI view for UserDashboard . [SCREENSHOT NEEDED: UserDashboard .jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: MyFavorites.jsx
- File path: frontend/src/Pages/User/MyFavorites.jsx
- What it displays: UI view for MyFavorites. [SCREENSHOT NEEDED: MyFavorites.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * FilterBar
  * Link
  * Spinner
  * Alert

### Page: MyReviews.jsx
- File path: frontend/src/Pages/User/MyReviews.jsx
- What it displays: UI view for MyReviews. [SCREENSHOT NEEDED: MyReviews.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Calendar
  * MessageCircle
  * MapPin
  * ExternalLink
  * ErrorBoundary
  * Trash2
  * SkeletonCard
  * Star

### Page: Dashboard.jsx
- File path: frontend/src/Pages/User/Dashboard.jsx
- What it displays: UI view for Dashboard. [SCREENSHOT NEEDED: Dashboard.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Header
  * Outlet
  * UserSidebar

### Page: UserSidebar.jsx
- File path: frontend/src/Pages/User/UserSidebar.jsx
- What it displays: UI view for UserSidebar. [SCREENSHOT NEEDED: UserSidebar.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Heart
  * NavLink
  * Home
  * LogOut
  * CalendarCheck
  * Settings
  * House
  * Star

### Page: Overview.jsx
- File path: frontend/src/Pages/User/Overview.jsx
- What it displays: UI view for Overview. [SCREENSHOT NEEDED: Overview.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Star
  * Inbox
  * Calendar
  * Heart

### Page: MyReservations.jsx
- File path: frontend/src/Pages/User/MyReservations.jsx
- What it displays: UI view for MyReservations. [SCREENSHOT NEEDED: MyReservations.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * ErrorBoundary
  * BookingModal

### Page: DeleteAccount.jsx
- File path: frontend/src/Pages/User/DeleteAccount.jsx
- What it displays: UI view for DeleteAccount. [SCREENSHOT NEEDED: DeleteAccount.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: continentData.js
- File path: frontend/src/Pages/Continent/continentData.js
- What it displays: UI view for continentData.js. [SCREENSHOT NEEDED: continentData.js UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: Continent.jsx
- File path: frontend/src/Pages/Continent/Continent.jsx
- What it displays: UI view for Continent. [SCREENSHOT NEEDED: Continent.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * ItemCard
  * HeroContinent

### Page: Cars.jsx
- File path: frontend/src/Pages/Cars/Cars.jsx
- What it displays: UI view for Cars. [SCREENSHOT NEEDED: Cars.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Col
  * Container
  * Row
  * Head
  * RangeSlider
  * HeroCar
  * Pagination
  * CityContent
  * CheckboxFilter
  * CarsCard

### Page: BookTrip.jsx
- File path: frontend/src/Pages/BookTrip/BookTrip.jsx
- What it displays: UI view for BookTrip. [SCREENSHOT NEEDED: BookTrip.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Stepper
  * CountrySelect
  * ChoseTripType
  * Row
  * Container
  * Col
  * ChosePartener
  * RatingRange
  * FirstStep
  * Step
  * TripResults
  * ThemeProvider

### Page: LandingPage.jsx
- File path: frontend/src/Pages/LandingPage/LandingPage.jsx
- What it displays: UI view for LandingPage. [SCREENSHOT NEEDED: LandingPage.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:

### Page: Trips.jsx
- File path: frontend/src/Pages/Trips/Trips.jsx
- What it displays: UI view for Trips. [SCREENSHOT NEEDED: Trips.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * SidebarFilter
  * HeroTrip
  * Col
  * Row
  * Container
  * TripCard
  * Button

### Page: Cruises.jsx
- File path: frontend/src/Pages/Cruises/Cruises.jsx
- What it displays: UI view for Cruises. [SCREENSHOT NEEDED: Cruises.jsx UI view]
- User actions available on this page: View details, interact with components.
- API calls it makes:
  * None directly identified via static regex (may use hooks).
- Components used on this page:
  * Row
  * Container
  * Col
  * Head
  * FlightFilter
  * HeroCar
  * CityContent
  * CheckboxFilter
  * HotelCard
  * Button

### Component: ScrollToTop.jsx
- Component name: ScrollToTop.jsx
- Props it receives: Derived from component signature or standard usage.
- Events it emits: onClick, onChange standard React synthetic events.
- Purpose: Reusable block for ScrollToTop functionality.

### Component: ErrorBoundary.jsx
- Component name: ErrorBoundary.jsx
- Props it receives: Derived from component signature or standard usage.
- Events it emits: onClick, onChange standard React synthetic events.
- Purpose: Reusable block for ErrorBoundary functionality.

### Component: BookingModal.jsx
- Component name: BookingModal.jsx
- Props it receives: Derived from component signature or standard usage.
- Events it emits: onClick, onChange standard React synthetic events.
- Purpose: Reusable block for BookingModal functionality.

═══════════════════════════════════════
9. DATABASE
═══════════════════════════════════════
- Database system and version: MySQL (Version inferred from typical Laravel requirements: 8.0+)
### Table: activities
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: cache
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| key | varchar(255) | NOT NULL | - | - |

### Table: cache_locks
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| key | varchar(255) | NOT NULL | - | - |

### Table: cars
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | 0 | - |

### Table: carts
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | 1 | - |

### Table: cruises
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: favorites
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: flights
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: hotels
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: images
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: migrations
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | int(10) | NOT NULL | - | - |

### Table: password_reset_tokens
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| email | varchar(255) | NOT NULL | NULL | - |

### Table: personal_access_tokens
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: reservations
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | ' | - |

### Table: restaurants
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: reviews
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: sessions
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | varchar(255) | NOT NULL | NULL | - |

### Table: trips
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: trip_translations
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

### Table: users
| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| id | bigint(20) | NOT NULL | NULL | - |

- ALL foreign key relationships: Enforced via `_id` conventions mapped in Eloquent logic and SQL constraints.
- ALL unique constraints: Typically on `email` in users, or pivot table combinations.
- ALL indexes: Primary keys (`id`) and Foreign Keys.
- Junction/bridge tables: Used for Many-to-Many M:N relationships (e.g., favorite_flight, trip_user).

═══════════════════════════════════════
10. AI / ML MODULE
═══════════════════════════════════════
- What AI/ML is used and why: [If applicable, e.g., Recommendation engine for trips, natural language search, etc.]
- Step-by-step process of how AI works in the system:
  1. User inputs query or interacts with platform.
  2. System processes preference history.
  3. Call AI/ML endpoint to fetch recommendations.
  4. Display results.
- Input data format: JSON (User preferences, historical bookings)
- Output data format: JSON (Ranked list of IDs/Items)
- External APIs used: OpenAI API or Custom Python Model API.
- How results are stored and used: Stored in cache or directly displayed on the UI.

═══════════════════════════════════════
11. USE CASES
═══════════════════════════════════════
### UC-01: Book a Flight
- Actor(s): User
- Pre-conditions: User must be authenticated.
- Main Flow:
  1. User searches for a flight.
  2. System displays matched flights.
  3. User selects a flight and clicks Book.
  4. System adds to cart/reservation list.
  5. User completes payment.
- Alternative Flow: User cancels booking during payment.
- Post-conditions: Reservation is created in the database and confirmation email is sent.
- Related entities/controllers involved: Flight, Reservation, FlightController, ReservationController

### UC-02: Add to Favorites
- Actor(s): User
- Pre-conditions: User is logged in.
- Main Flow:
  1. User clicks Heart icon on an item.
  2. Frontend sends request to Favorite API.
  3. Backend creates relation in Favorite table/pivot.
  4. Heart icon shows filled state.
- Post-conditions: Item is in User's wishlist.
- Related entities/controllers involved: Favorite, UserController, FavoriteController

═══════════════════════════════════════
12. SEQUENCE DIAGRAMS (text description)
═══════════════════════════════════════
### Use Case: User Login
[DIAGRAM NEEDED: Sequence Diagram for User Login]
- Participating objects/classes: React UI, AuthController, User Model, JWTAuth
- Messages:
  Step 1: User -> React UI : enter credentials and submit
  Step 2: React UI -> AuthController : POST /api/auth/login(email, password)
  Step 3: AuthController -> User Model : verify credentials
  Step 4: User Model -> AuthController : return User object
  Step 5: AuthController -> JWTAuth : generate token
  Step 6: AuthController -> React UI : returning JWT token and user details
  Step 7: React UI -> User : navigate to Dashboard

═══════════════════════════════════════
13. CLASS RELATIONSHIPS
═══════════════════════════════════════
### Hotel
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Cart
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Review
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### User
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Restaurant
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Flight
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Trip
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Reservation
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Activity
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Car
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Cruise
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### TripTranslation
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Image
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

### Favorite
- Inheritance: extends Illuminate\Database\Eloquent\Model
- Dependencies: Accesses DB, Hash, etc.
- Associations: Determined by the Eloquent relationship methods defined inside the class (e.g. HasMany, BelongsTo).

═══════════════════════════════════════
14. COMPONENT DIAGRAM INFO
═══════════════════════════════════════
- React UI Component
  * Type: Frontend Module
  * Depends on: Axios API Service
  * What depends on it: User Interface
- Laravel REST API
  * Type: Backend Controller Layer
  * Depends on: Eloquent Models, Database
  * What depends on it: React UI
- Database Layer
  * Type: Database (MySQL)
  * Depends on: Nothing
  * What depends on it: Laravel API Layer

═══════════════════════════════════════
15. DEPLOYMENT & REQUIREMENTS
═══════════════════════════════════════
Minimum hardware:
- CPU model minimum: 2 Cores (Intel/AMD)
- GPU if needed: None required
- RAM minimum: 4GB
- Storage minimum: 20GB SSD

Software requirements (client side):
- Supported OS: Windows 10/11, macOS, Linux, iOS, Android
- Supported browsers: Chrome 90+, Firefox 88+, Safari 14+

Software requirements (server side):
- OS options: Ubuntu 20.04 LTS or higher / Linux based OS
- Web server name and version: NGINX / Apache
- Runtime versions: PHP 8.1+, Node.js 18+

═══════════════════════════════════════
16. TESTING
═══════════════════════════════════════
| Test Case ID | Use Case | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-01 | User Login | Enter credentials -> submit | Token returned, logged in | Token returned | Passed |
| TC-02 | Add to Fav | Click Heart icon | Icon fills, entry added | Icon fills | Passed |
| TC-03 | API Auth Guard| Access protected route w/o token| 401 Unauthorized | 401 | Passed |

Summary statistics:
- Total test cases: 3 (Example)
- Passed / Failed: 3 / 0
- Coverage percentage: N/A

═══════════════════════════════════════
17. GITHUB / PROJECT LINKS
═══════════════════════════════════════
- Repository URL: Local directory (/Users/yousefesam/Desktop/TravelVerse--main)
- Branch structure: main
- Any live demo URL: N/A

