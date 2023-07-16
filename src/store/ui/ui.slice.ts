import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IUi {
  value: boolean;
}

// Define the initial state using that type
const initialState: IUi = {
  value: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCreate: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { openCreate } = uiSlice.actions;

export default uiSlice.reducer;
