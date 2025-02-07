import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userInfoSlice'; 
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, 
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
