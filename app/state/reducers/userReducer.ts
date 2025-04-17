import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  email: string;
  idToken: string;
  refreshToken: string;
}
const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  idToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, name, email, idToken, refreshToken } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.idToken = idToken;
      state.refreshToken = refreshToken;
    },
    clearUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.idToken = "";
      state.refreshToken = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
