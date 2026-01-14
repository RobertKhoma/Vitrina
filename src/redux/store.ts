import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../services/products';
import cartSlice from './slices/CardSlice'


const store = configureStore({
    reducer: {
      cart: cartSlice,
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;  
  export default store;
  