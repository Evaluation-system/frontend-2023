import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import taskReducer from "./tasks/taskSlice";
import projectReducer from "./projects/projectSlice";
import { api } from "api/api";
import { createLogger } from "redux-logger";

const logger = createLogger({
  // collapsed: true,
});

const reducers = combineReducers({
  user: userReducer,
  tasker: taskReducer,
  project: projectReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  // getDefaultMiddleware().concat(api.middleware).concat().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
