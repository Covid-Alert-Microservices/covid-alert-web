import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface IPositionState {
    enable: boolean;
}

const initialState: IPositionState = localStorage.getItem('position') === 'enabled' ? {enable: true} : {enable: false};

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setPositionState(state, action: PayloadAction<IPositionState>) {
      localStorage.setItem('position', action.payload.enable ? "enabled" : "disabled");
      return {...action.payload}
    },
  },
});

export const { setPositionState } = positionSlice.actions;

export const isPositionEnabled = (state: RootState) => state.position.enable;
