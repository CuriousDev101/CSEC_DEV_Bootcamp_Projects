import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { loadStorage, removeStorage, saveStorage } from "../utils/storage";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const storedUser = loadStorage("user");

const initialState: AuthState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      saveStorage("user", action.payload.user);
      saveStorage("loginTime", Date.now().toString());
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeStorage("user");
      removeStorage("loginTime");
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;
