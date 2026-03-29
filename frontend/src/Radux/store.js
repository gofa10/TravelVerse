import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import hotelReducer from './Slices/hotelSlice';
import tripReducer from './Slices/tripSlice';
import activityReducer from './Slices/activitySlice';
import cruiseReducer from './Slices/cruiseSlice';
import restaurantReducer from './Slices/restaurantSlice';
import carReducer from './Slices/carSlice';
import reviewReducer from './Slices/reviewSlice';
import favoriteReducer from './Slices/favoriteSlice';
import cartReducer from './Slices/cartSlice';
import reservationReducer from './Slices/reservationSlice';
import flightReducer from './Slices/flightSlice';
import currencyReducer from './Slices/currencySlice';
import guideReducer from './Slices/guideSlice';
import tripBuilderReducer from '../store/tripBuilderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelReducer,
    trip: tripReducer,
    activity: activityReducer,
    cruise: cruiseReducer,
    restaurant: restaurantReducer,
    car: carReducer,
    flight: flightReducer,
    review: reviewReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
    reservation: reservationReducer,
    currency: currencyReducer,
    guide: guideReducer,
    tripBuilder: tripBuilderReducer,
  },
});
