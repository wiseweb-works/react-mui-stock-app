import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
