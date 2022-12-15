import { configureStore } from "@reduxjs/toolkit";
import currentMusicReducer from "./currentMusic/currentMusic";

export const store = configureStore({
  reducer: {
    currentMusic: currentMusicReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
