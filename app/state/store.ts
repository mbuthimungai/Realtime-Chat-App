import { configureStore } from "@reduxjs/toolkit";
import userRducer from "./reducers/userReducer";

const store = configureStore({
  reducer: { user: userRducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
