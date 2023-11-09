import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { alertSlice } from './features/alertSlice';
import { apiSlice } from './features/api/apiSlice';
import { userSlice } from './features/userSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
  return  getDefaultMiddleware().concat(apiSlice.middleware);
  },
});


setupListeners(store.dispatch)