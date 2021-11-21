import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { credentialsSlice } from "./api/credentials";
import { positionSlice } from "./api/position";
import { userSlice } from "./api/user";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [credentialsSlice.name]: credentialsSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [positionSlice.name]: positionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
