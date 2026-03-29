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
use App\Http\Controllers\ImageProxyController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    ImageController,
    TripController,
    TripPlanController,
    TripPlanItemController,
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
    Route::middleware('throttle:5,1')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    Route::middleware('throttle:3,1')->group(function () {
        Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
        Route::post('/reset-password', [ResetPasswordController::class, 'reset']);
    });
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
Route::get('/image-proxy', [ImageProxyController::class, 'fetch']);

// ── Home page aggregated data (public) ───────────────────────────────────────
// Returns latest 8 items of every category in one request.
// GET /api/home
Route::get('/home', [HomeController::class, 'index']);
// Returns a single category only.
// GET /api/home/{category}  →  activities | trips | hotels | restaurants
Route::get('/home/{category}', [HomeController::class, 'category']);




// 3. المسارات التي تتطلب مصادقة
Route::middleware(['auth:sanctum'])->group(function () {
    // Auth/profile aliases (keep both for backward compatibility)
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/user', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Account management
    Route::post('/update-profile', [UserController::class, 'updateProfile']);
    Route::delete('/profile/avatar', [UserController::class, 'removeAvatar']);
    Route::post('/change-password', [UserController::class, 'changePassword']);
    Route::delete('/delete-account', [UserController::class, 'deleteAccount']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    // 4. المسارات الخاصة بالمستخدم العادي والمسؤول
    Route::middleware('usertype:user,admin')->group(function () {
        // Favorites
        Route::get('/favorites', [FavoriteController::class, 'index']);
        Route::post('/favorites', [FavoriteController::class, 'store']);
        Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy']);

        // Reviews (users/admin)
        Route::get('/my-reviews', [ReviewController::class, 'myReviews']);
        Route::post('/reviews', [ReviewController::class, 'store']);
    });

    // Reservations - user only (read/store)
    Route::middleware('usertype:user')->group(function () {
        Route::get('/reservations', [ReservationController::class, 'index']);
        Route::post('/reservations', [ReservationController::class, 'store']);
        Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);
    });

    // Reservations - shared (status update)
    Route::patch('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);
    
    // Trip plans
    Route::middleware('usertype:user')->group(function () {
        Route::apiResource('trip-plans', TripPlanController::class);
        Route::post('trip-plans/{plan}/items', [TripPlanItemController::class, 'store']);
        Route::put('trip-plan-items/{item}', [TripPlanItemController::class, 'update']);
        Route::delete('trip-plan-items/{item}', [TripPlanItemController::class, 'destroy']);
    });

    Route::middleware('usertype:tour_guide')->prefix('guide')->group(function () {
        // Trips (own trips only)
        Route::get('/trips', [TripController::class, 'guideTrips']);
        Route::post('/trips', [TripController::class, 'store']);
        Route::put('/trips/{trip}', [TripController::class, 'update']);
        Route::delete('/trips/{trip}', [TripController::class, 'destroy']);

        // Reservations (on own trips only)
        Route::get('/reservations', [ReservationController::class, 'guideReservations']);
        Route::patch('/reservations/{id}/attendance', [ReservationController::class, 'updateAttendance']);

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

        // Trips (admin-owned endpoints)
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

        // Flights
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
