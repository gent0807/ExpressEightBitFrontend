import { configureStore } from '@reduxjs/toolkit';
import User from "./User";


export default configureStore({
  reducer: {
    user:User
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});