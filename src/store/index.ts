import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { credentialsSlice } from "./api/credentials";
import { chartsApi, chartsSlice } from "./charts";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [credentialsSlice.name]: credentialsSlice.reducer,
    [chartsApi.reducerPath]: chartsApi.reducer,
    [chartsSlice.name]: chartsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;