import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import taskReducer from "./tasks/taskSlice";
import projectReducer from "./projects/projectSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasker: taskReducer,
    project: projectReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
