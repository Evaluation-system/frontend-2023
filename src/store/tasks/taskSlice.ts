import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPhaseTask } from "types/types";

export interface InterfacePhaseTask {
  tasks: IPhaseTask[];
}

const initialState: InterfacePhaseTask = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasker",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<any>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks.filter((item) => item.title !== item.title);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;
