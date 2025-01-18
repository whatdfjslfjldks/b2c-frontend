// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userInfoSlice'; // 引入我们创建的 userSlice

export const store = configureStore({
  reducer: {
    user: userReducer, // 设置 userSlice 作为用户数据的 reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
