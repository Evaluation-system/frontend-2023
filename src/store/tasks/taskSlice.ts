import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasker",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<any>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state) => {
      state.tasks.filter((item) => item.title !== item.title);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;
