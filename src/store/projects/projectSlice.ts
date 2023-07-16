import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//Таблица "Выплаты сотрудникам"
export interface IEmployee {
  task: string;
  time: number;
  price: number;
}
//Таблица "Ценообразование"
export interface IPricing {
  cost: string;
  value: number;
}

//Таблица "Временные затраты"
export interface ITasks {
  task: string;
  time: number;
}
//Общая типизация для начального стейта
export interface stateInterface {
  pricing: IPricing[];
  tasks: ITasks[];
  employee: IEmployee[];
  totalDays: number;
}
//Начальное состояние
const initialState: stateInterface = {
  pricing: [],
  tasks: [],
  employee: [] as Array<IEmployee>,
  totalDays: 0,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addPricing: (state, action) => {
      state.pricing.push(action.payload);
    },
    addEmployee: (state, action) => {
      state.employee.push(action.payload);
    },
    updateTotalDays: (state, action) => {
      state.totalDays = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPricing, addEmployee, updateTotalDays } =
  projectSlice.actions;

export default projectSlice.reducer;
