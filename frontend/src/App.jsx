import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProfile } from './Radux/authSlice.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop.jsx';

import { hasValidToken } from './Utility/authToken.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './Utility/Navbar/Navbar.jsx';
import Footer from './Utility/Footer/Footer.jsx';

// Lazy load pages for better performance
const Home = lazy(() => import('./Pages/Home/Home.jsx'));
const Continent = lazy(() => import('./Pages/Continent/Continent.jsx'));
const City = lazy(() => import('./Pages/City/City.jsx'));
const Trips = lazy(() => import('./Pages/Trips/Trips.jsx'));
const DetialTrip = lazy(() => import('./Pages/DetialTrip/DetialTrip.jsx'));
const Hotel = lazy(() => import('./Pages/Hotel/Hotel.jsx'));
const Cars = lazy(() => import('./Pages/Cars/Cars.jsx').then(m => ({ default: m.Cars })));
const ThingsToDo = lazy(() => import('./Pages/ThingsToDo/ThingsToDo.jsx').then(m => ({ default: m.ThingsToDo })));
const AllThings = lazy(() => import('./Pages/ThingsToDo/AllThings.jsx').then(m => ({ default: m.AllThings })));
const Flight = lazy(() => import('./Pages/Flight/Flight.jsx').then(m => ({ default: m.Flight })));
const Cruises = lazy(() => import('./Pages/Cruises/Cruises.jsx').then(m => ({ default: m.Cruises })));
const Res = lazy(() => import('./Pages/Res/Res.jsx'));
const Login = lazy(() => import('./Pages/Auth/Login.jsx'));
const BookTrip = lazy(() => import('./Pages/BookTrip/BookTrip.jsx').then(m => ({ default: m.BookTrip })));
const UserManagement = lazy(() => import('./Pages/Admin/UserMang/EditGuide.jsx'));
const Main = lazy(() => import('./Pages/Admin/Main.jsx'));
const AdminDash = lazy(() => import('./Pages/Admin/AdminDash.jsx'));
const HotelManagement = lazy(() => import('./Pages/Admin/HotelMang/EditHotels.jsx'));
const RestaurantManagement = lazy(() => import('./Pages/Admin/RestuarntMang/Restaurant Management.jsx'));
const ActivityManagement = lazy(() => import('./Pages/Admin/ActivityMang/ActivityManagement.jsx'));
const CarManagement = lazy(() => import('./Pages/Admin/CarMang/CarManagement.jsx'));
const CruiseManagement = lazy(() => import('./Pages/Admin/CruiseMang/CruiseManagement.jsx'));
const TripManagement = lazy(() => import('./Pages/Admin/TripMang/TripManagement.jsx'));
const FlightManagement = lazy(() => import('./Pages/Admin/FlightMang/FlightManagement.jsx'));
const AdminReservations = lazy(() => import('./Pages/Admin/ReservationsMang/AdminReservations.jsx'));
const GuideDashboard = lazy(() => import('./Pages/Guide/GuideDashboard.jsx'));
const GuideMyTrips = lazy(() => import('./Pages/Guide/GuideMyTrips.jsx'));
const GuideMyReservations = lazy(() => import('./Pages/Guide/GuideMyReservations.jsx'));
const GuideMyReviews = lazy(() => import('./Pages/Guide/GuideMyReviews.jsx'));
const GuideProfile = lazy(() => import('./Pages/Guide/GuideProfile.jsx'));

const Dashboard = lazy(() => import('./Pages/User/Dashboard.jsx'));
const Overview = lazy(() => import('./Pages/User/Overview.jsx'));
const MyReserv = lazy(() => import('./Pages/User/MyReservations.jsx'));
const MyFavorites = lazy(() => import('./Pages/User/MyFavorites.jsx'));
const UserProfileSettings = lazy(() => import('./Pages/User/ProfileSettings.jsx'));
const UserReviews = lazy(() => import('./Pages/User/MyReviews.jsx'));
const DeleteAccount = lazy(() => import('./Pages/User/DeleteAccount.jsx'));
const DetialItem = lazy(() => import('./Pages/DetialTrip/DetialTrip.jsx'));
const Restaurants = lazy(() => import('./Pages/Res/Res.jsx'));
const SearchResults = lazy(() => import('./Pages/SearchResults.jsx'));

import RedirectByRole from './RedirectByRole.jsx';
import 'react-toastify/dist/ReactToastify.css';

// Protected Routes
import RoleProtectedRoute from './RoleProtectedRoute.jsx';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.jsx';

const ForgotPassword = lazy(() => import('./Pages/Auth/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./Pages/Auth/ResetPassword.jsx'));
import { ToastContainer } from 'react-toastify';
import { setCurrency } from './Radux/Slices/currencySlice.js';


// ... استيراد كل الصفحات والمكونات

const DefaultLayout = () => (
  <>
    <Header />
    <main className="pt-16! min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>

);

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    const savedCurrency = localStorage.getItem("currency") || "USD";
    dispatch(setCurrency(savedCurrency));
  }, []);

  useEffect(() => {
    if (!user && hasValidToken()) {
      dispatch(getProfile());
    }
  }, [dispatch, user]);


  return (
    <>
      <Router>
        <ScrollToTop />
        <RedirectByRole />
        <Suspense fallback={
          <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }>
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* 🔒 admin routes */}
              <Route path="/admin" element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <AdminDash />
                </RoleProtectedRoute>
              }>
                <Route index element={<Main />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="flights" element={<FlightManagement />} />
                <Route path="trips" element={<TripManagement />} />
                <Route path="hotel" element={<HotelManagement />} />
                <Route path="restaurants" element={<RestaurantManagement />} />
                <Route path="activities" element={<ActivityManagement />} />
                <Route path="cars" element={<CarManagement />} />
                <Route path="cruises" element={<CruiseManagement />} />
                <Route path="reservations" element={<AdminReservations />} />
              </Route>



              {/* 🔒 user routes */}
              <Route path="/user" element={
                <RoleProtectedRoute allowedRoles={['user']}>
                  <Dashboard />
                </RoleProtectedRoute>
              }>
                <Route index element={<Overview />} />
                <Route path="reservations" element={<MyReserv />} />
                <Route path="favorites" element={<MyFavorites />} />
                <Route path="profile" element={<UserProfileSettings />} />
                <Route path="reviews" element={<UserReviews />} />
              </Route>

              <Route element={<RoleProtectedRoute allowedRoles={['tour_guide']} />}>
                <Route path="/guide" element={<GuideDashboard />}>
                  <Route index element={<Navigate to="trips" replace />} />
                  <Route path="trips" element={<GuideMyTrips />} />
                  <Route path="reservations" element={<GuideMyReservations />} />
                  <Route path="reviews" element={<GuideMyReviews />} />
                  <Route path="profile" element={<GuideProfile />} />
                </Route>
              </Route>

              {/* 🌍 public routes */}
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/destination/:continent" element={<Continent />} />
                <Route path="/city/:cityName" element={<City />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/TravelBook" element={<BookTrip />} />
                <Route path="/itemdetail/:id" element={<DetialItem />} />
                <Route path="/hotel/:cityName" element={<Hotel />} />
                <Route path="/car/:cityName" element={<Cars />} />
                <Route path="/thingstodo/:cityName" element={<ThingsToDo />} />
                <Route path="/allactivites/:cityName" element={<AllThings />} />
                <Route path="/flight/:cityName" element={<Flight />} />
                <Route path="/cruises/:cityName" element={<Cruises />} />
                <Route path="/restaurants/:cityName" element={<Restaurants />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/search" element={<SearchResults />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
