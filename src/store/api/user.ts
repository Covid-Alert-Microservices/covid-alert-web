import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Keycloak from "keycloak-js";
import { RootState } from "..";


const initialState: Keycloak.KeycloakProfile = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Keycloak.KeycloakProfile>) {
      return {...state, ...action.payload}
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user
