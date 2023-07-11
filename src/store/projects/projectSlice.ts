import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  title: string;
  description: string;
}

const initialState: any = {
  pricing: [],
  tasks: [],
  employee: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addPricing: (state, action) => {
      state.pricing.push(action.payload);
    },
    addTasks: (state, action) => {},
    addEmployee: (state, action) => {
      state.employee.push(action.payload);
    },
    deleteProject: (state, action) => {
      const removeItem = action.payload;
      state.items = state.items.filter((item) => item.title !== removeItem);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPricing, addEmployee, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
