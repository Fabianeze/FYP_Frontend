import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  token: string | null;
}

const initialState: IInitialState = {
  token: null,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredentails: (state, action: PayloadAction<{token: string }>) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentails, logout } = authSlice.actions;
export default authSlice.reducer;
