import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Credentials {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: Credentials = {
  accessToken: null,
  refreshToken: null,
};

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    tokensRefreshed(state, action: PayloadAction<Credentials>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { tokensRefreshed } = credentialsSlice.actions;
