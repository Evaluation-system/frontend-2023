import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  title: string;
  description: string;
}

const initialState: any = {
  items: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.items.push(action.payload);
    },
    deleteProject: (state, action) => {
      const removeItem = action.payload;
      state.items = state.items.filter((item) => item.title !== removeItem);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProject, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
