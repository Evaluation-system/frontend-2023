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
}
//Начальное состояние
const initialState: stateInterface = {
  pricing: [],
  tasks: [],
  employee: [] as Array<IEmployee>,
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
  },
});

// Action creators are generated for each case reducer function
export const { addPricing, addEmployee } = projectSlice.actions;

export default projectSlice.reducer;
